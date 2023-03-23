import { View, Text, Image } from "react-native";
import React from "react";
import { SIZES, assets, COLORS } from "../constants";

const PicNameHeader = ({ username, role }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: SIZES.large,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: SIZES.font,
      }}
    >
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginRight: SIZES.font,
        }}
      >
        <Image
          source={assets.person01}
          resizeMode="contain"
          style={{
            height: 60,
            width: 60,
          }}
        />
      </View>
      <View
        style={{
          justifyContent: "flex-start",
          marginLeft: SIZES.medium - 2,
        }}
      >
        <Text
          style={{
            color: COLORS.primary,
            fontSize: SIZES.large,
            textAlign: "left",
          }}
        >
          {username}
        </Text>
        <Text
          style={{
            color: COLORS.gray,
            fontSize: SIZES.large - 2,
            textAlign: "left",
          }}
        >
          {role}
        </Text>
      </View>
    </View>
  );
};

export default PicNameHeader;
