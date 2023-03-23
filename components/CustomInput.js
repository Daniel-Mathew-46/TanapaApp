import { View, Text, TextInput } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

const CustomInput = ({
  placeholder,
  label,
  icon,
  isPassword,
  onChangeText,
  isNumber,
  multiLine,
}) => {
  return (
    <View style={{ marginBottom: SIZES.medium }}>
      <Text style={{ fontSize: 18 }}>{label}</Text>
      <View
        style={{
          width: "100%",
          paddingLeft: SIZES.base,
          paddingVertical: SIZES.base,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: COLORS.primary,
          flexDirection: "row",
          marginTop: SIZES.base,
          paddingRight: SIZES.extraLarge + 5,
        }}
      >
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {icon}
        </View>
        <TextInput
          placeholder={placeholder}
          style={{
            marginLeft: SIZES.base,
            fontSize: SIZES.large,
            overflow: "hidden",
          }}
          multiline={multiLine ? true : false}
          onChangeText={onChangeText}
          secureTextEntry={isPassword}
          keyboardType={isNumber ? "numeric" : null}
        />
      </View>
    </View>
  );
};

export default CustomInput;
