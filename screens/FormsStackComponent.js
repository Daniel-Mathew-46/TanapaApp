import { View, ActivityIndicator } from "react-native";
import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WeeksRecords from "./WeeksRecords";
import FormsRecord from "./FormsRecord";
import FormData from "./FormData";
import FormsRecordProvider, {
  FormsDataContext,
} from "../context/FormsRecordProvider";
import { COLORS } from "../constants";

const FormsStack = createNativeStackNavigator();

const FormStackProvider = ({ route }) => {
  const katibuEmail = route?.params?.user;
  return (
    <FormsRecordProvider katibuEmail={katibuEmail}>
      <FormsStackComponent katibuEmail={katibuEmail} />
    </FormsRecordProvider>
  );
};

const FormsStackComponent = ({ katibuEmail }) => {
  const { states } = useContext(FormsDataContext);
  return (
    <>
      {states?.loading && states?.weeks?.length == 0 ? (
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
        <FormsStack.Navigator
          initialRouteName="WeekRecords"
          screenOptions={{ headerShown: false }}
        >
          <FormsStack.Screen name="WeekRecords" component={WeeksRecords} />
          <FormsStack.Screen name="FormsRecord" component={FormsRecord} />
          <FormsStack.Screen name="FormData" component={FormData} />
        </FormsStack.Navigator>
      )}
    </>
  );
};

export default FormStackProvider;
