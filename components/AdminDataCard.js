import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { assets, COLORS, SIZES } from "../constants";

const AdminDataCard = ({ data, text, navigation }) => {
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
          }}
        >
          <Image
            source={assets.avatar}
            resizeMode="cover"
            style={{
              height: 60,
              width: 60,
              borderRadius: 60,
            }}
          />
        </View>
        <View
          style={{
            justifyContent: "center",
            marginLeft: -25,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.large,
              textAlign: "left",
            }}
          >
            {data?.name}
          </Text>
          <Text
            style={{
              fontSize: SIZES.medium,
              textAlign: "left",
              textDecorationLine: "underline",
              marginTop: SIZES.base,
            }}
          >
            {data?.role}
          </Text>
        </View>

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() =>
            navigation.navigate("Cf Vikundi", {
              kikundiName: data?.name,
              user: data?.email,
              isCFRole: false,
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
            {text}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AdminDataCard;
