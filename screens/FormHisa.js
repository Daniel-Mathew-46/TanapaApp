import { View, Text } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
const FormHisa = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ color: COLORS.gray, fontSize: SIZES.large }}>
        Huduma hii itakuja hivi karibuni!
      </Text>
    </View>
  );
};

export default FormHisa;
