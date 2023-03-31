import { View, Text } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

const WhiteButton = () => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: 10,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: SIZES.small,
        marginTop: 18,
      }}
    ></View>
  );
};

export default WhiteButton;
