import LottieView from "lottie-react-native";
import React from "react";
import LocationLoading from "@/assets/loading/location.json";

const SearchingLocation = () => {
	return (
		<LottieView
			source={LocationLoading}
			style={{
				marginTop: -70,
				marginBottom: -80,
				marginLeft: -40,
				height: 200,
				width: 120,
			}}
			autoPlay
			loop
		/>
	);
};

export default SearchingLocation;
