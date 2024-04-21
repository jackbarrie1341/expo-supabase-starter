import { ScrollView, TextInput, View } from "react-native";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { H1, P } from "@/components/ui/typography";
import { supabase } from "@/config/supabase";
import { useSupabase } from "@/context/supabase-provider";
import { cn } from "@/lib/utils";
import { useRouter } from "expo-router";
import { Dispatch, useState } from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { useColorScheme } from "@/lib/useColorScheme";
import { theme } from "@/lib/constants";

export default function Modal() {
	const router = useRouter();
	const [value, setValue] = useState("expense");
	const [category, setCategory] = useState("");
	const [amount, setAmount] = useState<number>();
	const [description, setDescription] = useState("");
	const { user } = useSupabase();
	const [error, setError] = useState<string | undefined>();

	const { colorScheme } = useColorScheme();
	const iconColor =
		colorScheme === "light" ? theme.light.primary : theme.dark.primary;

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
			category,
			type: value,
			user_id: user?.id,
		});
		if (error) {
			console.log("error", error);
			setError(error?.message);
			return;
		}
		router.push("/home");
	};
	return (
		<ScrollView className="bg-background">
			<View className="p-4 gap-y-4 pb-20">
				<View className="flex flex-row items-end justify-center">
					<View className="mb-3">
						<FontAwesome6 name="dollar-sign" size={24} color={iconColor} />
					</View>
					<TextInput
						className="text-5xl"
						placeholder="0"
						placeholderTextColor={iconColor}
						keyboardType="numeric"
						autoFocus
					/>
				</View>
				{/* <Input
					className="w-full"
					keyboardType="numeric"
					onChangeText={(val) => setAmount(Number(val))}
					placeholder="The transaction amount"
				/> */}
				<H1 className="mt-4">Description</H1>
				<Input
					className="w-full"
					onChangeText={setDescription}
					placeholder="A short description"
				/>
				<H1 className="mt-4">Category</H1>
				<Tabs
					value={value}
					onValueChange={setValue}
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
					<TabsContent value="expense">
						<View className="gap-2">
							<CategoryButton
								title="Utilities"
								category={category}
								setCategory={setCategory}
							/>
							<CategoryButton
								title="Food"
								category={category}
								setCategory={setCategory}
							/>
							<CategoryButton
								title="Entertainment"
								category={category}
								setCategory={setCategory}
							/>
							<CategoryButton
								title="Investment"
								category={category}
								setCategory={setCategory}
							/>
							<CategoryButton
								title="Transportation"
								category={category}
								setCategory={setCategory}
							/>
							<CategoryButton
								title="Other"
								category={category}
								setCategory={setCategory}
							/>
						</View>
					</TabsContent>
					<TabsContent value="income">
						<View className="gap-2">
							<CategoryButton
								title="Paycheque"
								category={category}
								setCategory={setCategory}
							/>
							<CategoryButton
								title="Gift"
								category={category}
								setCategory={setCategory}
							/>
							<CategoryButton
								title="Misc"
								category={category}
								setCategory={setCategory}
							/>
						</View>
					</TabsContent>
				</Tabs>
				{error && <Text className="text-red-600">{error}</Text>}
				<Button onPress={handleCreate}>
					<Text>Save</Text>
				</Button>
			</View>
		</ScrollView>
	);
}

const CategoryButton = ({
	title,
	category,
	setCategory,
}: {
	title: string;
	category: string;
	setCategory: Dispatch<React.SetStateAction<string>>;
}) => {
	return (
		<Button
			className={cn("w-full", title === category ? "bg-zinc-300" : "bg-accent")}
			size="default"
			variant="secondary"
			onPress={() => setCategory(title)}
		>
			<Text className="font-medium dark:text-white">{title}</Text>
		</Button>
	);
};
