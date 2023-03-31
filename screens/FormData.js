import { View, Text, SafeAreaView, StatusBar, Alert } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { ScrollView } from "react-native";

const FormData = ({ route }) => {
  const data = route?.params?.data;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
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
        <View
          style={{
            width: "100%",
            paddingHorizontal: SIZES.medium,
            paddingTop: SIZES.extraLarge,
            paddingBottom: SIZES.font,
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
          >
            <Text
              style={{
                fontSize: SIZES.medium,
                marginTop: SIZES.small,
              }}
            >
              {"Fomu"}:{" "}
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: SIZES.large,
                  color: COLORS.secondary,
                  marginBottom: SIZES.medium,
                }}
              >
                {data?.formName}
              </Text>
            </Text>
            {Object.keys(data?.formData).map((item, index) => {
              return (
                <Text
                  key={index}
                  style={{
                    fontSize: SIZES.medium,
                    marginTop: SIZES.small,
                  }}
                >
                  {item}:{" "}
                  <Text
                    style={{
                      fontSize: SIZES.medium,
                      color: COLORS.gray,
                      marginBottom: SIZES.medium,
                    }}
                  >
                    {data?.formData[item]}
                  </Text>
                </Text>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default FormData;
