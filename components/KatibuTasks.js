import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useReducer, useState } from "react";
import { SIZES, COLORS } from "../constants";
import KatibuTaskCard from "./KatibuTaskCard";
import { KatibuDataContext } from "../context/MemberStackProvide";
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

const KatibuTasks = ({ navigation }) => {
  const { states } = useContext(KatibuDataContext);
  const [weekNumber, setWeekNumber] = useState(null);
  const [canFillForms, setCanFillForms] = useState(null);
  const dayOfWeek = new Date().getDay();
  const date = new Date().getDate();

  useEffect(() => {
    const determineWeekNumber = async () => {
      // await AsyncStorage.removeItem("WeekData", () => console.log("removed!"));
      try {
        const prevWeekData = await AsyncStorage.getItem("WeekData");
        const weekData = {};
        let week;
        if (dayOfWeek >= 0 && dayOfWeek < 7) {
          if (
            JSON.parse(prevWeekData)?.week === null ||
            JSON.parse(prevWeekData)?.currKatibu !== states.katibuData
          ) {
            const q_ = query(
              collection(db, "WeeksForms"),
              where("Katibu", "==", states.katibuData),
              orderBy("week", "desc"),
              limit(3)
            );
            const weekDocs = await getDocs(q_);
            if (weekDocs.docs.length === 0) {
              week = 1;
              weekData["week"] = week;
              weekData["date"] = date;
              weekData["currKatibu"] = states.katibuData;
            } else {
              week = await weekDocs.docs[0].data().week;
              week = week + 1;
              weekData["week"] = week;
              weekData["date"] = date;
              weekData["currKatibu"] = states.katibuData;
            }
          } else {
            week = JSON.parse(prevWeekData)?.week;
            if (date !== JSON.parse(prevWeekData)?.date) {
              week = Number(week) + 1;
            }
            weekData["week"] = week;
            weekData["date"] = date;
            weekData["currKatibu"] = states.katibuData;
          }
          await AsyncStorage.setItem("WeekData", JSON.stringify(weekData));
          setWeekNumber(week);
          setCanFillForms(true);
        } else {
          setCanFillForms(false);
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    determineWeekNumber();
  }, [dayOfWeek]);

  return (
    <>
      {canFillForms === null ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <ActivityIndicator size={40} color={COLORS.primary} />
        </View>
      ) : (
        <>
          {canFillForms === false ? (
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: COLORS.gray, fontSize: SIZES.large }}>
                Fomu hizi hujazwa Ijumaa tuu!
              </Text>
            </View>
          ) : (
            <View
              style={{
                marginTop: -5,
                paddingRight: SIZES.font,
                paddingVertical: SIZES.font,
                width: "100%",
              }}
            >
              {/* Render the first 2 */}
              <View
                style={{
                  width: "100%",
                  paddingHorizontal: SIZES.font,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: SIZES.font,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      height: 5,
                      width: 5,
                      backgroundColor: COLORS.primary,
                      borderRadius: 10,
                    }}
                  ></View>
                  <Text
                    style={{
                      color: COLORS.primary,
                      textTransform: "uppercase",
                      fontSize: SIZES.large,
                      marginLeft: SIZES.base - 3,
                    }}
                  >
                    {weekNumber !== null ? (
                      `Week ${weekNumber}`
                    ) : (
                      <Text
                        style={{
                          color: COLORS.primary,
                          textTransform: "uppercase",
                          fontSize: SIZES.large,
                          marginLeft: SIZES.base - 3,
                        }}
                      >
                        Week{" "}
                        <ActivityIndicator
                          color={COLORS.primary}
                          size={17}
                          style={{ alignSelf: "center" }}
                        />
                      </Text>
                    )}
                  </Text>
                </View>
              </View>
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
                  text={"Shughuli za kila wiki za kikundi"}
                  toForm={"SHUGHULI ZA WIKI"}
                  navigation={navigation}
                  week={weekNumber}
                />
                <KatibuTaskCard
                  text={"Kitabu cha Hisa cha Mteja"}
                  styles={{ marginLeft: SIZES.font }}
                  toForm={"HISA"}
                  navigation={navigation}
                  week={weekNumber}
                />
              </View>
            </View>
          )}
        </>
      )}
    </>
  );
};

export default KatibuTasks;
