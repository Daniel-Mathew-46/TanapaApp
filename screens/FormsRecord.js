import { View, Text, FlatList, SafeAreaView, StatusBar } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { FormCard, FormDataCard } from "../components";

const FormsRecord = ({ navigation, route }) => {
  const data = route.params?.data;

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
                {`Fomu Za Week Ya ${data?.week} ulizotuma`}
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
                {`Rekodi za Fomu Ulizopakia Week Ya ${data?.week}`}
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
          data={data?.forms}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <FormDataCard text={item} data={item} navigation={navigation} />
          )}
          ListHeaderComponentStyle={{ marginBottom: SIZES.base }}
          keyExtractor={(item) => item.id}
          ListFooterComponent={
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                marginTop: 10,
                height: 200,
              }}
            >
              {/* <Button text={"Pakua"} /> */}
            </View>
          }
          ItemSeparatorComponent={<View style={{ marginBottom: 40 }} />}
        />
      </View>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default FormsRecord;
