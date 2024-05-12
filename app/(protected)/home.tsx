import { ScrollView, View, RefreshControl, Text } from "react-native";

import TransactionCard from "@/components/Home/TransactionCard";
import { H1, H2, H3, H4, P } from "@/components/ui/typography";
import { supabase } from "@/config/supabase";
import { theme } from "@/lib/constants";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "@/lib/useColorScheme";
import CircularChart from "@/components/Home/CircularChart";
import colors from "tailwindcss/colors";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabOneScreen() {
	const [loading, setLoading] = useState(false);

	const { colorScheme } = useColorScheme();

	const fetchData = async () => {
		// const { data, error } = await supabase
		// 	.from("category_items")
		// 	.select("name, category_id")
		// 	.returns<CategoryItem[]>();
		// // console.log("data", data);
		// if (error) console.log("error", error);
		// setCategoryItems(data);
		// data && setLoading(false);
	};

	return (
		<View className="flex-1 bg-background">
			<View className="h-36 bg-green-400 flex flex-col justify-end pt-20">
				<View className="w-full p-3">
					<H1 className="text-white">Stewardly</H1>
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
					<CircularChart transactions={[] as any} />

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
			<Link href="/modal" className="absolute bottom-4 right-4">
				<Ionicons name="add-circle" size={54} color={colors.green[400]} />
			</Link>
		</View>
	);
}

// return (
//   <View className="flex-1 items-center justify-center bg-background p-4 gap-y-4">
//     <H1 className="text-center">Home</H1>
//     <Muted className="text-center">
//       You are now authenticated and this session will persist even after
//       closing the app.
//     </Muted>
//     <Button
//       className="w-full"
//       variant="default"
//       size="default"
//       onPress={() => {
//         router.push("/modal");
//       }}
//     >
//       <Text>Open Modal</Text>
//     </Button>
//   </View>
// );
