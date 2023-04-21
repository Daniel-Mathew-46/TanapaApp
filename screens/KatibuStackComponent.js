import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FormHisa from "./FormHisa";
import FormWakopaji from "./FormWakopaji";
import FormMahudhurio from "./FormMahudhurio";
import DashBoard from "./DashBoard";
import FormLejaMfuko from "./FormLejaMfuko";
import FormLejaHisa from "./FormLejaHisa";
import KatibuTasksProvider from "../context/KatibuTasksProvider";
import FormShughuli from "./FormShughuli";

const KatibuStack = createNativeStackNavigator();

const KatibuTasksProvide = ({ route }) => {
  var role = route.params?.role;
  var katibuEmail = route.params?.user;
  return (
    <KatibuTasksProvider katibuEmail={katibuEmail}>
      <KatibuStackComponent role={role} katibuEmail={katibuEmail} />
    </KatibuTasksProvider>
  );
};

const KatibuStackComponent = ({ role, katibuEmail }) => {
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
        name="WAKOPAJI"
        component={FormWakopaji}
        initialParams={{ katibuEmail }}
      />
      <KatibuStack.Screen
        name="MAHUDHURIO"
        component={FormMahudhurio}
        initialParams={{ katibuEmail }}
      />
      <KatibuStack.Screen
        name="LEJAMFUKO"
        component={FormLejaMfuko}
        initialParams={{ katibuEmail }}
      />
      <KatibuStack.Screen
        name="LEJAHISA"
        component={FormLejaHisa}
        initialParams={{ katibuEmail }}
      />
      <KatibuStack.Screen
        name="SHUGHULI ZA WIKI"
        component={FormShughuli}
        initialParams={{ katibuEmail }}
      />
      <KatibuStack.Screen
        name="HISA"
        component={FormHisa}
        initialParams={{ katibuEmail }}
      />
    </KatibuStack.Navigator>
  );
};

export default KatibuTasksProvide;
