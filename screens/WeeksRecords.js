import { View, Text, FlatList, SafeAreaView, StatusBar } from "react-native";
import React, { useContext } from "react";
import { COLORS, SIZES } from "../constants";
import { FormCard } from "../components";
import { FormsDataContext } from "../context/FormsRecordProvider";

const WeeksRecords = ({ navigation, route }) => {
  const { states } = useContext(FormsDataContext);
  const weeks = states.weeks;
  const forms_ = states?.forms;
  const formRecords = [];
  for (i = 0; i < weeks?.length; i++) {
    let key = weeks[i];
    key = key.toString();
    let formObjProtoType = {};
    formObjProtoType["id"] = i;
    formObjProtoType["week"] = key;
    formObjProtoType["forms"] = forms_?.[0]?.[key];
    formRecords.push(formObjProtoType);
  }

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
            <View>
              <Text
                style={{
                  textAlign: "left",
                  color: COLORS.white,
                  fontSize: SIZES.extraLarge,
                }}
              >
                Fomu zilizotumwa
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
                Rekodi za Fomu zilizopakiwa
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
          renderItem={({ item, index }) => (
            <FormCard
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

export default WeeksRecords;
