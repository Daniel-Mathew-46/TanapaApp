import { View, Text } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

const ListHeader = () => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: SIZES.large,
        marginTop: SIZES.base,
      }}
    >
      <Text style={{ color: COLORS.primary, fontSize: SIZES.medium }}>
        Week 1
      </Text>
    </View>
  );
};

export default ListHeader;
