import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

const LongCard = ({ count, week, subText }) => {
  return (
    <TouchableOpacity
      style={{
        width: "100%",
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.font,
        justifyContent: "space-between",
        backgroundColor: COLORS.primary,
        borderRadius: 10,
        marginBottom: SIZES.font,
      }}
      onPress={() => {}}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              color: COLORS.secondary,
              fontSize: SIZES.medium,
              textDecorationLine: "underline",
              fontWeight: "bold",
            }}
          >
            {week}
          </Text>
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.medium,
            }}
          >
            {subText}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.extraLarge,
              fontWeight: "bold",
            }}
          >
            {count}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default LongCard;
