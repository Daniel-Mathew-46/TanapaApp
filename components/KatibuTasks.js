import { View, Text, ActivityIndicator } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SIZES, COLORS } from "../constants";
import KatibuTaskCard from "./KatibuTaskCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  query,
  orderBy,
  limit,
  db,
  getDocs,
  where,
  collection,
  doc,
  getDoc,
} from "../context/firebase";
import { KatibuTasksContexts } from "../context/KatibuTasksProvider";

const KatibuTasks = ({ navigation }) => {
  const { states, dispatch } = useContext(KatibuTasksContexts);
  // const [weekNumber, setWeekNumber] = useState(states?.weekNumber);
  // const [canFillForms, setCanFillForms] = useState(null);
  // const dayOfWeek = new Date().getDay();
  // const date = new Date().getDate();
  const katibuItemName = "WeekData " + states.katibuData;

  //Fetching all the necessary data we need(last week's data)
  useEffect(() => {
    const determineWeekNumber = async () => {
      // await AsyncStorage.removeItem("WeekData", () => console.log("removed!"));
      try {
        const prevWeekData = await AsyncStorage.getItem(katibuItemName);
        if (
          JSON.parse(prevWeekData)?.week === null ||
          JSON.parse(prevWeekData)?.currKatibu !== states.katibuData
        ) {
          const docRef = doc(db, "KatibuWeeksData", states.katibuData);
          const weekDataDocSnap = await getDoc(docRef);
          if (weekDataDocSnap.exists()) {
            console.log("This katibus Data exists!Found");
            let weekNumberFetched = 4;
            setWeekNumber(weekNumberFetched);
          } else {
            //No weeks found for this katibu. Its his first week
            let globalPrevWeekDataObj = {
              kikundi_data: { ...states.kikundiData },
              weekNumber: 0,
              kadiYaMahudhurio: {},
              LejaYaMfukoWaJamii: {},
              LejaYaHisa: {},
              ShughuliYaKikundiKwaWiki: {},
            };
            console.log("Its his first week");
            dispatch({
              type: "SET_PREVWEEK_DATA",
              prevWeekData: globalPrevWeekDataObj,
            });
          }
        }
      } catch (e) {
        console.log(e.message);
      }
    };
    determineWeekNumber();
  }, []);

  return (
    <>
      {states?.canFillForms === null ? (
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
          {states?.canFillForms === false ? (
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
                    {states?.weekNumber !== null ? (
                      `Week ${states?.weekNumber}`
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
                {/* <KatibuTaskCard
                  text={"Fomu ya wakopaji na marejesho"}
                  toForm={"WAKOPAJI"}
                  navigation={navigation}
                  week={weekNumber}
                /> */}
                <KatibuTaskCard
                  text={"Kujaza fomu za wiki hii"}
                  styles={{ width: "96%", marginHorizontal: SIZES.font }}
                  toForm={"BeginFill"}
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
                  styles={{ width: "96%", marginHorizontal: SIZES.font }}
                  toForm={"HISA"}
                  navigation={navigation}
                />
                {/* <KatibuTaskCard
                  text={"Leja ya Hisa za Mteja"}
                  styles={{ marginLeft: SIZES.font }}
                  toForm={"LEJAHISA"}
                  navigation={navigation}
                  week={weekNumber}
                /> */}
              </View>

              {/* Render the other 2 */}
              {/* <View
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
              </View> */}
            </View>
          )}
        </>
      )}
    </>
  );
};

export default KatibuTasks;
