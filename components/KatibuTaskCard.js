import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import Icon from "react-native-vector-icons/Ionicons";

const KatibuTaskCard = ({ text, styles, toForm, navigation, week }) => {
  return (
    <View
      style={{
        width: "50%",
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.font,
        backgroundColor: COLORS.primary,
        borderRadius: 5,
        ...styles,
      }}
    >
      <TouchableOpacity onPress={() => navigation.navigate(toForm)}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name="document-text-outline" size={40} color={COLORS.white} />
        </View>
        <View
          style={{
            width: "100%",
            marginTop: SIZES.font,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              color: COLORS.white,
              fontSize: SIZES.medium,
            }}
          >
            {text}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default KatibuTaskCard;
