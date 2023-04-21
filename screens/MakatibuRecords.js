import {
  View,
  FlatList,
  StatusBar,
  TouchableOpacity,
  SafeAreaView,
  Text,
} from "react-native";
import React, { useContext } from "react";
import { SIZES, COLORS } from "../constants";
import { CustomKatibuDataCard } from "../components";
import { KatibuRecordsContext } from "../context/KatibuRecordsProvider";

const MakatibuRecords = ({ navigation, route }) => {
  const { states } = useContext(KatibuRecordsContext);
  const cfEmail = route.params?.cfEmail;
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
                {`Rekodi za Makatibu`}
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
                  Orodha ya Makatibu Wako
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
                  onPress={() => navigation.navigate("Sajili Katibu", {})}
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
        {states?.myKatibus?.length === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: COLORS.gray, fontSize: SIZES.medium }}>
              Hakuna Makatibu.Sajili Makatibu!
            </Text>
          </View>
        ) : (
          <FlatList
            data={states?.myKatibus}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <CustomKatibuDataCard
                key={index}
                data={item}
                navigation={navigation}
                cfEmail={cfEmail}
              />
            )}
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

export default MakatibuRecords;

{
  /* <View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: SIZES.font,
          paddingVertical: SIZES.large,
        }}
      >
        <FlatList
            data={states?.members}
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
                membersIds={membersIds}
              />
            )}
            keyExtractor={(item) => item["Barua Pepe"]}
            ListFooterComponent={<View />}
            ItemSeparatorComponent={<View style={{ marginBottom: 40 }} />}
            ListFooterComponentStyle={{ marginBottom: "90%" }}
          />
      </View>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </View> */
}
