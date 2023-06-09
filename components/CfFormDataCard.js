import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SIZES, COLORS } from "../constants";

const CfFormDataCard = ({ text, data, navigation }) => {
  const text_ = text;
  const textArray = text_.split("_");
  const weekIndex = textArray.indexOf("week");
  const formText = textArray.slice(0, weekIndex - 1).join(" ");

  const specFormData = data[0]?.[text];
  return (
    <View
      style={{
        width: "100%",
        backgroundColor: COLORS.primary,
        borderRadius: 10,
      }}
    >
      <View>
        <TouchableOpacity
          style={{
            paddingVertical: SIZES.font,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: SIZES.font,
          }}
          onPress={() => {
            switch (formText) {
              case "Kadi Ya Mahudhurio":
                navigation.navigate("KikundiReportData", {
                  data: specFormData,
                  isNotTableData: true,
                });
                break;
              default:
                navigation.navigate("KikundiReportData", {
                  data: specFormData,
                  formText,
                });
            }
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
              {formText}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CfFormDataCard;
