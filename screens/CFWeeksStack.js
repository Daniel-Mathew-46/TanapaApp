import { View, Text } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CFWeeksRecords from "./CFWeeksRecords";
import CFFormsRecord from "./CFFormsRecord";

const CfWeeksStack = createNativeStackNavigator();
const CFWeeksStack = () => {
  return (
    <CfWeeksStack.Navigator
      initialRouteName="rekodi za wiki"
      screenOptions={{ headerShown: false }}
    >
      <CfWeeksStack.Screen name="rekodi za wiki" component={CFWeeksRecords} />
      <CfWeeksStack.Screen name="fomu za wiki" component={CFFormsRecord} />
    </CfWeeksStack.Navigator>
  );
};

export default CFWeeksStack;
