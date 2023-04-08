import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, ActivityIndicator, Text } from "react-native";
import { COLORS, SIZES } from "../constants";
import CFReport from "./CFReport";
import CfRecordsProvider, {
  CFRecordsContext,
} from "../context/CfRecordsProvider";
import CfFormsRecordProvide from "./CfStackComponent";

const CFReportsStack = createNativeStackNavigator();

const CfListProvider = ({ route }) => {
  const adminEmail = route.params?.user;
  return (
    <CfRecordsProvider adminEmail={adminEmail}>
      <CfReportsStack />
    </CfRecordsProvider>
  );
};

const CfReportsStack = () => {
  const { states } = useContext(CFRecordsContext);
  return (
    <>
      {states?.myCfs === null ? (
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
          {states?.myCfs?.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: COLORS.gray, fontSize: SIZES.medium }}>
                Hakuna CF wowote!
              </Text>
            </View>
          ) : (
            <CFReportsStack.Navigator
              initialRouteName="List ya MaCF"
              screenOptions={{ headerShown: false }}
            >
              <CFReportsStack.Screen
                name="List ya MaCF"
                component={CFReport}
                initialParams={{ adminEmail: states.adminEmail }}
              />
              <CFReportsStack.Screen
                name="Cf Vikundi"
                component={CfFormsRecordProvide}
              />
            </CFReportsStack.Navigator>
          )}
        </>
      )}
    </>
  );
};

export default CfListProvider;
