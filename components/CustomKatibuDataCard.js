import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useContext, useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { assets, COLORS, SIZES } from "../constants";
import { KatibuRecordsContext } from "../context/KatibuRecordsProvider";

const CustomKatibuDataCard = ({ data, navigation }) => {
  const { states } = useContext(KatibuRecordsContext);
  const [showoptions, setShowOptions] = useState(false);

  const showOptions = (options, navigation) => {
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
          top: 50,
          right: 10,
          bottom: -10,
          borderRadius: 5,
          alignItems: "center",
          marginBottom: SIZES.small,
          justifyContent: "center",
        }}
      >
        {options?.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={{
              borderBottomWidth: 1,
              width: "80%",
              marginBottom: 4,
            }}
            onPress={() => {
              setShowOptions(!showoptions);
              switch (item) {
                case "Angalia":
                  navigation.navigate("Taarifa za Katibu", {
                    data,
                  });
                  break;
                case "Badilisha":
                  navigation.navigate("Sajili Katibu", {
                    edit: true,
                    data,
                    cfEmail: states.cfEmail,
                  });
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
              {item}
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
        {
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            onPress={() => setShowOptions(!showoptions)}
          >
            <Icon name="dots-three-horizontal" size={25} color={COLORS.white} />
          </TouchableOpacity>
        }
      </View>
      {showoptions && showOptions(["Angalia", "Badilisha"], navigation)}
    </View>
  );
};

export default CustomKatibuDataCard;
