import React from "react";
import { useLocalSearchParams } from "expo-router";
import {
	AntDesign,
	Feather,
	FontAwesome6,
	MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Dispatch, useState } from "react";
import {
	Modal as ModalRn,
	Pressable,
	ScrollView,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Text } from "@/components/ui/text";
import { H1, H2, H3, H4, Muted, P } from "@/components/ui/typography";
import { supabase } from "@/config/supabase";
import { useSupabase } from "@/context/supabase-provider";
import { theme } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/utils";

export default function AddBudgetItem() {
	const { category, categoryId } = useLocalSearchParams<{
		category?: string;
		categoryId?: string;
	}>();
	const router = useRouter();
	const [value, setValue] = useState("expense");
	// const [category, setCategory] = useState<Category | undefined>(
	// 	categories.at(3),
	// );
	const [amount, setAmount] = useState<number>(0);
	const [description, setDescription] = useState("");
	const { user } = useSupabase();
	const [error, setError] = useState<string | undefined>();
	const [modalVisible, setModalVisible] = useState(false);
	const { colorScheme } = useColorScheme();
	const iconColor =
		colorScheme === "light" ? theme.light.primary : theme.dark.primary;

	const handleTabSwitch = (type: string) => {
		setValue(type);
		// if (type === "expense") {
		// 	setCategory(categories.find((val) => val.name === "Misc"));
		// } else {
		// 	setCategory(categories.find((val) => val.name === "Income"));
		// }
	};

	const handleCreate = async () => {
		if (!category) {
			setError("Enter an amount");
			return;
		}
		if (!user?.id) {
			setError("an error occured, logout and login again");
			return;
		}

		// insert into category_items
		// then insert into monthly_budgets
		const { data, error } = await supabase
			.from("category_items")
			.insert({
				name: description,
				category_id: Number(categoryId),
			})
			.select("id");
		const category_item_id = data?.at(0)?.id;
		if (error) {
			console.log("error", error);
			setError(error?.message);
			return;
		}
		console.log("insert", data);
		const { error: monthlyError } = await supabase
			.from("monthly_budgets")
			.insert({
				amount,
				category_item_id,
				type: value,
				month: new Date(),
			});
		if (monthlyError) {
			console.log("error", monthlyError);
			setError(monthlyError?.message);
			return;
		}
		router.replace("/budget");
	};
	return (
		<View className="bg-background h-full">
			{/* <Text>AddBudgetItem</Text>
			<Text>{category}</Text>
			<Text>{categoryId}</Text> */}
			<ScrollView className="bg-background">
				<View className="p-4 gap-y-4 pb-20">
					<View className="flex flex-row items-center justify-center">
						<FontAwesome6 name="dollar-sign" size={24} color={iconColor} />

						<TextInput
							className="text-5xl dark:text-white h-32 pe-5 "
							placeholder="0"
							placeholderTextColor={iconColor}
							keyboardType="numeric"
							autoFocus
							onChangeText={(val) => setAmount(Number(val))}
						/>
					</View>

					<Tabs
						value={value}
						onValueChange={(val) => handleTabSwitch(val)}
						className="w-full flex-col gap-1.5"
					>
						<TabsList className="flex-row w-full">
							<TabsTrigger value="expense" className="flex-1">
								<P>Expense</P>
							</TabsTrigger>
							<TabsTrigger value="income" className="flex-1">
								<P>Income</P>
							</TabsTrigger>
						</TabsList>
					</Tabs>
					<TouchableOpacity
						className="flex flex-row items-center gap-2 "
						onPress={() => setModalVisible(true)}
					>
						{/* {category && <CategoryIcon category={category} />}
						<H3>Category:</H3>
						<H3 className="font-light">{category?.name}</H3> */}
					</TouchableOpacity>
					<H4 className="mt-4">Name</H4>
					<Input
						className="w-full"
						onChangeText={setDescription}
						placeholder="e.g. Groceries"
					/>

					{error && <Text className="text-red-600">{error}</Text>}
				</View>
			</ScrollView>
			<Button
				className="m-4 rounded-full mb-8"
				size="lg"
				onPress={handleCreate}
			>
				<Text>Save</Text>
			</Button>
		</View>
	);
}
