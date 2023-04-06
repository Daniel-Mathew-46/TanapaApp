import { View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SIZES } from "../constants";
import KatibuTaskCard from "./KatibuTaskCard";
import CustomInput from "./CustomInput";
import { KatibuDataContext } from "../context/MemberStackProvide";

const KatibuTasks = ({ navigation }) => {
  const { states } = useContext(KatibuDataContext);
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
          text={"Fomu ya wakopaji na marejesho"}
          toForm={"WAKOPAJI"}
          navigation={navigation}
          week={weekNumber}
        />
        <KatibuTaskCard
          text={"Kadi ya mahudhurio ya kila wiki"}
          styles={{ marginLeft: SIZES.font }}
          toForm={"MAHUDHURIO"}
          navigation={navigation}
          week={weekNumber}
          members={states?.members}
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
          text={"Leja ya Mfuko wa Jamii wa Kikundi"}
          toForm={"LEJAMFUKO"}
          navigation={navigation}
          week={weekNumber}
        />
        <KatibuTaskCard
          text={"Leja ya Hisa za Mteja"}
          styles={{ marginLeft: SIZES.font }}
          toForm={"LEJAHISA"}
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
      </View>
    </View>
  );
};

export default KatibuTasks;
