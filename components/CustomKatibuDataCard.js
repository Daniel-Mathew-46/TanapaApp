import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { assets, COLORS, SIZES } from "../constants";
import { KatibuRecordsContext } from "../context/KatibuRecordsProvider";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const CustomKatibuDataCard = ({ data, navigation }) => {
  const { states } = useContext(KatibuRecordsContext);

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
          <Image
            source={assets.avatar}
            resizeMode="cover"
            style={{
              height: 50,
              width: 50,
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
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Menu>
            <MenuTrigger
              customStyles={{
                triggerWrapper: {
                  top: 1,
                },
              }}
            >
              <Icon
                name="dots-three-horizontal"
                size={24}
                color={COLORS.white}
              />
            </MenuTrigger>
            <MenuOptions optionsContainerStyle={{ maxWidth: 90, top: 4 }}>
              <MenuOption
                onSelect={() =>
                  navigation.navigate("Taarifa za Katibu", {
                    data,
                  })
                }
                text="Angalia"
                customStyles={{
                  optionText: { fontSize: SIZES.medium + 2 },
                }}
              />
              <View style={{ height: 1, backgroundColor: "#7F8487" }} />
              <MenuOption
                onSelect={() =>
                  navigation.navigate("Sajili Katibu", {
                    edit: true,
                    data,
                    cfEmail: states.cfEmail,
                  })
                }
                text="Badilisha"
                customStyles={{
                  optionText: { fontSize: SIZES.medium + 2 },
                }}
              />
            </MenuOptions>
          </Menu>
        </View>
      </View>
    </View>
  );
};

export default CustomKatibuDataCard;
