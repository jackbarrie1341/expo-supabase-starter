import ThinkingAnimation from "@/assets/loading/thinking.json";
import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";

const Thinking = () => {
	return (
		<View className="w-12 h-12">
			<LottieView
				source={ThinkingAnimation}
				style={{
					width: "100%",
					height: "100%",
				}}
				autoPlay
				loop
			/>
		</View>
	);
};

export default Thinking;
