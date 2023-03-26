import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormShughuli from "./FormShughuli";
import FormMzunguko from "./FormMzunguko";
import FormHisa from "./FormHisa";
import FormWakopaji from "./FormWakopaji";
import FormTaarifaMwezi from "./FormTaarifaMwezi";
import FormMahudhurio from "./FormMahudhurio";
import DashBoard from "./DashBoard";

const KatibuStack = createNativeStackNavigator();

const KatibuStackComponent = ({ route }) => {
  var role = route.params?.role;
  var katibuEmail = route.params?.user;
  return (
    <KatibuStack.Navigator
      initialRouteName="KatibuDashboard"
      screenOptions={{ headerShown: false }}
    >
      <KatibuStack.Screen
        name="KatibuDashboard"
        component={DashBoard}
        initialParams={{ role, user: katibuEmail }}
      />
      <KatibuStack.Screen
        name="SHUGHULI"
        component={FormShughuli}
        initialParams={{ katibuEmail }}
      />
      <KatibuStack.Screen
        name="MZUNGUKO"
        component={FormMzunguko}
        initialParams={{ katibuEmail }}
      />
      <KatibuStack.Screen
        name="HISA"
        component={FormHisa}
        initialParams={{ katibuEmail }}
      />
      <KatibuStack.Screen
        name="WAKOPAJI"
        component={FormWakopaji}
        initialParams={{ katibuEmail }}
      />
      <KatibuStack.Screen
        name="TAARIFA YA MWEZI"
        component={FormTaarifaMwezi}
        initialParams={{ katibuEmail }}
      />
      <KatibuStack.Screen
        name="MAHUDHURIO"
        component={FormMahudhurio}
        initialParams={{ katibuEmail }}
      />
    </KatibuStack.Navigator>
  );
};

export default KatibuStackComponent;
