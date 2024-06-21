import {
	RefreshControl,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

import {
	Tabs,
	TabsList,
	TabsTrigger,
	TabsTriggerGreen,
} from "@/components/ui/tabs";
import { H3, H4, P } from "@/components/ui/typography";
import { supabase } from "@/config/supabase";
import { theme } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useEffect, useState } from "react";
import colors from "tailwindcss/colors";
import { Entypo } from "@expo/vector-icons";
import { cn } from "@/lib/utils";
import PlanBudgets from "@/components/budget/PlanBudgets";
import Remaining from "@/components/budget/Remaining";

// const categories = [
// 	{ id: 1, name: "Income" },
// 	{ id: 2, name: "Tithing" },
// 	{ id: 10, name: "Savings" },
// 	{ id: 3, name: "Housing" },
// 	{ id: 4, name: "Transportation" },
// 	{ id: 11, name: "Food" },
// 	{ id: 5, name: "Personal" },
// 	{ id: 6, name: "Lifestyle" },
// 	{ id: 7, name: "Health" },
// 	{ id: 8, name: "Insurance" },
// 	{ id: 9, name: "Debt" },
// ];

export interface Category {
	id: number;
	name: string;
	color: string;
	textColor: string;
	buttonColor: string;
	tintColor: string;
}

export const categories: Category[] = [
	{
		id: 1,
		name: "Income",
		color: "bg-green-300",
		textColor: "text-green-300",
		buttonColor: colors.green[300],
		tintColor: "bg-green-400/50",
	},
	{
		id: 2,
		name: "Tithing",
		color: "bg-blue-300",
		textColor: "text-blue-300",
		buttonColor: colors.blue[300],
		tintColor: "bg-blue-400/50",
	},
	{
		id: 10,
		name: "Savings",
		color: "bg-yellow-300",
		textColor: "text-yellow-300",
		buttonColor: colors.yellow[300],
		tintColor: "bg-yellow-400/50",
	},
	{
		id: 3,
		name: "Housing",
		color: "bg-red-300",
		textColor: "text-red-300",
		buttonColor: colors.red[300],
		tintColor: "bg-red-400/50",
	},
	{
		id: 4,
		name: "Transportation",
		color: "bg-purple-300",
		textColor: "text-purple-300",
		buttonColor: colors.purple[300],
		tintColor: "bg-purple-400/50",
	},
	{
		id: 11,
		name: "Food",
		color: "bg-orange-300",
		textColor: "text-orange-300",
		buttonColor: colors.orange[300],
		tintColor: "bg-orange-400/50",
	},
	{
		id: 5,
		name: "Personal",
		color: "bg-pink-300",
		textColor: "text-pink-300",
		buttonColor: colors.pink[300],
		tintColor: "bg-pink-400/50",
	},
	{
		id: 6,
		name: "Lifestyle",
		color: "bg-teal-300",
		textColor: "text-teal-300",
		buttonColor: colors.teal[300],
		tintColor: "bg-teal-400/50",
	},
	{
		id: 7,
		name: "Health",
		color: "bg-indigo-300",
		textColor: "text-indigo-300",
		buttonColor: colors.indigo[300],
		tintColor: "bg-indigo-400/50",
	},
	{
		id: 8,
		name: "Insurance",
		color: "bg-gray-300",
		textColor: "text-gray-300",
		buttonColor: colors.gray[300],
		tintColor: "bg-gray-400/50",
	},
	{
		id: 9,
		name: "Debt",
		color: "bg-red-600",
		textColor: "text-red-600",
		buttonColor: colors.red[600],
		tintColor: "bg-red-700/50",
	},
];

export interface CategoryItem {
	id: number;
	name: string;
	category_id: number;
}

export interface BudgetItem {
	id: number;
	category_item_id: number;
	month: Date;
	amount: number;
	type: "expense" | "income";
}

export default function Budget() {
	// const [transactions, setTransactions] = useState<
	// 	Tables<"transactions">[] | null
	// >();
	const [value, setValue] = useState("budget");
	const [loading, setLoading] = useState(false);

	const { colorScheme } = useColorScheme();
	const buttonColor =
		colorScheme === "light" ? theme.light.primary : theme.dark.primary;

	useEffect(() => {
		fetchData();
	}, []);

	const [categoryItems, setCategoryItems] = useState<CategoryItem[] | null>(
		null,
	);
	const [budgetItems, setBudgetItems] = useState<BudgetItem[] | null>(null);

	const fetchData = async () => {
		const { data, error } = await supabase
			.from("category_items")
			.select("id, name, category_id")
			.returns<CategoryItem[]>();
		// console.log("data", data);
		if (error) console.log("error", error);
		setCategoryItems(data);

		const { data: budgets, error: budgetsError } = await supabase
			.from("monthly_budgets")
			.select("id, category_item_id, month, amount, type")
			.returns<BudgetItem[]>();
		if (budgetsError) console.log("budget error", error);
		console.log(budgets);
		setBudgetItems(budgets);

		data && setLoading(false);
	};

	const handleTabSwitch = (type: string) => {
		setValue(type);
	};
	return (
		<View className="flex-1 bg-background">
			<View className=" bg-green-400 flex flex-col justify-end pt-16">
				<View className="w-full p-3 pt-3">
					<View className="flex flex-row gap-2 items-center">
						<Text className="text-3xl ml-2 font-black text-white  mb-2">
							May <Text className="font-light">2024</Text>
						</Text>
						<Entypo
							name="chevron-down"
							className="mb-3"
							size={26}
							color="white"
						/>
					</View>
					<Tabs
						value={value}
						onValueChange={(val) => handleTabSwitch(val)}
						className=" flex-col gap-1.5"
					>
						<TabsList className="flex-row w-full bg-green-500/90">
							<TabsTriggerGreen value="budget" className="flex-1">
								<P className="text-white">Plan</P>
							</TabsTriggerGreen>
							<TabsTriggerGreen value="remaining" className="flex-1">
								<P className="text-white">Remaining</P>
							</TabsTriggerGreen>
						</TabsList>
					</Tabs>
				</View>
			</View>

			<View className="p-4 mb-28">
				<ScrollView
					refreshControl={
						<RefreshControl
							onRefresh={() => fetchData()}
							refreshing={loading}
						/>
					}
				>
					{value === "budget" && (
						<PlanBudgets
							categoryItems={categoryItems}
							budgetItems={budgetItems}
						/>
					)}
					{value === "remaining" && (
						<Remaining
							categoryItems={categoryItems}
							budgetItems={budgetItems}
						/>
					)}

					{/* Spacer */}
					<View className="p-20"></View>
					{/* <CircularChart transactions={transactions} /> */}
					{/* <View className="mb-4 mt-2">
						<H1>Transactions</H1>
					</View>
					{transactions &&
						transactions.map((trans) => (
							<TransactionCard transaction={trans} key={trans.id} />
						))} */}
				</ScrollView>
			</View>
			{/* <Link href="/modal" className="absolute bottom-4 right-4">
				<Ionicons name="add-circle" size={54} color={colors.green[400]} />
			</Link> */}
		</View>
	);
}
