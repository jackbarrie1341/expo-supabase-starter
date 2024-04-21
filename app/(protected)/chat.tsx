/* eslint-disable */
// @ts-nocheck
import { OpenAI, useChat } from "react-native-gen-ui";
import { useEffect } from "react";
import { View, Text, FlatList } from "react-native";
import { ZodFunctionDef, toTool, parseArguments } from "openai-zod-functions";
import ChatInput from "@/components/chat/chat-input";
import ChatSubmitButton from "@/components/chat/chat-submit-button";
import ChatContainer from "@/components/chat/chat-container";
import ChatMessage from "@/components/chat/chat-message";
import * as z from "zod";
import Thinking from "@/components/loaders/thinking";
import TransactionCard from "@/components/Home/TransactionCard";
import { useSupabase } from "@/context/supabase-provider";
import { categories } from "@/app/modal.tsx";
import { supabase } from "@/config/supabase";

const openAi = new OpenAI({
	apiKey: process.env.EXPO_PUBLIC_OPENAI_API_KEY ?? "",
	model: process.env.EXPO_PUBLIC_OPENAI_MODEL || "gpt-4",
});

// IDEA: Allow users to ask "show me a summary of my spending this month" and it creates a bar chart
export default function ChatScreen() {
	// Chat with LLM
	// @ts-ignore
	const { user } = useSupabase();
	const {
		input,
		error,
		isLoading,
		isStreaming,
		messages,
		handleSubmit,
		onInputChange,
	} = useChat({
		openAi,
		initialMessages: [
			{
				content: "Hello, how can I help you today?",
				role: "assistant",
			},
		],
		onError: (error) => {
			console.error("Error while streaming:", error);
		},
		onSuccess: () => {
			console.log("✅ Streaming done!");
		},
		tools: {
			addExpense: {
				description: "Add a new expense to the users transaction list",
				parameters: z.object({
					amount: z.number(),
					item: z.string(),
					category: z.enum(["Misc", "Food", "Housing", "Entertainment"]),
				}),
				render: async function* (args) {
					// With 'yield' we can show loading  while fetching weather data
					yield <Thinking />;

					// Call API for current weather
					console.log("amount", args.amount);
					console.log("category", args.category);
					console.log("items2", args.item);
					const date = new Date();
					console.log(date);
					const color = categories.find(
						(val) => val.name === args.category,
					).color;
					console.log(color);

					if (!user) {
						return {
							data: "error adding transaction to database. Try again later",
							component: (
								<View>
									<Text>Error!</Text>
								</View>
							),
						};
					}

					const { error } = await supabase.from("transactions").insert({
						amount: args.amount,
						description: args.item,
						category: args.category,
						type: "expense",
						user_id: user?.id,
						color: color,
					});

					const transaction = {
						amount: args.amount,
						type: "expense",
						created_at: new Date(),
						category: args.category,
						description: args.item,
						color: color,
					};

					yield <Thinking />;
					// Return the final result
					return {
						// The data will be seen by the model
						data: "Successfully added the transaction to the database.",
						// The component will be rendered to the user
						component: <TransactionCard transaction={transaction} />,
					};
				},
			},
		},
	});

	// Agent output
	return (
		<ChatContainer>
			{/* List of messages */}
			<FlatList
				data={messages}
				inverted
				contentContainerStyle={{
					flexDirection: "column-reverse",
					padding: 12,
				}}
				renderItem={({ item, index }) => (
					// Individual message component
					<ChatMessage
						message={item}
						isLastMessage={index === messages.length - 1}
						isLoading={isLoading}
						isStreaming={isStreaming}
						error={error}
					/>
				)}
			/>

			<View className="flex flex-row items-end p-3 gap-x-2">
				{/* Text input field */}
				<View className="grow basis-0">
					<ChatInput input={input} onInputChange={onInputChange} />
				</View>

				{/* Submit button */}
				<View className="shrink-0">
					<ChatSubmitButton
						isLoading={isLoading}
						isStreaming={isStreaming}
						input={input}
						handleSubmit={handleSubmit}
					/>
				</View>
			</View>
		</ChatContainer>
	);
}

// // @ts-ignore
// const functions: ZodFunctionDef[] = [
// 	{
// 		name: "add_expense",
// 		description:
// 			"Used to add an expense to the users transaction history. Use this if the user ever mentions a purchse they made.",
// 		schema: z.object({
// 			amount: z.number().describe("The amount of the transaction."),
// 			category: z
// 				.enum(["Misc", "Food", "Housing", "Entertainment"])
// 				.describe("The category of the transaction"),
// 		}),
// 	},
// ];

// const addExpense = {
// 	type: "object",
// 	properties: {
// 		amount: {
// 			type: "number",
// 			description: "The amount of the transaction",
// 		},
// 		category: {
// 			type: "string",
// 			description: "The category of the transaction",
// 			enum: ["Misc", "Food", "Housing", "Entertainment"],
// 		},
// 	},
// 	required: ["amount", "category"],
// };

function addToSupa(amount: number, category: string) {
	console.log(`Amount ${amount}, category: ${category}`);
	return "Success!";
}

// const messages = [
// 	{
// 		role: "user",
// 		content: "I spent $20 on mcdonalds today",
// 	},
// ];
// async function runConversation() {
// 	// Step 1: send the conversation and available functions to the model

// 	const completion = await openai.chat.completions.create({
// 		model: "gpt-3.5-turbo",
// 		messages: [
// 			{
// 				role: "user",
// 				content: "I spent $20 on mcdonalds today!",
// 			},
// 		],

// 		// Convert ZodFunctions for OpenAI
// 		tools: functions.map(toTool),
// 	});
// 	const { message } = completion.choices[0];
// 	console.dir("message", message);
// 	if (message.tool_calls) {
// 		const func = message.tool_calls[0].function;
// 		if (func.name === "add_expense") {
// 			const addExpenseFunction = functions[0];
// 			const { amount, category } = parseArguments(
// 				func.name,
// 				func.args,
// 				addExpenseFunction.schema,
// 			);
// 			addToSupa(amount, category);
// 			// location/format are now typed, and validated against our schema.
// 			// Do something (e.g. call a weather API)
// 		}
// 	}
// }

// const tools = [
// 	{
// 		type: "function",
// 		function: {
// 			name: "add_expense",
// 			description:
// 				"Used to add an expense to the users transaction history. Use this if the user ever mentions a purchse they made.",
// 			parameters: {
// 				type: "object",
// 				properties: {
// 					amount: {
// 						type: "string",
// 						description: "The amount of the transaction",
// 					},
// 					category: {
// 						type: "string",
// 						description: "The category of the transaction",
// 						enum: ["Misc", "Food", "Housing", "Entertainment"],
// 					},
// 					summary: {
// 						type: "string",
// 						description:
// 							"A short, one to three word description of the transaction",
// 					},
// 				},
// 			},
// 		},
// 	},
// ];
