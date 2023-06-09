import { View, Text, ActivityIndicator } from "react-native";
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
        }}
      >
        <View>
          <View>
            <Icon
              name={"people"}
              size={statsStyle?.iconSize}
              color={COLORS.white}
            />
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
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            paddingVertical: SIZES.base,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: statsStyle?.fontSize,
              fontWeight: "bold",
            }}
          >
            {count !== null ? (
              count
            ) : (
              <ActivityIndicator size={20} color={COLORS.white} />
            )}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Stats;
