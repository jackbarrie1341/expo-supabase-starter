import {
	AntDesign,
	Feather,
	FontAwesome6,
	MaterialIcons,
} from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Dispatch, useEffect, useState } from "react";
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
import { categories, Category, CategoryItem } from "./(protected)/budget";
import CategoryList from "@/components/addExpense/CategoryList";

// interface Category {
// 	name: string;
// 	color: string;
// 	icon: React.JSX.Element;
// }

// export const categories: Category[] = [
// 	{
// 		name: "Food",
// 		color: "bg-purple-400",
// 		icon: <MaterialIcons name="restaurant" size={24} color="white" />,
// 	},
// 	{
// 		name: "Entertainment",
// 		color: "bg-pink-400",
// 		icon: <Feather name="smile" size={24} color="white" />,
// 	},
// 	{
// 		name: "Housing",
// 		color: "bg-blue-400",
// 		icon: <FontAwesome6 name="house" size={24} color="white" />,
// 	},
// 	{
// 		name: "Misc",
// 		color: "bg-gray-400",
// 		icon: (
// 			<MaterialIcons name="miscellaneous-services" size={24} color="white" />
// 		),
// 	},
// 	{
// 		name: "Income",
// 		color: "bg-green-400",
// 		icon: <FontAwesome6 name="money-bill-wave" size={24} color="white" />,
// 	},
// ];

export default function Modal() {
	const router = useRouter();
	const [value, setValue] = useState("expense");
	const [category, setCategory] = useState<Category | undefined>(
		categories.at(3),
	);
	const [amount, setAmount] = useState<number>();
	const [description, setDescription] = useState("");
	const { user } = useSupabase();
	const [error, setError] = useState<string | undefined>();
	const [modalVisible, setModalVisible] = useState(false);
	const { colorScheme } = useColorScheme();
	const [categoryItems, setCategoryItems] = useState<CategoryItem[] | null>(
		null,
	);
	const [categoryItem, setCategoryItem] = useState<CategoryItem | undefined>(
		undefined,
	);
	const iconColor =
		colorScheme === "light" ? theme.light.primary : theme.dark.primary;

	const handleTabSwitch = (type: string) => {
		setValue(type);
		if (type === "expense") {
			const newCategoryItem = categoryItems?.find(
				(val) => val.name === "Water",
			);
			setCategory(categories.find((cat) => cat.id === newCategoryItem?.id));
			setCategoryItem(newCategoryItem);
		} else {
			const newCategoryItem = categoryItems?.find(
				(val) => val.name === "Salary",
			);
			setCategory(categories.find((cat) => cat.id === newCategoryItem?.id));
			setCategoryItem(newCategoryItem);
		}
	};
	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await supabase
				.from("category_items")
				.select("id, name, category_id")
				.returns<CategoryItem[]>();
			// console.log("data", data);
			if (error) console.log("error", error);
			setCategoryItems(data);
		};
		fetchData();
	}, []);

	const handleCreate = async () => {
		if (!amount) {
			setError("Enter an amount");
			return;
		}
		if (!category) {
			setError("Enter an amount");
			return;
		}
		if (!user?.id) {
			setError("an error occured, logout and login again");
			return;
		}
		const { error } = await supabase.from("transactions").insert({
			amount,
			description,
			category: category.name,
			type: value,
			user_id: user?.id,
			color: category.color,
		});
		if (error) {
			console.log("error", error);
			setError(error?.message);
			return;
		}
		router.replace("/home");
	};
	return (
		<View className="bg-background h-full">
			<ModalRn animationType="fade" transparent visible={modalVisible}>
				<View className="w-screen h-screen bg-background bg-opacity-5 p-10">
					<Pressable onPress={() => setModalVisible(!modalVisible)}>
						<AntDesign name="close" size={24} color={iconColor} />
					</Pressable>
					<ScrollView>
						<CategoryList
							categoryItems={categoryItems}
							setCategory={setCategory}
							setCategoryItem={setCategoryItem}
						/>
					</ScrollView>
				</View>
			</ModalRn>

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
					{/* <Input
					className="w-full"
					keyboardType="numeric"
					onChangeText={(val) => setAmount(Number(val))}
					placeholder="The transaction amount"
				/> */}
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
						{categoryItem && <CategoryIcon category={category} />}
						<H3>Category:</H3>
						<H3 className="font-light">{categoryItem?.name}</H3>
					</TouchableOpacity>
					<H4 className="mt-4">Description</H4>
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

const CategoryIcon = ({ category }: { category: Category | undefined }) => {
	if (!category) {
		return null;
	}
	return (
		<View className="flex flex-row justify-center mt-1 ">
			<View className={cn("rounded-full p-3", category.color)}></View>
		</View>
	);
};
