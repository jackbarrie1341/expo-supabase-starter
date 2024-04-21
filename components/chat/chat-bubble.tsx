import { cn } from "@/lib/utils";
import React from "react";
import { View } from "react-native";
import { ChatCompletionMessageParam } from "react-native-gen-ui";

import MarkdownDisplay from "../markdown-display";

interface ChatBubbleProps {
	message: ChatCompletionMessageParam;
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
	return (
		<View
			className={cn(
				"relative rounded-3xl py-3 px-4",
				message.role === "user"
					? "bg-sky-500 self-end ml-14"
					: "bg-gray-200 self-start mr-14",
			)}
		>
			<MarkdownDisplay textColor={message.role === "user" ? "white" : "black"}>
				{typeof message.content === "string" ? message.content : ""}
			</MarkdownDisplay>
		</View>
	);
};

export default ChatBubble;
