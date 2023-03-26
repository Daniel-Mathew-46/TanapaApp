import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { COLORS, SIZES, assets } from "../constants";
import { MemberCard } from "../components";
import { KatibuDataContext } from "../context/MemberStackProvide";
import { onSnapshot, collection, db, query, where } from "../context/firebase";

const Members = ({ navigation, route }) => {
  // const members = route.params?.members;
  const kikundi = route.params?.kikundi;
  const { states } = useContext(KatibuDataContext);
  const [vikundi, setVikundi] = useState(states?.members);

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
                  fontSize: SIZES.extraLarge + 5,
                }}
              >
                {`Rekodi Ya Wanachama wa ${kikundi?.name}`}
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
                  Orodha ya Wanachama wa Kikundi Chako
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
                  onPress={() =>
                    navigation.navigate("RegisterMwanachama", {
                      kikundi: kikundi?.name,
                    })
                  }
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
          data={vikundi}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <MemberCard
              data={item}
              options={{
                angalia: "Angalia",
                badilisha: "Badilisha",
                futa: "Futa",
              }}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item["Barua Pepe"]}
          ListFooterComponent={<View />}
          ItemSeparatorComponent={<View style={{ marginBottom: 40 }} />}
          ListFooterComponentStyle={{ marginBottom: "90%" }}
        />
      </View>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default Members;
