import { View, Text } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

const HelloText = ({ username }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: SIZES.large,
        flexDirection: "row",
        marginTop: SIZES.medium,
      }}
    >
      <Text
        style={{
          fontSize: SIZES.extraLarge,
          marginLeft: SIZES.base,
        }}
      >
        Habari,
      </Text>
      <Text
        style={{
          marginLeft: SIZES.base,
          color: COLORS.primary,
          fontSize: SIZES.extraLarge,
        }}
      >
        {username?.split("@")[0]} !
      </Text>
    </View>
  );
};

export default HelloText;
