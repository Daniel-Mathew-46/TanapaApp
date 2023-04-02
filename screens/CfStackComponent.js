import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import KikundiReport from "./KikundiReport";
import VikundiRecords from "./VikundiRecords";
import CfWeekRecords from "./CfWeekRecords";
import KikundiReportData from "./KikundiReportData";
import RegisterKikundi from "./RegisterKikundi";

const CFStack = createNativeStackNavigator();

const CfStackComponent = () => {
  return (
    <CFStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={"Taarifa za Vikundi"}
    >
      <CFStack.Screen name="Taarifa za Vikundi" component={VikundiRecords} />
      <CFStack.Screen name="Sajili Kikundi" component={RegisterKikundi} />
      <CFStack.Screen name="Week Records" component={CfWeekRecords} />
      <CFStack.Screen name="Taarifa za Kikundi" component={KikundiReport} />
      <CFStack.Screen
        name="Kikundi Report Data"
        component={KikundiReportData}
      />
    </CFStack.Navigator>
  );
};

export default CfStackComponent;
