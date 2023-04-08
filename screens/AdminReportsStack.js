import { View, Text } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CFReport from "./CFReport";
import CFRecords from "./CFRecords";

const AdminStack = createNativeStackNavigator();

const AdminReportsStack = () => {
  return (
    <AdminStack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="CFRecords"
    >
      <AdminStack.Screen name="CFrecords" component={CFRecords} />
      <AdminStack.Screen name="CFReport" component={CFReport} />
    </AdminStack.Navigator>
  );
};

export default AdminReportsStack;
