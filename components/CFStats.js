import React, { useState, useContext } from "react";
import { SIZES, COLORS } from "../constants";
import Stats from "./Stats";
import { Dimensions, View, ActivityIndicator } from "react-native";
import { CFDashContext } from "../context/CFProvider";

const CFStats = () => {
  const { stats } = useContext(CFDashContext);
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("screen").width
  );
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Stats
          statsStyle={{
            width: windowWidth / 2.5,
            height: 60,
            justifyContent: "center",
            fontSize: SIZES.medium,
            iconSize: 20,
            paddingHorizontal: SIZES.font,
          }}
          text={"Katibu"}
          count={stats?.katibuCount}
        />
        <Stats
          statsStyle={{
            width: windowWidth / 2.5,
            height: 60,
            justifyContent: "center",
            fontSize: SIZES.medium,
            iconSize: 20,
            paddingHorizontal: SIZES.font,
          }}
          text={"Vikundi"}
          count={stats?.vikundiCount}
        />
      </View>
    </View>
  );
};

export default CFStats;
