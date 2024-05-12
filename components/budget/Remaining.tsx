import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import Budget, {
	BudgetItem,
	categories,
	CategoryItem,
} from "@/app/(protected)/budget";
import { H3, H4, P } from "../ui/typography";
import { cn } from "@/lib/utils";
import { router } from "expo-router";
import { Progress } from "../ui/progress";
import { Entypo } from "@expo/vector-icons";

export default function Remaining({
	categoryItems,
	budgetItems,
}: {
	categoryItems: CategoryItem[] | null;
	budgetItems: BudgetItem[] | null;
}) {
	return (
		<View>
			{categories.map((category) => {
				const items = categoryItems?.filter(
					(item) => item.category_id === category.id,
				);
				const budgets = budgetItems?.filter((budget) =>
					items?.some((item) => item.id === budget.category_item_id),
				);
				const totalBudgetAmount = budgets?.reduce(
					(accumulator, budget) => accumulator + budget.amount,
					0,
				);

				return (
					<View
						key={category.id}
						className="bg-card rounded-xl py-4 px-4 mb-5 w-full"
					>
						<View className="flex flex-col">
							<H3 className="">{category.name}</H3>
							<P>$0 / ${totalBudgetAmount}</P>
						</View>
						<View className="flex flex-col">
							{items &&
								items.map((item) => {
									const budgetItem = budgetItems?.find(
										(budgetItem) => budgetItem.category_item_id === item.id,
									);
									return (
										<TouchableOpacity
											key={item.name}
											// onPress={() =>
											// 	router.push(
											// 		// @ts-ignore
											// 		`/update-budget-item?category=${item.name}&budgetId=${budgetItem.id}&budgetAmount=${budgetItem?.amount}`,
											// 	)
											// }
										>
											<View
												className={cn(
													"rounded-xl p-2 px-3 mt-2 w-full",
													category.color,
												)}
											>
												<View className="flex flex-row justify-between mb-3 items-center">
													<Text className="text-xl ">{item.name}</Text>
													<Text>
														$0 / ${budgetItem?.amount ? budgetItem.amount : 0}
													</Text>
												</View>
												{/* <Text>${budgetItem ? budgetItem.amount : 0}</Text> */}
												<View className="flex flex-row w-full">
													<Progress
														value={0}
														className={cn("h-2", category.tintColor)}
													/>
												</View>
											</View>
										</TouchableOpacity>
									);
								})}
						</View>
					</View>
				);
			})}
		</View>
	);
}
