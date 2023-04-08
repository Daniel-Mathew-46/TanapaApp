import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { assets, COLORS, SIZES } from "../constants";
import Icon from "react-native-vector-icons/Entypo";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";

const DataCard = ({ data, options, hasAvatar, weekText, navigation }) => {
  const [showoptions, setShowOptions] = useState(false);

  const showOptions = (options, navigation) => {
    return (
      <View
        style={{
          zIndex: 1,
          height: 70,
          width: 100,
          backgroundColor: COLORS.gray,
          paddingHorizontal: SIZES.base,
          paddingVertical: SIZES.font,
          position: "absolute",
          top: 50,
          right: 10,
          bottom: -10,
          borderRadius: 5,
          alignItems: "center",
          marginBottom: SIZES.small,
          justifyContent: "center",
        }}
      >
        {Object.keys(options).map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              borderBottomWidth: 1,
              width: "80%",
              marginBottom: 4,
            }}
            onPress={() => {
              setShowOptions(!showoptions);
              options[item] == "Angalia" &&
                navigation.navigate("Taarifa za CF", { data });
              options[item] == "Badilisha" &&
                navigation.navigate("Register CF", { edit: true, data });
              // options[item] == "Futa" &&
              //   navigation.navigate("MemberData", { delete: true, data });
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
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setShowOptions(!showoptions)}
          >
            <Icon name="dots-three-horizontal" size={25} color={COLORS.white} />
          </TouchableOpacity>
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
      {showoptions && showOptions(options, navigation)}
    </View>
  );
};

export default DataCard;
