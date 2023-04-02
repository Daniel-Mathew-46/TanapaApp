import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import KatibuData from "./KatibuData";
import MakatibuRecords from "./MakatibuRecords";
import KatibuRecordsProvider, {
  KatibuRecordsContext,
} from "../context/KatibuRecordsProvider";
import { View, ActivityIndicator, Text } from "react-native";
import { COLORS, SIZES } from "../constants";
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

  const renderStack = (katibus) => {
    if (katibus == null) {
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <ActivityIndicator size={40} color={COLORS.primary} />
        </View>
      );
    } else if (katibus.length == 0) {
      return (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.gray,
              fontSize: SIZES.medium,
            }}
          >
            Hakuna Taarifa!
          </Text>
        </View>
      );
    } else {
      return (
        <CFKatibuStack.Navigator screenOptions={{ headerShown: false }}>
          <CFKatibuStack.Screen
            name="Rekodi ya Makatibu"
            component={MakatibuRecords}
            initialParams={{ cfEmail: states.cfEmail }}
          />
          <CFKatibuStack.Screen
            name="Taarifa za Katibu"
            component={KatibuData}
            initialParams={{ cfEmail: states.cfEmail }}
          />
          <CFKatibuStack.Screen
            name="Sajili Katibu"
            component={RegisterKatibu}
            initialParams={{ cfEmail: states.cfEmail }}
          />
        </CFKatibuStack.Navigator>
      );
    }
  };
  return <>{renderStack(states.myKatibus)}</>;
};

export default KatibuRecordsProvide;
