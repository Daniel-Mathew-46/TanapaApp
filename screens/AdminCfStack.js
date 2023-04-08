import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CFRecords from "./CFRecords";
import CFData from "./CFData";
import RegistrationAdmin from "./RegistrationAdmin";
import CfRecordsProvider, {
  CFRecordsContext,
} from "../context/CfRecordsProvider";
import { View, ActivityIndicator, Text } from "react-native";
import { COLORS, SIZES } from "../constants";

const AdminCFStack = createNativeStackNavigator();

const CfRecordsProvide = ({ route }) => {
  const adminEmail = route.params?.user;
  return (
    <CfRecordsProvider adminEmail={adminEmail}>
      <AdminCfStack />
    </CfRecordsProvider>
  );
};
const AdminCfStack = () => {
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
            <AdminCFStack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="Rekodi za MaCf"
            >
              <AdminCFStack.Screen
                name="Rekodi za MaCf"
                component={CFRecords}
                initialParams={{
                  adminEmail: states.adminEmail,
                }}
              />
              <AdminCFStack.Screen
                name="Register CF"
                component={RegistrationAdmin}
                initialParams={{ adminEmail: states.adminEmail }}
              />
              <AdminCFStack.Screen name="Taarifa za CF" component={CFData} />
            </AdminCFStack.Navigator>
          )}
        </>
      )}
    </>
  );
};

export default CfRecordsProvide;
