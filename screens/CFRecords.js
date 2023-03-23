import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import React from "react";
import { COLORS, SIZES, assets } from "../constants";
import Icon from "react-native-vector-icons/Ionicons";
import { DataCard } from "../components";

const CFRecords = ({ data, navigation }) => {
  const personData = [
    {
      id: 1,
      name: "Zaidu Nyoni",
      role: "Community Facilitator",
      avatar: assets.person01,
    },
    {
      id: 2,
      name: "Hamis Fereji",
      role: "Community Facilitator",
      avatar: assets.person02,
    },
    // {
    //   id: 3,
    //   name: "Zaidu Nyoni",
    //   role: "Community Facilitator",
    //   avatar: assets.person01,
    // },
    // {
    //   id: 4,
    //   name: "Zaidu Nyoni",
    //   role: "Community Facilitator",
    //   avatar: assets.person01,
    // },
    // {
    //   id: 5,
    //   name: "Zaidu Nyoni",
    //   role: "Community Facilitator",
    //   avatar: assets.person01,
    // },
    // {
    //   id: 6,
    //   name: "Zaidu Nyoni",
    //   role: "Community Facilitator",
    //   avatar: assets.person01,
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
                Rekodi Ya Taarifa Za CF
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
                Orodha ya Community Facilitators
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
          data={personData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <DataCard
              hasAvatar={true}
              data={item}
              options={{
                angalia: "Angalia",
                badilisha: "Badilisha",
                futa: "Futa",
              }}
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

export default CFRecords;
