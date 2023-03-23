import { View, Text } from "react-native";
import React from "react";
import { ActivityIndicator } from "react-native";
import { COLORS } from "../constants";

const LoaderComponent = () => {
  return (
    <View
      style={{
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size={"large"} color={COLORS.white} />
    </View>
  );
};

export default LoaderComponent;
