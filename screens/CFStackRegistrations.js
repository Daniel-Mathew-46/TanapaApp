import { Text } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterKikundi from "./RegisterKikundi";
import RegisterKatibu from "./RegisterKatibu";
import RegistrationsCf from "./RegistrationsCf";
import { COLORS, SIZES } from "../constants";
import DashBoard from "./DashBoard";

const CFStackRegister = createNativeStackNavigator();

const CFStackRegistrations = ({ route, navigation }) => {
  return (
    <CFStackRegister.Navigator
      initialRouteName="Registration"
      screenOptions={{}}
    >
      {/* <CFStackRegister.Screen
        name="Dashboardd"
        component={DashBoard}
        initialParams={{ role: "CF" }}
        options={{
          headerStyle: { backgroundColor: COLORS.darkWhite },
          headerTitleAlign: "center",
          headerTitle: "CF",
          headerTitleStyle: {
            textTransform: "uppercase",
            color: COLORS.primary,
            fontSize: SIZES.large,
          },
        }}
      /> */}
      <CFStackRegister.Screen
        name="Registration"
        component={RegistrationsCf}
        options={{
          headerLeft: () => {
            <Text>Rudi</Text>;
          },
          headerStyle: { backgroundColor: COLORS.primary },
          headerTitleAlign: "center",
          headerTitle: "USAJILI",
          headerTitleStyle: {
            textTransform: "uppercase",
            color: COLORS.white,
            fontSize: SIZES.large,
          },
        }}
      />
      <CFStackRegister.Screen
        name="Sajili Vikundi"
        component={RegisterKikundi}
        options={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerTitleAlign: "center",
          headerTitle: "SAJILI VIKUNDI",
          headerTitleStyle: {
            textTransform: "uppercase",
            color: COLORS.white,
            fontSize: SIZES.large,
          },
        }}
      />
      <CFStackRegister.Screen
        name="Sajili Katibu"
        component={RegisterKatibu}
        options={{
          headerStyle: { backgroundColor: COLORS.primary },
          headerTitleAlign: "center",
          headerTitle: "SAJILI KATIBU",
          headerTitleStyle: {
            textTransform: "uppercase",
            color: COLORS.white,
            fontSize: SIZES.large,
          },
        }}
      />
      <CFStackRegister.Screen name="Sajili Kijiji" component={RegisterKatibu} />
    </CFStackRegister.Navigator>
  );
};

export default CFStackRegistrations;
