import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import Icon from "react-native-vector-icons/AntDesign";
import Icons from "react-native-vector-icons/Ionicons";

const TaskCard = ({
  title,
  subTitle,
  count,
  iconName,
  iconSize,
  customStyle,
  navigation,
}) => {
  return (
    <View
      style={{
        width: customStyle.width,
        paddingHorizontal: SIZES.font,
        paddingVertical: SIZES.base,
        backgroundColor: COLORS.white,
        borderRadius: 10,
        justifyContent: "space-between",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View>
          <Icon name={iconName} size={iconSize} color={COLORS.secondary} />
        </View>
        <View
          style={{
            marginLeft: SIZES.base,
          }}
        >
          <Text
            style={{
              color: COLORS.primary,
              textTransform: "uppercase",
              fontSize: customStyle.fontSize,
            }}
          >
            {title}
          </Text>
        </View>
      </View>
      <View
        style={{
          marginTop: SIZES.small,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: SIZES.medium,
            }}
          >
            {subTitle}
          </Text>
        </View>
        <View
          style={{
            paddingBottom: SIZES.base,
            borderBottomColor: COLORS.gray,
            borderBottomWidth: 1,
          }}
        >
          <Text
            style={{
              fontSize: SIZES.extraLarge,
              color: COLORS.primary,
            }}
          >
            {count}
          </Text>
        </View>

        <View
          style={{
            marginTop: SIZES.base,
          }}
        >
          <View>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
              onPress={() => {
                switch (title) {
                  case "Sajili Katibu":
                    navigation.navigate("Rekodi za Makatibu", {
                      screen: "Rekodi ya Makatibu",
                    });
                    break;
                  case "Sajili Vikundi":
                    navigation.navigate("Rekodi za Vikundi");
                    break;
                  default:
                    break;
                }
              }}
            >
              <Text
                style={{
                  fontSize: SIZES.medium,
                }}
              >
                Ona
              </Text>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icons
                  name="chevron-forward-outline"
                  size={15}
                  color={COLORS.secondary}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TaskCard;
