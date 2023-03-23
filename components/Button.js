import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import LoaderComponent from "./LoaderComponent";

const Button = ({ text, onPress, loading }) => {
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
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: COLORS.darkPrimary,
          width: 230,
          height: 40,
          borderRadius: 20,
        }}
        onPress={onPress}
      >
        {loading ? (
          <LoaderComponent />
        ) : (
          <Text
            style={{
              color: COLORS.white,
              fontWeight: "bold",
              fontSize: SIZES.medium,
            }}
          >
            {text}
          </Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default Button;
