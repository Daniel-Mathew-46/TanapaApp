import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import GroupsInformation from "../components/GroupsInformation";
import FormShughuli from "./FormShughuli";
import DashBoard from "./DashBoard";

const CfDashStack = createNativeStackNavigator();

const CFDashNavigator = ({ route }) => {
  var role = route.params?.role;
  var cfEmail = route.params?.user;
  return (
    <CfDashStack.Navigator
      initialRouteName="dashboard"
      screenOptions={{ headerShown: false }}
    >
      <CfDashStack.Screen
        name="dashboard"
        component={DashBoard}
        initialParams={{ role, user: cfEmail }}
      />
      <CfDashStack.Screen name="form wiki" component={FormShughuli} />
    </CfDashStack.Navigator>
  );
};

export default CFDashNavigator;
