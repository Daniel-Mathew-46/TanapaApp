import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import React, { useContext } from "react";
import { COLORS, SIZES } from "../constants";
import { MemberCard } from "../components";
import { KatibuDataContext } from "../context/MemberStackProvide";

const Members = ({ navigation, route }) => {
  const kikundi = route.params?.kikundi?.name;
  const { states } = useContext(KatibuDataContext);
  const membersIds =
    states?.members?.length > 0
      ? states.members.map((item) => item["Namba yake"])
      : [];
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
                {`Rekodi Ya Wanachama wa ${kikundi}`}
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
                      kikundi: kikundi,
                      membersIds,
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
        {states?.members?.length === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: COLORS.gray, fontSize: SIZES.medium }}>
              Hakuna Wanachama.Sajili Wanachama
            </Text>
          </View>
        ) : (
          <FlatList
            data={states?.members}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <MemberCard
                data={item}
                navigation={navigation}
                membersIds={membersIds}
              />
            )}
            keyExtractor={(item) => item["Barua Pepe"]}
            ListFooterComponent={<View />}
            ItemSeparatorComponent={<View style={{ marginBottom: 40 }} />}
            ListFooterComponentStyle={{ marginBottom: "90%" }}
          />
        )}
      </View>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default Members;
