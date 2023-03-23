import { View, Text } from "react-native";
import React from "react";
import { SIZES } from "../constants";
import LongCard from "./LongCard";

const GroupsInformation = () => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: SIZES.large,
        marginTop: SIZES.font,
      }}
    >
      <View>
        <LongCard
          count={2}
          week={"Wiki hii"}
          subText={"Fomu za taarifa za vikundi"}
        />
        <LongCard
          count={4}
          week={"Wiki hii"}
          subText={"Fomu za tathmini endelevu"}
        />
      </View>
    </View>
  );
};

export default GroupsInformation;
