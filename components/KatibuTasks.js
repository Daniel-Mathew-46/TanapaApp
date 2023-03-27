import { View, Text } from "react-native";
import React, { useState } from "react";
import { SIZES } from "../constants";
import KatibuTaskCard from "./KatibuTaskCard";
import CustomInput from "./CustomInput";

const KatibuTasks = ({ navigation }) => {
  const [weekNumber, setWeekNumber] = useState(null);
  const validateWeekNumber = (number) => {
    if (isNaN(number)) {
      alert("Ingiza Week Number Sahihi");
      return;
    }
    if (number === "") {
      alert("week Number Inatakiwa kujazwa!");
      return;
    }
    setWeekNumber(number);
  };
  return (
    <View
      style={{
        paddingRight: SIZES.font,
        paddingVertical: SIZES.font,
        width: "100%",
      }}
    >
      {/* Render the first 2 */}
      <CustomInput
        placeholder={"Wiki"}
        isNumber={true}
        onChangeText={(number) => validateWeekNumber(number)}
      />
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
          week={weekNumber}
        />
        <KatibuTaskCard
          text={"Fomu ya kumaliza Mzunguko"}
          styles={{ marginLeft: SIZES.font }}
          toForm={"MZUNGUKO"}
          navigation={navigation}
          week={weekNumber}
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
          week={weekNumber}
        />
        <KatibuTaskCard
          text={"Fomu ya wakopaji na marejesho"}
          styles={{ marginLeft: SIZES.font }}
          toForm={"WAKOPAJI"}
          navigation={navigation}
          week={weekNumber}
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
          week={weekNumber}
        />
        <KatibuTaskCard
          text={"Kadi ya mahudhurio ya kila wiki"}
          styles={{ marginLeft: SIZES.font }}
          toForm={"MAHUDHURIO"}
          navigation={navigation}
          week={weekNumber}
        />
      </View>
    </View>
  );
};

export default KatibuTasks;
