import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES, TasksDataAdmin } from "../constants";

const Item = ({ item, navigation, adminEmail }) => {
  return (
    <View
      style={{
        paddingLeft: SIZES.base,
      }}
    >
      <View
        style={{
          height: 170,
          width: 220,
          backgroundColor: COLORS.primary,
          borderRadius: 5,
          justifyContent: "space-between",
          paddingHorizontal: SIZES.font,
          paddingVertical: SIZES.base,
          marginRight: SIZES.base,
        }}
      >
        <View>
          <Text
            style={{
              color: COLORS.white,
              fontSize: SIZES.medium,
            }}
          >
            {item.shughuli}
          </Text>
        </View>
        <View>
          <View>
            <Text
              style={{
                color: COLORS.secondary,
                fontSize: SIZES.font,
              }}
            >
              {item.description}
            </Text>
          </View>
        </View>
        <View
          style={{
            // width: "100%",
            paddingHorizontal: SIZES.medium,
            marginTop: SIZES.base,
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            style={{
              paddingHorizontal: SIZES.font,
              paddingVertical: SIZES.base,
              backgroundColor: COLORS.white,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 5,
            }}
            onPress={() => {
              switch (item.shughuli) {
                case "Sajili Community Facilitator":
                  navigation.navigate("Rekodi za MaCF", {
                    adminEmail,
                  });
                  break;
                case "Angalia Report":
                  navigation.navigate("Report za MaCF", { adminEmail });
                  break;
                default:
                  break;
              }
            }}
          >
            <Text
              style={{
                color: COLORS.primary,
                fontSize: SIZES.large,
                textTransform: "uppercase",
              }}
            >
              {item.task}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const HorizontalListAdmin = ({ navigation, adminEmail }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: SIZES.large,
        marginTop: SIZES.font,
      }}
    >
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={TasksDataAdmin}
        renderItem={({ item }) => (
          <Item item={item} navigation={navigation} adminEmail={adminEmail} />
        )}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default HorizontalListAdmin;
