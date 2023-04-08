import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import VikundiRecords from "./VikundiRecords";
import RegisterKikundi from "./RegisterKikundi";
import CfFormsRecordProvider from "../context/CfFormsRecordProvider";
import { CfFormsDataContext } from "../context/CfFormsRecordProvider";
import KikundiData from "./KikundiData";
import { View, ActivityIndicator, Text } from "react-native";
import { COLORS, SIZES } from "../constants";
import FormStackProvider from "./FormsStackComponent";

// import KatibuRecordsProvider from "../context/KatibuRecordsProvider";
const CFStack = createNativeStackNavigator();

const CfFormsRecordProvide = ({ route }) => {
  const cfEmail = route?.params?.user;
  return (
    <CfFormsRecordProvider cfEmail={cfEmail}>
      <CfStackComponent cfEmail={cfEmail} />
    </CfFormsRecordProvider>
  );
};

const CfStackComponent = ({ cfEmail }) => {
  const { statesVikundi } = useContext(CfFormsDataContext);
  return (
    <>
      {statesVikundi?.vikundi === null ? (
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
          {statesVikundi?.vikundi?.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: COLORS.gray, fontSize: SIZES.medium }}>
                Hakuna Vikundi!
              </Text>
            </View>
          ) : (
            <CFStack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName={"Taarifa za Vikundi"}
            >
              <CFStack.Screen
                name="Taarifa za Vikundi"
                component={VikundiRecords}
                initialParams={{ vikundi: statesVikundi?.vikundi }}
              />
              <CFStack.Screen
                name="Details za Kikundi"
                component={KikundiData}
              />
              <CFStack.Screen
                name="Sajili Kikundi"
                initialParams={{ cfEmail }}
                component={RegisterKikundi}
              />
              <CFStack.Screen
                name="Week Records"
                component={FormStackProvider}
              />
            </CFStack.Navigator>
          )}
        </>
      )}
    </>
  );
};

export default CfFormsRecordProvide;
