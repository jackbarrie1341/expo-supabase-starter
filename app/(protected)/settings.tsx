import { View } from "react-native";

import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { H1, Muted } from "@/components/ui/typography";
import { useSupabase } from "@/context/supabase-provider";
import { useColorScheme } from "@/lib/useColorScheme";
import { supabase } from "@/config/supabase";

export default function TabTwoScreen() {
	const { signOut } = useSupabase();
	const { toggleColorScheme } = useColorScheme();

	const createCategories = async () => {
		const { data, error } = await supabase.from("category_items").insert([
			{ name: "Church", category_id: 2 },
			{ name: "Charity", category_id: 2 },
			{ name: "Savings", category_id: 10 },
			{ name: "Mortgage/Rent", category_id: 3 },
			{ name: "Water", category_id: 3 },
			{ name: "Natural Gas", category_id: 3 },
			{ name: "Electricity", category_id: 3 },
			{ name: "Gas", category_id: 4 },
			{ name: "Maintenence", category_id: 4 },
			{ name: "Groceries", category_id: 11 },
			{ name: "Restaurants", category_id: 11 },
			{ name: "Clothing", category_id: 5 },
			{ name: "Phone", category_id: 5 },
			{ name: "Fun Money", category_id: 5 },
			{ name: "Hair/Cosmetics", category_id: 5 },
			{ name: "Subscriptions", category_id: 5 },
			{ name: "Pet Care", category_id: 6 },
			{ name: "Child Care", category_id: 6 },
			{ name: "Entertainment", category_id: 6 },
			{ name: "Gym", category_id: 7 },
			{ name: "Medicine/Vitamins", category_id: 7 },
			{ name: "Doctor", category_id: 7 },
		]);
		// console.log("data", data);
	};

	return (
		<View className="flex-1 items-center justify-center bg-background p-4 gap-y-4">
			<H1 className="text-center">Sign Out</H1>
			<Muted className="text-center">
				Sign out and return to the welcome screen.
			</Muted>
			<Button
				className="w-full"
				size="default"
				variant="default"
				onPress={() => {
					signOut();
				}}
			>
				<Text>Sign Out</Text>
			</Button>
			<H1 className="text-center">Color Mode</H1>
			<Button
				className="w-full"
				size="default"
				variant="default"
				onPress={() => {
					toggleColorScheme();
				}}
			>
				<Text>Toggle Color Scheme</Text>
			</Button>
			<H1 className="text-center">Dev: Create Categories</H1>
			<Button
				className="w-full"
				size="default"
				variant="default"
				onPress={() => {
					createCategories();
				}}
				disabled
			>
				<Text>Init Categories</Text>
			</Button>
		</View>
	);
}
