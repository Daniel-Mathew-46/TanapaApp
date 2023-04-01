import React, { useContext } from "react";
import { SIZES, COLORS } from "../constants";
import Stats from "./Stats";
import { View, ActivityIndicator } from "react-native";
import { AdminDashContext } from "../context/AdminProvider";

const AdminStats = () => {
  const { stats } = useContext(AdminDashContext);
  return (
    <View
      style={{
        height: "100%",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingVertical: SIZES.base,
          flex: 1,
        }}
      >
        {/* RightItem */}
        <View
          style={{
            width: "50%",
            height: "100%",
          }}
        >
          <Stats
            statsStyle={{
              width: "100%",
              height: "100%",
              justifyContent: "center",
              fontSize: SIZES.extraLarge,
              iconSize: 70,
              textFont: SIZES.extraLarge,
              paddingHorizontal: SIZES.font,
            }}
            text={"Vikundi"}
            count={stats?.vikundiCount}
          />
        </View>

        {/* LeftItem */}
        <View
          style={{
            width: "50%",
          }}
        >
          <View
            style={{
              height: "100%",
              paddingRight: SIZES.base,
            }}
          >
            <Stats
              statsStyle={{
                width: "100%",
                paddingHorizontal: SIZES.base,
                marginLeft: SIZES.font,
                justifyContent: "center",
                fontSize: SIZES.extraLarge + 8,
                textFont: SIZES.large,
                paddingHorizontal: SIZES.font,
                iconSize: 40,
              }}
              text={"Community Facilitator"}
              count={stats?.cfCount}
            />
            <Stats
              statsStyle={{
                width: "100%",
                marginLeft: SIZES.font,
                justifyContent: "center",
                marginTop: SIZES.base + 2,
                fontSize: SIZES.extraLarge + 8,
                iconSize: 40,
                textFont: SIZES.large,
                paddingHorizontal: SIZES.font,
              }}
              text={"Makatibu"}
              count={stats?.katibuCount}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default AdminStats;
