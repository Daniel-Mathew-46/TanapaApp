import { View, Text } from "react-native";
import React from "react";
import { SIZES, COLORS } from "../constants";

const FormsHeader = ({ title, subTitle }) => {
  return (
    <View>
      <View
        style={{
          paddingHorizontal: SIZES.medium,
          width: "100%",
        }}
      >
        <View
          style={
            {
              // marginTop: SIZES.small,
            }
          }
        >
          <Text
            style={{
              textAlign: "left",
              color: COLORS.white,
              fontSize: SIZES.extraLarge + 5,
              textTransform: "uppercase",
            }}
          >
            {title}
          </Text>
        </View>
        <View
          style={{
            marginTop: SIZES.small,
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: SIZES.large,
            }}
          >
            {subTitle}
          </Text>
        </View>
      </View>
    </View>
  );
};

export default FormsHeader;
