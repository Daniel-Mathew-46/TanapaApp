import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../constants";
import Icon from "react-native-vector-icons/Entypo";

const MemberCard = ({ data, options, navigation, membersIds }) => {
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
                navigation.navigate("MemberData", { data });
              options[item] == "Badilisha" &&
                navigation.navigate("RegisterMwanachama", {
                  edit: true,
                  data,
                  membersIds,
                });
              options[item] == "Futa" &&
                navigation.navigate("MemberData", { delete: true, data });
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
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => setShowOptions(!showoptions)}
        >
          <Icon name="dots-three-horizontal" size={25} color={COLORS.white} />
        </TouchableOpacity>
      </View>
      {showoptions && showOptions(options, navigation)}
    </View>
  );
};

export default MemberCard;
