import { View, Text, FlatList, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { Button, TaarifaCard, TaskText, WhiteButton } from "../components";

const KikundiReport = ({ route }) => {
  const kikundiName = route.params?.kikundiName;

  const kikundi_name = kikundiName.split(" ").slice(1).join(" ");

  const kikundiData = [
    {
      id: 1,
      text: `Taarifa za Kikundi`,
    },
    {
      id: 2,
      text: "Kitabu cha hisa cha mteja",
    },
    {
      id: 3,
      text: "Fomu ya wakopaji na marejesho",
    },
    {
      id: 4,
      text: "Fomu ya kumaliza mzunguko",
    },
    {
      id: 5,
      text: "Taarifa ya mwezi ya Kikundi",
    },
    {
      id: 6,
      text: "Kadi ya mahudhurio ya kila wiki",
    },
  ];

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
              style={{
                marginTop: SIZES.small,
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  color: COLORS.white,
                  fontSize: SIZES.extraLarge,
                }}
              >
                Rekodi Ya Taarifa Za {kikundi_name}
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
                Orodha ya fomu zilizojazawa na Kikundi
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Render Cards */}
      <View
        style={{
          width: "100%",
          paddingHorizontal: SIZES.font,
          paddingVertical: SIZES.extraLarge,
        }}
      >
        <FlatList
          data={kikundiData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TaarifaCard text={item.text} isCF={false} />
          )}
          ListHeaderComponent={<TaskText text={"week 1"} />}
          ListHeaderComponentStyle={{ marginBottom: SIZES.base }}
          keyExtractor={(item) => item.id}
          ListFooterComponent={
            <View style={{ position: "absolute", right: -10 }}>
              <WhiteButton />
            </View>
          }
          ItemSeparatorComponent={<View style={{ marginBottom: 40 }} />}
          ListFooterComponentStyle={{ marginBottom: "80%" }}
        />
      </View>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default KikundiReport;
