import "../global.css";
import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { SupabaseProvider } from "@/context/supabase-provider";
import { useColorScheme } from "@/lib/useColorScheme";
import { theme } from "@/lib/constants";

export {
	// Catch any errors thrown by the Layout component.
	ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
	const { colorScheme } = useColorScheme();
	return (
		<SupabaseProvider>
			<SafeAreaProvider>
				<Stack
					screenOptions={{
						headerShown: false,
					}}
				>
					<Stack.Screen name="(protected)" />
					<Stack.Screen name="(public)" />
					<Stack.Screen
						name="modal"
						options={{
							headerShown: true,
							presentation: "modal",
							title: "New Transaction",

							headerTitleStyle: {
								color:
									colorScheme === "dark"
										? theme.light.background
										: theme.dark.background,
							},
							headerStyle: {
								backgroundColor:
									colorScheme === "dark"
										? theme.dark.background
										: theme.light.background,
							},
						}}
					/>
				</Stack>
			</SafeAreaProvider>
		</SupabaseProvider>
	);
}
