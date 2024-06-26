import React from "react";
import { View, Text } from "react-native";
import {
	ChatCompletionMessageOrReactElement,
	ChatCompletionMessageParam,
} from "react-native-gen-ui";
import ChatBubble from "./chat-bubble";
import Thinking from "../loaders/thinking";
import { cn } from "@/lib/utils";

interface ChatMessageProps {
	message: ChatCompletionMessageOrReactElement;
	isLastMessage: boolean;
	isLoading: boolean;
	isStreaming: boolean;
	error?: Error;
}

const ChatMessage = ({
	message,
	isLastMessage,
	isLoading,
	isStreaming,
	error,
}: ChatMessageProps) => {
	return (
		<View className={cn("flex gap-y-2", !isLastMessage && "pb-4")}>
			<MessageContent message={message} />
			{isLastMessage && isLoading && !isStreaming && <Thinking />}
			{isLastMessage && error && (
				<View className="self-start px-5 py-4 bg-red-100 rounded-2xl">
					<Text className="text-red-500">{error.message}</Text>
				</View>
			)}
		</View>
	);
};

// The chat message component
const MessageContent = ({
	message,
}: {
	message: ChatCompletionMessageOrReactElement;
}) => {
	if (message == null) {
		return null;
	}

	if (React.isValidElement(message)) {
		return message;
	}

	const m = message as ChatCompletionMessageParam;

	if (m.role === "function") {
		return null;
	}

	return <ChatBubble message={m} />;
};

export default ChatMessage;
