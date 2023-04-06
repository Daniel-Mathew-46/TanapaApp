import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../constants";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const CfDataCard = ({ data, weekText, navigation }) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 10,
      }}
    >
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
            alignItems: "center",
            borderRadius: 30,
          }}
        >
          <Icons name="account-group" size={40} />
        </View>
        <View
          style={{
            justifyContent: "center",
            marginLeft: -20,
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.navigate("Details za Kikundi", { data })}
          >
            <Text
              style={{
                color: COLORS.white,
                fontSize: SIZES.large,
                textDecorationLine: "underline",
                textAlign: "left",
              }}
            >
              {`Kikundi: ${data?.name}`}
            </Text>
          </TouchableOpacity>
          <Text
            style={{
              fontSize: SIZES.medium,
              textAlign: "left",
              marginTop: SIZES.base,
            }}
          >
            {`Katibu: ${data?.Katibu}`}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() =>
            navigation.navigate("Week Records", {
              kikundiName: data?.name,
            })
          }
        >
          <Text
            style={{
              textTransform: "uppercase",
              textDecorationLine: "underline",
              fontSize: SIZES.font,
            }}
          >
            {weekText}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CfDataCard;
