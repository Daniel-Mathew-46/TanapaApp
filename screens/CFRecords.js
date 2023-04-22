import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from "react-native";
import React, { useContext } from "react";
import { COLORS, SIZES } from "../constants";
import { DataCard } from "../components";
import { CFRecordsContext } from "../context/CfRecordsProvider";

const CFRecords = ({ navigation }) => {
  const { states } = useContext(CFRecordsContext);

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
                  Orodha ya Community Facilitators
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
                    navigation.navigate("Register CF");
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
          data={states?.myCfs}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <DataCard
              key={index}
              hasAvatar={true}
              data={item}
              navigation={navigation}
            />
          )}
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
