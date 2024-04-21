import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

import { theme } from "@/lib/constants";
import { useColorScheme } from "@/lib/useColorScheme";

export default function ProtectedLayout() {
	const { colorScheme } = useColorScheme();

	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#4ade80",
				tabBarStyle: {
					backgroundColor:
						colorScheme === "dark"
							? theme.dark.background
							: theme.light.background,
				},
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: "Budget",
					tabBarIcon: ({ color }) => (
						<FontAwesome5 name="money-bill-wave" size={24} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name="chat"
				options={{
					title: "Chat",
					tabBarIcon: ({ color }) => (
						<Ionicons name="chatbox-outline" size={24} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name="settings"
				options={{
					title: "Chat",
					tabBarIcon: ({ color }) => (
						<Feather name="settings" size={24} color={color} />
					),
				}}
			/>
		</Tabs>
	);
}
