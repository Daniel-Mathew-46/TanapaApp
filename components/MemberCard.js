import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../constants";
import Icon from "react-native-vector-icons/Entypo";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const MemberCard = ({ data, navigation, membersIds }) => {
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        shadowColor: COLORS.secondary,
        paddingHorizontal: SIZES.medium,
        shadowOffset: {
          width: 15,
          height: 1,
        },
        shadowOpacity: 0.2,
        elevation: 9,
      }}
    >
      <View
        style={{
          paddingVertical: SIZES.font,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            marginLeft: 5,
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.large,
              textAlign: "left",
            }}
          >
            {data["Jina la Mwanachama"]}
          </Text>
          <Text
            style={{
              fontSize: SIZES.medium,
              textAlign: "left",
              textDecorationLine: "underline",
              marginTop: SIZES.base,
            }}
          >
            {data["Barua Pepe"]}
          </Text>
        </View>
        <Menu>
          <MenuTrigger
            customStyles={{
              triggerWrapper: {
                top: 10,
              },
            }}
          >
            <Icon name="dots-three-horizontal" size={24} color={COLORS.white} />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{ maxWidth: 90, top: 4 }}>
            <MenuOption
              onSelect={() => navigation.navigate("MemberData", { data })}
              text="Angalia"
              customStyles={{
                optionText: { fontSize: SIZES.medium + 2 },
              }}
            />
            <View style={{ height: 1, backgroundColor: "#7F8487" }} />
            <MenuOption
              onSelect={() =>
                navigation.navigate("RegisterMwanachama", {
                  edit: true,
                  data,
                  membersIds,
                })
              }
              text="Badilisha"
              customStyles={{
                optionText: { fontSize: SIZES.medium + 2 },
              }}
            />
            <View style={{ height: 1, backgroundColor: "#7F8487" }} />
            <MenuOption
              onSelect={() =>
                navigation.navigate("MemberData", { delete: true, data })
              }
              text="Futa"
              customStyles={{
                optionText: { fontSize: SIZES.medium + 2 },
              }}
            />
          </MenuOptions>
        </Menu>
      </View>
    </View>
  );
};

export default MemberCard;
