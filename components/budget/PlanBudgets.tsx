import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { BudgetItem, categories, CategoryItem } from "@/app/(protected)/budget";
import { H3 } from "../ui/typography";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

export default function PlanBudgets({
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
				return (
					<View
						key={category.id}
						className="bg-card rounded-xl py-6 px-4 mb-5 w-full"
					>
						<H3 className="mb-3">{category.name}</H3>
						<View className="flex flex-col">
							{items &&
								items.map((item) => {
									const budgetItem = budgetItems?.find(
										(budgetItem) => budgetItem.category_item_id === item.id,
									);
									return (
										<TouchableOpacity
											key={item.name}
											onPress={() =>
												router.push(
													// @ts-ignore
													`/update-budget-item?category=${item.name}&budgetId=${budgetItem.id}&budgetAmount=${budgetItem?.amount}`,
												)
											}
										>
											<View
												className={cn(
													"rounded-full py-1 px-4 mb-2 flex flex-row justify-between w-full items-center",
													category.color,
												)}
											>
												<Text className="text-lg">{item.name}</Text>
												<Text>${budgetItem ? budgetItem.amount : 0}</Text>
											</View>
										</TouchableOpacity>
									);
								})}
						</View>
						<TouchableOpacity
							// href={"/add-budget-item?category=hi"}
							onPress={() =>
								router.push(
									// @ts-ignore
									`/add-budget-item?category=${category.name}&categoryId=${category.id}`,
								)
							}
							className="w-full border-t border-border pt-2"
						>
							<View className="flex flex-row items-center gap-2 ">
								<Ionicons
									name="add-circle"
									size={30}
									color={category.buttonColor}
								/>
								<Text className={cn("text-lg font-bold", category.textColor)}>
									Add Category
								</Text>
							</View>
						</TouchableOpacity>
					</View>
				);
			})}
		</View>
	);
}
