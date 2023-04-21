import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import KatibuData from "./KatibuData";
import MakatibuRecords from "./MakatibuRecords";
import KatibuRecordsProvider, {
  KatibuRecordsContext,
} from "../context/KatibuRecordsProvider";
import { View, ActivityIndicator } from "react-native";
import { COLORS } from "../constants";
import RegisterKatibu from "./RegisterKatibu";

const CFKatibuStack = createNativeStackNavigator();

const KatibuRecordsProvide = ({ route }) => {
  const cfEmail = route?.params?.user;
  return (
    <KatibuRecordsProvider cfEmail={cfEmail}>
      <CfKatibuStack />
    </KatibuRecordsProvider>
  );
};

const CfKatibuStack = () => {
  const { states } = useContext(KatibuRecordsContext);

  return (
    <>
      {states?.myKatibus === null ? (
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
        <CFKatibuStack.Navigator
          initialRouteName="Rekodi ya Makatibu"
          screenOptions={{ headerShown: false }}
        >
          <CFKatibuStack.Screen
            name="Rekodi ya Makatibu"
            component={MakatibuRecords}
            initialParams={{ cfEmail: states.cfEmail }}
          />
          <CFKatibuStack.Screen
            name="Taarifa za Katibu"
            component={KatibuData}
          />
          <CFKatibuStack.Screen
            name="Sajili Katibu"
            component={RegisterKatibu}
            initialParams={{ cfEmail: states.cfEmail }}
          />
        </CFKatibuStack.Navigator>
      )}
    </>
  );
};

export default KatibuRecordsProvide;
