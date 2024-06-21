import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {
	BudgetItem,
	categories,
	Category,
	CategoryItem,
} from "@/app/(protected)/budget";
import { H3 } from "../ui/typography";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { cn } from "@/lib/utils";

export default function CategoryList({
	categoryItems,
	setCategory,
	setCategoryItem,
}: {
	categoryItems: CategoryItem[] | null;
	setCategory: React.Dispatch<React.SetStateAction<Category | undefined>>;
	setCategoryItem: React.Dispatch<
		React.SetStateAction<CategoryItem | undefined>
	>;
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
									return (
										<TouchableOpacity
											key={item.name}
											onPress={() => {
												setCategory(category);
												setCategoryItem(item);
											}}
										>
											<View
												className={cn(
													"rounded-full py-1 px-4 mb-2 flex flex-row justify-between w-full items-center",
													category.color,
												)}
											>
												<Text className="text-lg">{item.name}</Text>
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
