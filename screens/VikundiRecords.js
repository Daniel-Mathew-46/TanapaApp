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
import { CfDataCard } from "../components";
import { CfFormsDataContext } from "../context/CfFormsRecordProvider";

const VikundiRecords = ({ navigation, route }) => {
  const { statesVikundi } = useContext(CfFormsDataContext);
  const isCFRole = route?.params?.isCFRole;
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
              {isCFRole && (
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
              )}
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
        {statesVikundi?.vikundi?.length === 0 ? (
          <View
            style={{
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={{ color: COLORS.gray, fontSize: SIZES.medium }}>
              Hakuna Vikundi vilivyosajiliwa!
            </Text>
          </View>
        ) : (
          <FlatList
            data={statesVikundi?.vikundi}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <CfDataCard
                key={index}
                data={item}
                weekText={"Weeks"}
                navigation={navigation}
              />
            )}
            ListFooterComponent={<View />}
            ItemSeparatorComponent={<View style={{ marginBottom: 40 }} />}
            ListFooterComponentStyle={{ marginBottom: "80%" }}
          />
        )}
      </View>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default VikundiRecords;

{
  /* <FlatList
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
          /> */
}
