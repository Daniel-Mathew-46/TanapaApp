import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SIZES, COLORS } from "../constants";
import Icon from "react-native-vector-icons/Entypo";
import Icons from "react-native-vector-icons/AntDesign";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const TaarifaCard = ({ text, options, isCF, navigation, data }) => {
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
          {isCF ? (
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
          ) : (
            <TouchableOpacity
              style={{
                justifyContent: "center",
              }}
              onPress={() =>
                navigation.navigate("Kikundi Report Data", {
                  data,
                })
              }
            >
              <Text
                style={{
                  width: "100%",
                  color: COLORS.white,
                  fontSize: SIZES.medium,
                  textAlign: "left",
                }}
              >
                {text}
              </Text>
            </TouchableOpacity>
          )}

          {isCF ? (
            // <TouchableOpacity
            //   style={{
            //     alignItems: "center",
            //     justifyContent: "center",
            //   }}
            //   onPress={() => setShowOptions(!showoptions)}
            // >
            //   <Icon
            //     name="dots-three-horizontal"
            //     size={25}
            //     color={COLORS.white}
            //   />
            // </TouchableOpacity>
            <Menu>
              <MenuTrigger
                customStyles={{
                  triggerWrapper: {
                    top: 10,
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
                  onSelect={() => alert("MemberData")}
                  text="Angalia"
                  customStyles={{
                    optionText: { fontSize: SIZES.medium + 2 },
                  }}
                />
                <View style={{ height: 1, backgroundColor: "#7F8487" }} />
                <MenuOption
                  onSelect={() => alert("MemberData")}
                  text="Badilisha"
                  customStyles={{
                    optionText: { fontSize: SIZES.medium + 2 },
                  }}
                />
              </MenuOptions>
            </Menu>
          ) : (
            <TouchableOpacity
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={() =>
                navigation.navigate("Kikundi Report Data", {
                  data,
                })
              }
            >
              <Icons name="arrowright" size={22} color={COLORS.white} />
            </TouchableOpacity>
          )}
        </View>
        {showoptions && showOptions(options)}
      </View>
    </View>
  );
};

export default TaarifaCard;
