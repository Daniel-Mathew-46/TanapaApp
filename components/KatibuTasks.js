import { View, Text } from "react-native";
import React from "react";
import { SIZES } from "../constants";
import KatibuTaskCard from "./KatibuTaskCard";

const KatibuTasks = ({ navigation }) => {
  return (
    <View
      style={{
        paddingRight: SIZES.font,
        paddingVertical: SIZES.font,
        width: "100%",
      }}
    >
      {/* Render the first 2 */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <KatibuTaskCard
          text={"Shughuli za Kikundi kwa wiki"}
          toForm={"SHUGHULI"}
          navigation={navigation}
        />
        <KatibuTaskCard
          text={"Fomu ya kumaliza Mzunguko"}
          styles={{ marginLeft: SIZES.font }}
          toForm={"MZUNGUKO"}
          navigation={navigation}
        />
      </View>

      {/* Render the other 2 */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginTop: SIZES.extraLarge + 10,
        }}
      >
        <KatibuTaskCard
          text={"Kitabu cha Hisa cha Mteja"}
          toForm={"HISA"}
          navigation={navigation}
        />
        <KatibuTaskCard
          text={"Fomu ya wakopaji na marejesho"}
          styles={{ marginLeft: SIZES.font }}
          toForm={"WAKOPAJI"}
          navigation={navigation}
        />
      </View>

      {/* Render the other 2 */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          width: "100%",
          marginTop: SIZES.extraLarge + 10,
        }}
      >
        <KatibuTaskCard
          text={"Taarifa ya mwezi ya kikundi"}
          toForm={"TAARIFA YA MWEZI"}
          navigation={navigation}
        />
        <KatibuTaskCard
          text={"Kadi ya mahudhurio ya kila wiki"}
          styles={{ marginLeft: SIZES.font }}
          toForm={"MAHUDHURIO"}
          navigation={navigation}
        />
      </View>
    </View>
  );
};

export default KatibuTasks;
