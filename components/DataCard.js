import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { assets, COLORS, SIZES } from "../constants";
import Icon from "react-native-vector-icons/Entypo";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const DataCard = ({ data, hasAvatar, weekText, navigation }) => {

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
          paddingVertical: SIZES.font - 2,
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
          {hasAvatar ? (
            <Image
              source={assets.avatar}
              resizeMode="cover"
              style={{
                height: 60,
                width: 60,
                borderRadius: 60,
              }}
            />
          ) : (
            <Icons name="account-group" size={40} />
          )}
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
        {hasAvatar ? (
          <Menu>
          <MenuTrigger
            customStyles={{
              triggerWrapper: {
                top: 14,
                alignSelf: "center"
              },
            }}
          >
            <Icon name="dots-three-horizontal" size={25} color={COLORS.white} />
          </MenuTrigger>
          <MenuOptions optionsContainerStyle={{ maxWidth: 90, top: 4 }}>
            <MenuOption
              onSelect={() => navigation.navigate("Taarifa za CF", { data })}
              text="Angalia"
              customStyles={{
                optionText: { fontSize: SIZES.medium + 2 },
              }}
            />
            <View style={{ height: 1, backgroundColor: "#7F8487" }} />
            <MenuOption
              onSelect={() =>
                navigation.navigate("Register CF", { edit: true, data })
              }
              text="Badilisha"
              customStyles={{
                optionText: { fontSize: SIZES.medium + 2 },
              }}
            />
            <View style={{ height: 1, backgroundColor: "#7F8487" }} />
            
          </MenuOptions>
        </Menu>
        ) : (
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
        )}
      </View>
    </View>
  );
};

export default DataCard;
