import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Icons from "react-native-vector-icons/FontAwesome";
import { COLORS, SIZES } from "../constants";

const FormInput = ({
  label,
  placeholder,
  icon,
  isPasswordInput,
  secureTextEntry,
  onChangeText,
}) => {
  const [hideText, setHideText] = useState(secureTextEntry);

  return (
    <View
      style={{
        paddingHorizontal: 20,
        marginTop: 18,
        width: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "column",
        }}
      >
        {/* Label */}
        <View style={{ flexDirection: "row", paddingHorizontal: 10 }}>
          <Text style={{ color: COLORS.secondary, fontWeight: "bold" }}>
            {label}
          </Text>
        </View>

        <View
          style={
            {
              // flexDirection: "row",
              // paddingRight: SIZES.extraLarge + 10,
              // paddingVertical: SIZES.base - 5,
              // marginTop: SIZES.base,
              // borderRadius: 15,
              // borderWidth: 1,
              // borderColor: COLORS.gray,
              // alignItems: "center",
              // width: "100%",
              // paddingLeft: SIZES.base,
            }
          }
        >
          <View
            style={{
              flexDirection: "row",
              paddingRight: SIZES.extraLarge + 10,
              paddingVertical: SIZES.base,
              marginTop: SIZES.base,
              borderRadius: 15,
              borderWidth: 1,
              borderColor: COLORS.gray,
              alignItems: "center",
              width: "100%",
              paddingLeft: SIZES.base,
            }}
          >
            {/* Icon*/}
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {icon}
            </View>

            {/* Input */}
            <TextInput
              style={{
                marginLeft: 10,
                marginRight: -30,
                overflow: "hidden",
              }}
              placeholder={placeholder}
              secureTextEntry={hideText}
              onChangeText={onChangeText}
            />

            {/* Visible */}
            {isPasswordInput && (
              <TouchableOpacity
                style={{ position: "absolute", right: 10 }}
                onPress={() => setHideText(!hideText)}
              >
                <Icons
                  name={`${hideText ? "eye" : "eye-slash"}`}
                  size={20}
                  color={COLORS.gray}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Error */}
      </View>
    </View>
  );
};

export default FormInput;
