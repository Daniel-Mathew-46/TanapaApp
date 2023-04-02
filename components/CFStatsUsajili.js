import { View } from "react-native";
import React, { useContext } from "react";
import { SIZES, COLORS } from "../constants";
import { CFDashContext } from "../context/CFProvider";
import TaskCard from "./TaskCard";
import TaskText from "./TaskText";
import Stats from "./Stats";
const CFStatsUsajili = ({ navigation }) => {
  const { stats } = useContext(CFDashContext);
  return (
    <View>
      <View
        style={{
          paddingHorizontal: SIZES.large,
          width: "100%",
          backgroundColor: COLORS.primary,
          paddingVertical: SIZES.font,
        }}
      >
        <View>
          <TaskCard
            title={"Sajili Vikundi"}
            subTitle={"Vikundi vilivyosajiliwa"}
            count={stats?.vikundiCount}
            iconName={"addusergroup"}
            iconSize={40}
            customStyle={{ width: "100%", fontSize: SIZES.large }}
            navigation={navigation}
          />

          <View
            style={{
              flexDirection: "row",
              marginTop: SIZES.small,
              justifyContent: "space-between",
            }}
          >
            <TaskCard
              title={"Sajili Katibu"}
              subTitle={"Makatibu waliosajiliwa"}
              iconName={"adduser"}
              iconSize={30}
              count={stats?.katibuCount}
              customStyle={{ width: "100%", fontSize: SIZES.large }}
              navigation={navigation}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          width: "100%",
        }}
      >
        <TaskText text={"Usajili wa Karibuni"} />
        <View
          style={{
            height: "100%",
            paddingHorizontal: SIZES.extraLarge,
          }}
        >
          <View
            style={{
              paddingVertical: SIZES.small,
              flex: 1,
            }}
          >
            <View
              style={{
                width: "100%",
              }}
            >
              <Stats
                statsStyle={{
                  width: "100%",
                  justifyContent: "center",
                  fontSize: SIZES.extraLarge + 20,
                  iconSize: 50,
                  textFont: SIZES.large,
                  paddingHorizontal: SIZES.font,
                }}
                text={"Vikundi"}
                count={stats?.vikundiCount}
              />
            </View>
            <View
              style={{
                width: "100%",
              }}
            >
              <Stats
                statsStyle={{
                  width: "100%",
                  justifyContent: "center",
                  marginTop: SIZES.base + 2,
                  fontSize: SIZES.extraLarge + 20,
                  iconSize: 50,
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
    </View>
  );
};

export default CFStatsUsajili;
