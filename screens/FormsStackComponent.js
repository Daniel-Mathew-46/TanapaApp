import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WeeksRecords from "./WeeksRecords";
import FormsRecord from "./FormsRecord";
import FormData from "./FormData";

const FormsStack = createNativeStackNavigator();

const FormsStackComponent = () => {
  return (
    <FormsStack.Navigator
      initialRouteName="WeekRecords"
      screenOptions={{ headerShown: false }}
    >
      <FormsStack.Screen name="WeekRecords" component={WeeksRecords} />
      <FormsStack.Screen name="FormsRecord" component={FormsRecord} />
      <FormsStack.Screen name="FormData" component={FormData} />
    </FormsStack.Navigator>
  );
};

export default FormsStackComponent;
