import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SIZES, COLORS } from "../constants";
import Icon from "react-native-vector-icons/Entypo";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

const FormCard = ({ text, options, data, navigation }) => {
  const [showoptions, setShowOptions] = useState(false);

  const showOptions = (options) => {
    const optionsArray = Object.keys(options);
    const optionsLength = optionsArray.length;
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
            style={
              index === optionsLength
                ? {
                    borderBottomWidth: 1,
                    width: "80%",
                    marginBottom: 10,
                  }
                : {
                    borderBottomWidth: 1,
                    width: "80%",
                    marginBottom: 4,
                  }
            }
            onPress={() => {
              setShowOptions(!showoptions);
              switch (options[item]) {
                case "Angalia":
                  navigation.navigate("FormsRecord", { data });
                  break;
                case "Pakua":
                  alert(
                    `Samahani! Huduma ya kupakua fomu itakuja hivi karibuni!`
                  );
                  break;
              }
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
          <Menu>
            <MenuTrigger
              customStyles={{
                triggerWrapper: {
                  top: 0,
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
                onSelect={() => navigation.navigate("FormsRecord", { data })}
                text="Angalia"
                customStyles={{
                  optionText: { fontSize: SIZES.medium + 2 },
                }}
              />
              <View style={{ height: 1, backgroundColor: "#7F8487" }} />
              <MenuOption
                onSelect={() =>
                  alert(
                    `Samahani! Huduma ya kupakua fomu itakuja hivi karibuni!`
                  )
                }
                text="Pakua"
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

export default FormCard;
