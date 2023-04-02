import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { COLORS, SIZES } from "../constants";

const CfWeekRecords = () => {
  return (
    <SafeAreaView style={{}}>
      <View>
        <View
          style={{
            width: "100%",
            paddingTop: SIZES.base,
            paddingBottom: SIZES.small,
            backgroundColor: COLORS.primary,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <View
            style={{
              paddingHorizontal: SIZES.medium,
              width: "100%",
            }}
          >
            <View
              style={
                {
                  // marginTop: SIZES.small,
                }
              }
            >
              <Text
                style={{
                  textAlign: "left",
                  color: COLORS.white,
                  fontSize: SIZES.extraLarge,
                }}
              >
                Rekodi za Fomu kila Wiki
              </Text>
            </View>
            <View
              style={{
                marginTop: SIZES.small,
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  fontSize: SIZES.large,
                }}
              >
                Rekodi za Fomu za kila wiki
              </Text>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CfWeekRecords;
