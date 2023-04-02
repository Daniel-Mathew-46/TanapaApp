import { View, Text, FlatList, StatusBar } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { COLORS, SIZES } from "../constants";
import { CfFormCard } from "../components";

const CfWeekRecords = ({ navigation }) => {
  const weeks = [
    {
      id: 1,
      week: 1,
    },
    {
      id: 2,
      week: 1,
    },
    {
      id: 3,
      week: 1,
    },
    {
      id: 4,
      week: 1,
    },
    {
      id: 5,
      week: 1,
    },
    {
      id: 6,
      week: 1,
    },
    {
      id: 7,
      week: 1,
    },
    {
      id: 8,
      week: 1,
    },
    {
      id: 9,
      week: 1,
    },
    {
      id: 10,
      week: 1,
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
                Fomu za Tembo Pilipili za kila wiki
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: SIZES.font,
          paddingVertical: SIZES.extraLarge,
        }}
      >
        <FlatList
          data={weeks}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <CfFormCard
              key={index}
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
          ListFooterComponent={
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 200,
              }}
            />
            // style={{
            //   justifyContent: "center",
            //   alignItems: "center",
            //   marginTop: 10,
            //   height: 200,
            // }}
            // ></View>
          }
          ItemSeparatorComponent={
            <View
              style={{ marginBottom: 40 }}
              ListFooterComponentStyle={{ marginBottom: "20%" }}
            />
          }
        />
      </View>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default CfWeekRecords;
