import { ScrollView, View } from "react-native";

import TransactionCard from "@/components/Home/TransactionCard";
import { H1 } from "@/components/ui/typography";
import { Tables } from "@/config/database.type";
import { supabase } from "@/config/supabase";
import { theme } from "@/lib/constants";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { useColorScheme } from "@/lib/useColorScheme";

export default function TabOneScreen() {
	const [transactions, setTransactions] = useState<
		Tables<"transactions">[] | null
	>();

	const { colorScheme } = useColorScheme();
	const buttonColor =
		colorScheme === "light" ? theme.light.primary : theme.dark.primary;

	useEffect(() => {
		const fetchData = async () => {
			const { data, error } = await supabase
				.from("transactions")
				.select("*")
				.order("created_at", { ascending: false });
			console.log("data", data);
			console.log("error", error);
			return data;
		};

		fetchData().then((res) => setTransactions(res));
	}, []);
	return (
		<View className="flex-1 bg-background">
			<View className="h-32 pt-20 bg-green-400 flex flex-row justify-center">
				<H1 className="text-white">Stewardly</H1>
			</View>
			<View className="p-4 mb-28">
				<ScrollView>
					{transactions &&
						transactions.map((trans) => (
							<TransactionCard transaction={trans} key={trans.id} />
						))}
				</ScrollView>
			</View>
			<Link href="/modal" className="absolute bottom-4 right-4">
				<Ionicons name="add-circle" size={54} color={buttonColor} />
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
