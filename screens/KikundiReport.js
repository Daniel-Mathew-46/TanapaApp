import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useContext, useEffect } from "react";
import { COLORS, SIZES } from "../constants";
import { CfFormDataCard, WhiteButton } from "../components";
import { CfFormsDataContext } from "../context/CfFormsRecordProvider";
import { getDoc, db, doc } from "../context/firebase";

const KikundiReport = ({ route, navigation }) => {
  const { statesVikundi, dispatch } = useContext(CfFormsDataContext);
  const data = route.params?.data;
  const kikundiName = route.params?.kikundi;
  const katibu_email = route.params?.katibu_email;
  const forms = data?.forms;
  const week = data?.week;
  console.log("formsInKikReport", forms);
  console.log("currFormDatas", statesVikundi?.vikundiData?.[katibu_email]);
  useEffect(() => {
    const getFormData = async (forms) => {
      const currStates = { ...statesVikundi?.vikundiData?.[katibu_email] };
      const formsDataArray = [...currStates.formData];
      let formObj = {};
      let weekFormsObj = {};
      let formDataArray = [];
      try {
        for (let i = 0; i < forms?.length; i++) {
          let docName = forms?.[i];
          const doc_ = await getDoc(doc(db, "FormDocs", docName));
          if (doc_.exists()) {
            formObj[docName] = doc_.data();
          }
        }
        formDataArray.push(formObj);
        weekFormsObj[week] = formDataArray;
        formsDataArray.push(weekFormsObj);
        currStates.formData = [...formDataArray];
        await dispatch({ type: "SET_WEEKS_DATA", weeksData: currStates });
      } catch (e) {
        console.log(e.message);
      }
    };
    getFormData(forms);
  }, []);

  const kikundiData = [
    {
      id: 1,
      text: `Taarifa za Kikundi`,
    },
    {
      id: 2,
      text: "Kitabu cha hisa cha mteja",
    },
    {
      id: 3,
      text: "Fomu ya wakopaji na marejesho",
    },
  ];
  console.log(statesVikundi?.vikundiData?.[katibu_email]?.formData);
  return (
    <SafeAreaView style={{}}>
      <View>
        <View
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
              style={{
                marginTop: SIZES.small,
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  color: COLORS.white,
                  fontSize: SIZES.large + 2,
                }}
              >
                {`Taarifa za ${kikundiName} Wiki ya ${week}`}
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
                {`Orodha ya fomu zilizojazawa Wiki ya ${week}`}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Render Cards */}
      <View
        style={{
          width: "100%",
          paddingHorizontal: SIZES.font,
          paddingVertical: SIZES.extraLarge,
        }}
      >
        {statesVikundi?.vikundiData?.[katibu_email]?.formData.length === 0 ? (
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              marginTop: 10,
            }}
          >
            <ActivityIndicator size={30} color={COLORS.primary} />
          </View>
        ) : (
          <FlatList
            data={forms}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <CfFormDataCard
                key={index}
                text={item}
                navigation={navigation}
                data={kikundiData}
              />
            )}
            ListHeaderComponentStyle={{ marginBottom: SIZES.base }}
            ListFooterComponent={
              <View style={{ position: "absolute", right: -10 }}>
                <WhiteButton />
              </View>
            }
            ItemSeparatorComponent={<View style={{ marginBottom: 40 }} />}
            ListFooterComponentStyle={{ marginBottom: "80%" }}
          />
        )}
      </View>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default KikundiReport;
