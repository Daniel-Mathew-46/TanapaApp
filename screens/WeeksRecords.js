import { View, Text, FlatList, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { FormCard } from "../components";

const WeeksRecords = ({ navigation, route }) => {
  const formRecords = [
    {
      id: 1,
      week: 1,
      forms: ["Fomu ya Kumaliza Mzunguko", "Fomu ya Ubanzi"],
    },
    {
      id: 2,
      week: 2,
      forms: ["Fomu ya Kumaliza Mzunguko", "Fomu ya Ubanzi"],
    },
    {
      id: 3,
      week: 3,
      forms: ["Fomu ya Kumaliza Mzunguko", "Fomu ya Ubanzi"],
    },
    {
      id: 4,
      week: 4,
      forms: ["Fomu ya Kumaliza Mzunguko", "Fomu ya Ubanzi"],
    },
    {
      id: 5,
      week: 5,
      forms: ["Fomu ya Kumaliza Mzunguko", "Fomu ya Ubanzi"],
    },
    {
      id: 6,
      week: 6,
      forms: ["Fomu ya Kumaliza Mzunguko", "Fomu ya Ubanzi"],
    },
    {
      id: 7,
      week: 7,
      forms: ["Fomu ya Kumaliza Mzunguko", "Fomu ya Ubanzi"],
    },
    {
      id: 8,
      week: 8,
      forms: ["Fomu ya Kumaliza Mzunguko", "Fomu ya Ubanzi"],
    },
    {
      id: 9,
      week: 9,
      forms: ["Fomu ya Kumaliza Mzunguko", "Fomu ya Ubanzi"],
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
                Fomu ulizotuma
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
                Rekodi za Fomu Ulizopakia
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
          data={formRecords.reverse()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <FormCard
              text={`Week ${item.week}`}
              data={item}
              navigation={navigation}
              options={{
                angalia: "Angalia",
                badilisha: "Pakua",
              }}
            />
          )}
          ListHeaderComponentStyle={{ marginBottom: SIZES.base }}
          keyExtractor={(item) => item.id}
          ListFooterComponent={
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                height: 200,
              }}
            ></View>
          }
          ItemSeparatorComponent={<View style={{ marginBottom: 40 }} />}
        />
      </View>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default WeeksRecords;
