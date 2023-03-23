import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import KikundiReport from "./KikundiReport";
import VikundiRecords from "./VikundiRecords";
import KatibuList from "./KatibuList";

const CFStack = createNativeStackNavigator();

const CfStackComponent = () => {
  return (
    <CFStack.Navigator screenOptions={{ headerShown: false }}>
      <CFStack.Screen name="Taarifa za Vikundi" component={VikundiRecords} />
      <CFStack.Screen name="Taarifa za Kikundi" component={KikundiReport} />
      {/* <CFStack.Group screenOptions={{ presentation:}}>
        <CFStack.Screen name="makatibu" component={KatibuList}/>
        <CFStack.Screen name="makatibu" component={KatibuList}/>
      </CFStack.Group> */}
    </CFStack.Navigator>
  );
};

export default CfStackComponent;
