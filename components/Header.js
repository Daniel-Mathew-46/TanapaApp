import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import Icon from "react-native-vector-icons/SimpleLineIcons";

const Header = ({ text, color }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: SIZES.large,
        paddingVertical: SIZES.large,
        flexDirection: "row",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon name="menu" size={25} color={color} />
      </TouchableOpacity>

      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
          marginLeft: -25,
        }}
      >
        <Text
          style={{
            textTransform: "uppercase",
            color: color,
            fontSize: SIZES.large,
          }}
        >
          {text}
        </Text>
      </View>

      <View style={{}} />
    </View>
  );
};

export default Header;
