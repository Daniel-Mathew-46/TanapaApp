import { View, Text, SafeAreaView, StatusBar, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { COLORS, SIZES } from "../constants";
import { Button } from "../components";

const FormData = ({ route }) => {
  const [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={{}}>
      <View>
        <View
          style={{
            width: "100%",
            paddingTop: SIZES.base,
            paddingBottom: SIZES.font,
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
            <View>
              <Text
                style={{
                  textAlign: "left",
                  color: COLORS.white,
                  fontSize: SIZES.extraLarge + 5,
                }}
              >
                {`Taarifa za Fomu`}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Render Card */}
      {
        <View
          style={{
            width: "100%",
            paddingHorizontal: SIZES.medium,
            paddingTop: SIZES.extraLarge,
          }}
        >
          <View
            style={{
              paddingHorizontal: SIZES.font,
              paddingVertical: SIZES.font,
              backgroundColor: COLORS.darkWhite,
              borderRadius: 10,
              shadowColor: COLORS.gray,
              shadowOffset: {
                width: 5,
                height: 5,
              },
              shadowOpacity: 0.75,
              elevation: 9,
            }}
          ></View>
        </View>
      }
      {/* {
        <Button
          text={"Futa Mwanachama"}
          loading={loading}
          onPress={handleDelete}
        />
      } */}
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default FormData;
