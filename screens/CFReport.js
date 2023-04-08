import { View, Text, FlatList, SafeAreaView, StatusBar } from "react-native";
import React, { useContext } from "react";
import { COLORS, SIZES } from "../constants";
import { AdminDataCard } from "../components";
import { CFRecordsContext } from "../context/CfRecordsProvider";

const CFReport = ({ route, navigation }) => {
  const { states } = useContext(CFRecordsContext);

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
                Repoti Zilizotumwa na CF
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
                Orodha ya MaCF Wako na Ripoti zao
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
          data={states?.myCfs}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <AdminDataCard
              key={index}
              data={item}
              text={"reports"}
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

export default CFReport;
