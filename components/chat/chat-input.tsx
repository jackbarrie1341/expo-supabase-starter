import { Platform, TextInput } from "react-native";
import { cn } from "@/lib/utils";
import React from "react";
import { useColorScheme } from "@/lib/useColorScheme";
import colors from "tailwindcss/colors";

interface ChatInputProps {
	input: string;
	onInputChange: (text: string) => void;
}

const ChatInput = ({ input, onInputChange }: ChatInputProps) => {
	const { isDarkColorScheme } = useColorScheme();
	const assistantColor = isDarkColorScheme
		? colors.zinc[300]
		: colors.zinc[700];
	return (
		<TextInput
			className={cn(
				Platform.OS === "ios" ? "py-4" : "py-2",
				"px-5 min-h-[46px] bg-background dark:text-white border dark:border-zinc-600 border-gray-300 rounded-3xl",
			)}
			multiline
			value={input}
			inputMode="text"
			verticalAlign="middle"
			textAlignVertical="center"
			onChangeText={onInputChange}
			placeholder="Type a message..."
			placeholderTextColor={assistantColor}
		/>
	);
};

export default ChatInput;
