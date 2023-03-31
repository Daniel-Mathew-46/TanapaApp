import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SIZES, COLORS } from "../constants";
import Icon from "react-native-vector-icons/Entypo";

const TaarifaCard = ({ text, options, isCF }) => {
  const [showoptions, setShowOptions] = useState(false);

  const showOptions = (options) => {
    const optionsArray = Object.keys(options);
    return (
      <View
        style={{
          zIndex: 1,
          height: 60,
          width: 100,
          backgroundColor: COLORS.gray,
          paddingHorizontal: SIZES.base,
          paddingVertical: SIZES.font,
          position: "absolute",
          top: 30,
          right: 10,
          bottom: -10,
          borderRadius: 5,
          alignItems: "center",
          marginBottom: SIZES.font,
          justifyContent: "center",
        }}
      >
        {optionsArray.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              borderBottomWidth: 1,
              width: "80%",
              marginBottom: 4,
            }}
            onPress={() => {
              setShowOptions(!showoptions);
              alert(`You Pressed ${item}`);
            }}
          >
            <Text
              style={{
                color: COLORS.secondary,
                fontSize: SIZES.medium,
              }}
            >
              {options[item]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <View
      style={{
        width: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 10,
      }}
    >
      <View>
        <View
          style={{
            paddingVertical: SIZES.font,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: SIZES.font,
          }}
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
          {isCF ? (
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() => setShowOptions(!showoptions)}
            >
              <Icon
                name="dots-three-horizontal"
                size={25}
                color={COLORS.white}
              />
            </TouchableOpacity>
          ) : null}
        </View>
        {showoptions && showOptions(options)}
      </View>
    </View>
  );
};

export default TaarifaCard;
