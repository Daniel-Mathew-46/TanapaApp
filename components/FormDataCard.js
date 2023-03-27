import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SIZES, COLORS } from "../constants";

const FormDataCard = ({ text, data, navigation }) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 10,
      }}
    >
      <View>
        <TouchableOpacity
          style={{
            paddingVertical: SIZES.font,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: SIZES.font,
          }}
          onPress={() => navigation.navigate("FormData", { data })}
        >
          <View
            style={{
              justifyContent: "center",
            }}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: SIZES.medium,
                textAlign: "left",
              }}
            >
              {text}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default FormDataCard;
