import React from "react";
import { Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Tables } from "@/config/database.type";
import { cn } from "@/lib/utils";
import { H1, H2, Large, Muted } from "../ui/typography";

export default function TransactionCard({
	transaction,
}: {
	transaction: Tables<"transactions">;
}) {
	const date = new Date(transaction.created_at);

	// Create the Intl.DateTimeFormat object with desired options and locale (optional)
	const formatter = new Intl.DateTimeFormat("en-US", {
		weekday: "short", // Short name of the day
		month: "short", // Short name of the month
		day: "numeric", // Numeric day of the month
		hour: "numeric", // Numeric hour
		minute: "numeric", // Numeric minute
		hour12: true, // Use 12-hour format
	});

	// Format the date
	const formattedDate = formatter.format(date);

	return (
		<View className="bg-card rounded-xl py-6 px-4 mb-5 w-full flex flex-row">
			<View className="w-1/3 ml-2">
				<View className="flex flex-row items-center gap-2">
					{transaction.type === "expense" ? (
						<AntDesign name="minuscircle" size={20} color="red" />
					) : (
						<AntDesign name="pluscircle" size={20} color="green" />
					)}
					<H1 className=" text-2xl sm:text-3xl font-black dark:text-white">
						${transaction.amount}
					</H1>
				</View>
				<View className="flex flex-row mt-1 ">
					<View className="rounded-full bg-purple-400">
						<Text className=" px-3 max-w-fit">{transaction.category}</Text>
					</View>
				</View>
			</View>
			<View className=" w-2/3 ml-2">
				<Large className="text-wrap">{transaction.description}</Large>
				<Muted>{formattedDate}</Muted>
			</View>
		</View>
	);
}
