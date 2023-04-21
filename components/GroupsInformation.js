import { View, Text } from "react-native";
import React from "react";
import { SIZES } from "../constants";
import LongCard from "./LongCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  query,
  orderBy,
  limit,
  db,
  getDocs,
  where,
  collection,
} from "../context/firebase";

const GroupsInformation = ({ navigation, cfEmail, role }) => {
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
          count={0}
          week={"Wiki hii"}
          subText={"Fomu ya taarifa za vikundi"}
        />
        <LongCard
          count={0}
          week={"Wiki hii"}
          subText={"Fomu za tathmini endelevu"}
        />
      </View>
    </View>
  );
};

export default GroupsInformation;
