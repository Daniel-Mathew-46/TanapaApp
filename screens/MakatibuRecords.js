import { View, FlatList, StatusBar } from "react-native";
import React, { useContext } from "react";
import { SIZES, assets, COLORS } from "../constants";
import { CustomKatibuDataCard } from "../components";
import { KatibuRecordsContext } from "../context/KatibuRecordsProvider";

const MakatibuRecords = ({ navigation, route }) => {
  const { states, dispatch } = useContext(KatibuRecordsContext);
  const cfEmail = route.params?.cfEmail;
  return (
    <View>
      <View
        style={{
          paddingHorizontal: SIZES.font,
          paddingVertical: SIZES.large,
        }}
      >
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
          ListFooterComponentStyle={{ marginBottom: "20%" }}
        />
      </View>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </View>
  );
};

export default MakatibuRecords;
