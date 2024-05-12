import { View, Text, StyleSheet, Dimensions } from "react-native";
import React from "react";
import PieChart from "react-native-pie-chart";
// import { PieChart } from "react-native-chart-kit";
import Colors from "../utils/Colors";
import { useState, useEffect } from "react";
import { FontAwesome } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Tables } from "@/config/database.type";
import { H2, H3 } from "@/components/ui/typography";
import { useColorScheme } from "@/lib/useColorScheme";

/* 
Animated Donut Chart: https://www.youtube.com/watch?v=Zgz1baxJslg

*/

const categoryColors = [
	{
		name: "Food",
		color: colors.purple[400],
	},
	{
		name: "Entertainment",
		color: colors.pink[400],
	},
	{
		name: "Housing",
		color: colors.blue[400],
	},
	{
		name: "Misc",
		color: colors.gray[400],
	},
	{
		name: "Income",
		color: colors.green[400],
	},
];

export default function CircularChart({
	transactions,
}: {
	transactions: Tables<"transactions">[];
}) {
	const widthAndHeight = 150;
	const [values, setValues] = useState([1]);
	const [sliceColor, setSliceColor] = useState([colors.gray[300]]);
	const [expenseTotal, setExpenseTotal] = useState(0);
	const [incomeTotal, setIncomeTotal] = useState(0);
	const [categoryMap, setCategoryMap] = useState<{ name: any; value: any }[]>(
		[],
	);
	const { isDarkColorScheme } = useColorScheme();

	useEffect(() => {
		console.log("hi", transactions);
		if (transactions) {
			if (transactions.length !== 0) updateChart();
		}
	}, [transactions]);

	const updateChart = () => {
		console.log(transactions);
		let totalExpenses = 0;
		let totalIncome = 0;
		const colorsMap = new Map();
		const expensesMap = new Map();

		transactions.forEach((trans, index) => {
			// add colors to colors map except for income
			if (trans.category !== "Income") {
				colorsMap.set(
					trans.category,

					categoryColors?.find((val) => val.name === trans.category).color,
				);

				const valueToAdd = expensesMap.get(trans.category);
				// console.log(valueToAdd);
				if (!valueToAdd) {
					expensesMap.set(trans.category, trans.amount);
				} else {
					expensesMap.set(trans.category, valueToAdd + trans.amount);
				}
			}
			// console.log(expensesMap.get("Misc"));

			if (trans.type === "expense") {
				totalExpenses += trans.amount;
			} else {
				totalIncome += trans.amount;
			}
		});
		setExpenseTotal(totalExpenses);
		setIncomeTotal(totalIncome);
		// console.log(colorsMap);
		const array = Array.from(colorsMap, ([name, value]) => ({ name, value }));
		const colorsArray = Array.from(colorsMap, ([name, value]) => value);
		const expenseArray = Array.from(expensesMap, ([name, value]) => value);
		// console.log(array);
		// console.log(expenseArray);
		setSliceColor(colorsArray);
		setValues(expenseArray);
		// console.log(expensesMap);
		setCategoryMap(array);
	};

	return (
		<View className="bg-card p-8 mb-4 rounded-lg">
			<Text className="text-3xl font-black dark:text-white mb-2">
				April <Text className="font-light">2024</Text>
			</Text>
			<Text className="text-xl dark:text-white">
				Income:{" "}
				<Text className="text-green-600">${incomeTotal.toFixed(2)}</Text>
			</Text>
			<Text className="text-xl mb-4 dark:text-white">
				Expenses:{" "}
				<Text className="text-red-600">${expenseTotal.toFixed(2)}</Text>
			</Text>
			<Text className="text-xl mb-4 dark:text-white">
				Remaining:{" "}
				<Text className="font-bold">
					${Number(incomeTotal - expenseTotal).toFixed(2)}
				</Text>
			</Text>
			<H2>Spending Overview</H2>
			<View className="flex flex-row gap-7 mt-6 items-center">
				{/* Old Pie Chart */}
				<PieChart
					widthAndHeight={widthAndHeight}
					series={values}
					sliceColor={sliceColor}
					coverRadius={0.7}
					coverFill={isDarkColorScheme ? "#27272a" : "#fff"}
				/>

				{categoryMap.length === 0 ? (
					<View className="flex flex-row gap-5 items-center">
						<FontAwesome name="circle" size={24} color={colors.gray[500]} />
						<Text className="dark:text-white">NA</Text>
					</View>
				) : (
					<View>
						{categoryMap.map((item, index) => (
							<View
								className="flex flex-row gap-2 items-center"
								key={item.name}
							>
								<View className="relative items-center justify-center">
									<FontAwesome name="circle" size={35} color={item.value} />
									<Text className="text-xs text-white absolute">
										{Number(values[index] / expenseTotal).toFixed(2) * 100}%
									</Text>
								</View>

								<Text className="dark:text-white">{item.name}</Text>
							</View>
						))}
					</View>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		marginTop: 20,
		backgroundColor: colors.white,
		padding: 20,
		borderRadius: 15,
		elevation: 1,
	},
	subContainer: {
		marginTop: 10,
		display: "flex",
		flexDirection: "row",
		gap: 40,
	},
});
