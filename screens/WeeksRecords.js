import { View, Text, FlatList, SafeAreaView, StatusBar } from "react-native";
import React, { useContext, useState } from "react";
import { COLORS, SIZES } from "../constants";
import { FormCard } from "../components";
import { FormsDataContext } from "../context/FormsRecordProvider";

const WeeksRecords = ({ navigation, route }) => {
  const { states } = useContext(FormsDataContext);
  const [weeks, setWeeks] = useState(states?.weeks);
  const [forms_, setForms] = useState(states?.forms);
  const formRecords = [];
  for (i = 0; i < weeks?.length; i++) {
    let key = weeks[i];
    key = key.toString();
    let formObjProtoType = {};
    formObjProtoType["id"] = i;
    formObjProtoType["week"] = weeks[0];
    formObjProtoType["forms"] = forms_?.[i]?.[key];
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
                Fomu ulizotuma
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
                Rekodi za Fomu Ulizopakia
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
                marginTop: 10,
                height: 200,
              }}
            ></View>
          }
          ItemSeparatorComponent={<View style={{ marginBottom: 40 }} />}
        />
      </View>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default WeeksRecords;
