import { View, Text, FlatList } from "react-native";
import React from "react";
import { SIZES, assets } from "../constants";
import { CustomKatibuDataCard, FormsHeader } from "../components";

const MakatibuRecords = ({ navigation }) => {
  const personData = [
    {
      id: 1,
      name: "Zaidu Nyoni",
      role: "Katibu Tembo Pilipili",
      avatar: assets.person01,
    },
    {
      id: 2,
      name: "Hamis Fereji",
      role: "Katibu Msufiri",
      avatar: assets.person02,
    },
    {
      id: 3,
      name: "Zaidu Nyoni",
      role: "Katibu Tembo Pilipili",
      avatar: assets.person01,
    },
    {
      id: 4,
      name: "Zaidu Nyoni",
      role: "Katibu Tembo Pilipili",
      avatar: assets.person01,
    },
    {
      id: 5,
      name: "Zaidu Nyoni",
      role: "Katibu Tembo Pilipili",
      avatar: assets.person01,
    },
    {
      id: 6,
      name: "Zaidu Nyoni",
      role: "Katibu Tembo Pilipili",
      avatar: assets.person01,
    },
    {
      id: 7,
      name: "Zaidu Nyoni",
      role: "Katibu Tembo Pilipili",
      avatar: assets.person01,
    },
    {
      id: 8,
      name: "Zaidu Nyoni",
      role: "Katibu Tembo Pilipili",
      avatar: assets.person01,
    },
  ];

  return (
    <View>
      <View
        style={{
          paddingHorizontal: SIZES.font,
          paddingVertical: SIZES.large,
        }}
      >
        <FlatList
          data={personData}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <CustomKatibuDataCard data={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View />}
          ItemSeparatorComponent={<View style={{ marginBottom: 40 }} />}
        />
      </View>
    </View>
  );
};

export default MakatibuRecords;
