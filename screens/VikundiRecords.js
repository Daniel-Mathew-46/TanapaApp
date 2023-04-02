import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { DataCard } from "../components";

const VikundiRecords = ({ navigation }) => {
  // const navigateOperation = () =>
  //   navigation.navigate("Taarifa za Kikundi", { week: "wwek 1" });

  const vikundiData = [
    {
      id: 1,
      name: "Kikundi: Tembo Pilipili",
      role: "Katibu: Peterson Kiara",
    },
    // {
    //   id: 2,
    //   name: "Kikundi: Tembo Pilipili",
    //   role: "Katibu: Peterson Kiara",
    // },
    // {
    //   id: 3,
    //   name: "Kikundi: Tembo Pilipili",
    //   role: "Katibu: Peterson Kiara",
    // },
    // {
    //   id: 4,
    //   name: "Kikundi: Tembo Pilipili",
    //   role: "Katibu: Peterson Kiara",
    // },
    // {
    //   id: 5,
    //   name: "Kikundi: Tembo Pilipili",
    //   role: "Katibu: Peterson Kiara",
    // },
    // {
    //   id: 6,
    //   name: "Kikundi: Tembo Pilipili",
    //   role: "Katibu: Peterson Kiara",
    // },
  ];

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
            <View
              style={{
                marginTop: SIZES.small,
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  color: COLORS.white,
                  fontSize: SIZES.extraLarge + 5,
                }}
              >
                Rekodi Ya Taarifa Za Vikundi
              </Text>
            </View>
            <View
              style={{
                marginTop: SIZES.small,
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: SIZES.base,
                width: "100%",
              }}
            >
              <View
                style={{
                  justifyContent: "center",
                  width: "50%",
                }}
              >
                <Text
                  style={{
                    textAlign: "left",
                    fontSize: SIZES.medium,
                  }}
                >
                  Orodha ya Vikundi na taarifa zake
                </Text>
              </View>
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity
                  style={{
                    paddingHorizontal: SIZES.font,
                    backgroundColor: COLORS.white,
                    paddingVertical: SIZES.base,
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 5,
                  }}
                  onPress={() => {
                    navigation.navigate("Sajili Kikundi", {});
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.secondary,
                      fontSize: SIZES.font,
                      textTransform: "uppercase",
                    }}
                  >
                    SAJILI
                  </Text>
                </TouchableOpacity>
              </View>
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
          data={vikundiData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <DataCard
              hasAvatar={false}
              data={item}
              weekText={"Weeks"}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View />}
          ItemSeparatorComponent={<View style={{ marginBottom: 40 }} />}
          ListFooterComponentStyle={{ marginBottom: "80%" }}
        />
      </View>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default VikundiRecords;
