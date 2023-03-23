import { View, Text } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import Icon from "react-native-vector-icons/Ionicons";

const Stats = ({ statsStyle, text, count }) => {
  return (
    <View
      style={{
        paddingVertical: SIZES.font,
        backgroundColor: COLORS.primary,
        paddingHorizontal: SIZES.font,
        borderRadius: 10,
        ...statsStyle,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingVertical: SIZES.base,
        }}
      >
        <View>
          <Icon
            name={"people"}
            size={statsStyle?.iconSize}
            color={COLORS.secondary}
          />
        </View>
        <Text
          style={{
            color: COLORS.white,
            fontSize: statsStyle?.fontSize,
            fontWeight: "bold",
          }}
        >
          {count}
        </Text>
      </View>
      <Text
        style={{
          fontSize: statsStyle.textFont,
          fontWeight: "bold",
          textAlign: "left",
        }}
      >
        {text}
      </Text>
    </View>
  );
};

export default Stats;
