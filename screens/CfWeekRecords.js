import {
  View,
  Text,
  FlatList,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { COLORS, SIZES } from "../constants";
import { CfFormCard } from "../components";
import {
  query,
  collection,
  where,
  getDocs,
  db,
  onSnapshot,
  limit,
  getCountFromServer,
} from "../context/firebase";
import { CfFormsDataContext } from "../context/CfFormsRecordProvider";
import FormStackProvider from "./FormsStackComponent";
// import FormsRecordProvider from "../context/FormsRecordProvider";
// import { FormsStackComponent } from ".";

const CfWeekRecords = ({ navigation, route }) => {
  const kikundiName = route.params?.kikundiName;
  const katibuEmail = route.params?.katibuEmail;
  // const { statesVikundi, dispatch } = useContext(CfFormsDataContext);
  // const formDataRecords = [];

  // const [forms_, setForms_] = useState(
  //   statesVikundi?.vikundiData?.[katibuEmail]?.forms
  // );
  // const weeks = [
  //   {
  //     id: 1,
  //     week: 1,
  //   },
  //   {
  //     id: 2,
  //     week: 1,
  //   },
  //   {
  //     id: 3,
  //     week: 1,
  //   },
  // ];
  ////////////////////////////
  // if (typeof statesVikundi?.vikundiData?.[katibuEmail] === "undefined") {
  //   const q = query(
  //     collection(db, "WeeksForms"),
  //     where("Katibu", "==", katibuEmail),
  //     limit(10)
  //   );

  //   const q_ = query(collection(db, "FormDocs"));

  //   const unsub = onSnapshot(q_, async (doc) => {
  //     let vikundi_data = { ...statesVikundi?.vikundiData };
  //     const weeksDocs = await getDocs(q);
  //     if (weeksDocs.docs.length === 0) {
  //       vikundi_data[katibuEmail] = { weeks: [], forms: [], formData: [] };
  //       dispatch({
  //         type: "SET_WEEKS_DATA",
  //         weeksData: vikundi_data,
  //       });
  //     } else {
  //       let forms = [];
  //       let formsObj = {};
  //       let weeks = [];

  //       try {
  //         weeksDocs.forEach(async (doc_) => {
  //           let week = doc_.data().week;
  //           weeks.push(week);
  //           formsObj[week] = await doc_.data().forms;
  //         });
  //         forms.push(formsObj);
  //         weeks.sort(function (a, b) {
  //           return a - b;
  //         });

  //         vikundi_data[katibuEmail] = { weeks, forms, formData: [] };
  //         console.log("vikundiData", vikundi_data);
  //         dispatch({
  //           type: "SET_WEEKS_DATA",
  //           weeksData: vikundi_data,
  //         });
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //     // }
  //   });
  // }

  // if (typeof statesVikundi?.vikundiData?.[katibuEmail] !== "undefined") {
  //   const getForms = async () => {
  //     const weeks = statesVikundi?.vikundiData?.[katibuEmail]?.weeks;
  //     const forms_ = await statesVikundi?.vikundiData?.[katibuEmail]?.forms;
  //     console.log("forms_", forms_);
  //     if (weeks.length > 0) {
  //       for (i = 0; i < weeks?.length; i++) {
  //         let key = weeks[i];
  //         key = key.toString();
  //         let dataObjProtoType = {};
  //         dataObjProtoType["id"] = i;
  //         dataObjProtoType["week"] = key;
  //         dataObjProtoType["forms"] = forms_?.[i]?.[key];
  //         formDataRecords.push(dataObjProtoType);
  //       }
  //     }
  //     console.log("formDataArays,", formDataRecords);
  //   };
  //   getForms();
  // }
  // const q = query(
  //   collection(db, "WeeksForms"),
  //   where("Katibu", "==", katibuEmail),
  //   limit(10)
  // );

  // const q_ = query(collection(db, "FormDocs"));

  // const unsub = onSnapshot(q_, async (doc) => {
  //   const snapshot = await getCountFromServer(q_);
  //   let formsCount = snapshot.data().count;
  //   if (states.formsCount !== formsCount) {
  //     const weeksDocs = await getDocs(q);
  //     if (weeksDocs.docs.length === 0) {
  //       dispatch({
  //         type: "SET_WEEKS",
  //         count: formsCount,
  //         payload: [],
  //         formsPayload: [],
  //       });
  //     } else {
  //       let forms = [];
  //       let formsObj = {};
  //       let weeks = [];
  //       try {
  //         weeksDocs.forEach(async (doc_) => {
  //           let week = doc_.data().week;
  //           weeks.push(week);
  //           formsObj[week] = await doc_.data().forms;
  //         });
  //         forms.push(formsObj);
  //         weeks.sort(function (a, b) {
  //           return a - b;
  //         });

  //         if (states.weeks !== weeks || states?.forms !== forms)
  //           dispatch({
  //             type: "SET_WEEKS",
  //             count: formsCount,
  //             payload: weeks,
  //             formsPayload: forms,
  //           });
  //       } catch (e) {
  //         console.log(e);
  //       }
  //     }
  //   }
  // });
  // useEffect(() => {
  //   if (typeof statesVikundi?.vikundiData?.[katibuEmail] === "undefined") return unsub()
  // });
  return <FormStackProvider route={route} />;
  // <SafeAreaView style={{}}>

  {
    /* <View> */
  }
  {
    /* <FormsRecordProvider katibuEmail={katibuEmail}>
        <FormsStackComponent katibuEmail={katibuEmail} />
      </FormsRecordProvider> */
  }
  {
    /* <View
          style={{
            width: "100%",
            paddingTop: SIZES.base,
            paddingBottom: SIZES.small,
            backgroundColor: COLORS.primary,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <View
            style={{
              paddingHorizontal: SIZES.medium,
              width: "100%",
            }}
          >
            <View
              style={
                {
                  // marginTop: SIZES.small,
                }
              }
            >
              <Text
                style={{
                  textAlign: "left",
                  color: COLORS.white,
                  fontSize: SIZES.extraLarge,
                }}
              >
                Rekodi za Fomu kila Wiki
              </Text>
            </View>
            <View
              style={{
                marginTop: SIZES.small,
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  fontSize: SIZES.large,
                }}
              >
                {`Fomu za ${kikundiName} za kila wiki`}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          width: "100%",
          paddingHorizontal: SIZES.font,
          paddingVertical: SIZES.extraLarge,
        }}
      >
        {Object.keys(statesVikundi?.vikundiData).length === 0 ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <ActivityIndicator size={30} color={COLORS.gray} />
          </View>
        ) : (
          <>
            {statesVikundi?.vikundiData?.[katibuEmail]?.weeks?.length === 0 ? (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: COLORS.gray, fontSize: SIZES.medium }}>
                  Hakuna taarifa za wiki
                </Text>
              </View>
            ) : (
              <FlatList
                data={formDataRecords.reverse()}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => (
                  <CfFormCard
                    key={index}
                    text={`Week ${item.week}`}
                    data={item}
                    kikundi={kikundiName}
                    katibu_email={katibuEmail}
                    navigation={navigation}
                    options={{
                      angalia: "Angalia",
                      badilisha: "Pakua",
                    }}
                  />
                )}
                ListHeaderComponentStyle={{ marginBottom: SIZES.base }}
                ListFooterComponent={
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      height: 200,
                    }}
                  />
                }
                ItemSeparatorComponent={
                  <View
                    style={{ marginBottom: 40 }}
                    ListFooterComponentStyle={{ marginBottom: "20%" }}
                  />
                }
              />
            )}
          </>
        )} */
  }
  {
    /* //////////////////////////////////// */
  }
  {
    /* <FlatList
          data={forms}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <CfFormCard
              key={index}
              text={`Week ${item.week}`}
              data={item}
              navigation={navigation}
              options={{
                angalia: "Angalia",
                badilisha: "Pakua",
              }}
            />
          )}
          ListHeaderComponentStyle={{ marginBottom: SIZES.base }}
          ListFooterComponent={
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 200,
              }}
            />
            // style={{
            //   justifyContent: "center",
            //   alignItems: "center",
            //   marginTop: 10,
            //   height: 200,
            // }}
            // ></View>
          }
          ItemSeparatorComponent={
            <View
              style={{ marginBottom: 40 }}
              ListFooterComponentStyle={{ marginBottom: "20%" }}
            />
          }
        /> */
  }
  {
    /* </View> */
  }
  {
    /* <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} /> */
  }
  // </SafeAreaView>
  // );
};

export default CfWeekRecords;
