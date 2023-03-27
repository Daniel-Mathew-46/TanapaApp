import "react-native-gesture-handler";
import { useFonts } from "expo-font";
import {
  Auth,
  CFRecords,
  CFReport,
  DashBoard,
  DrawerContent,
  RegistrationsCf,
  VikundiRecords,
  Members,
  FormsRecord,
  KatibuStackComponent,
  CfStackComponent,
  RegistrationAdmin,
  RegisterKikundi,
  RegisterKatibu,
  MakatibuRecords,
  MemberStackProvider,
  FormsStackComponent,
} from "./screens";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { COLORS, SIZES } from "./constants";
import { useEffect, useState } from "react";
import AuthProvider from "./context/AuthProvider";
import { auth, onAuthStateChanged, signOut } from "./context/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MembersStackComponent from "./screens/MembersStackComponent";

const Drawer = createDrawerNavigator();

export default function App() {
  const [userAuth, setUserAuth] = useState();

  const [userToken, setUserToken] = useState(null);

  const [initializing, setInitializing] = useState(true);

  const onAuthStateChangedCallback = (user) => {
    const checkToken = async () => {
      try {
        const userToken = await AsyncStorage.getItem("user");
        if (userToken != null) {
          let tokenObj = await JSON.parse(userToken);
          setUserToken(tokenObj);
          setUserAuth(user);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    checkToken();
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = onAuthStateChanged(auth, onAuthStateChangedCallback);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <AuthProvider>
      {!userToken ? (
        <Auth setUser={setUserAuth} setUserToken={setUserToken} />
      ) : (
        <NavigationContainer>
          <Drawer.Navigator
            drawerContent={(props) => (
              <DrawerContent
                {...props}
                user={userToken?.user}
                role={userToken?.role}
                data={userToken?.roles}
                setUserToken={setUserToken}
              />
            )}
          >
            {userToken.role == "Admin" && (
              <Drawer.Group>
                <Drawer.Screen
                  name="Dashboard"
                  component={DashBoard}
                  options={{
                    headerStyle: { backgroundColor: COLORS.darkWhite },
                    headerTitleAlign: "center",
                    headerTitle: userToken?.role,
                    headerTitleStyle: {
                      textTransform: "uppercase",
                      color: COLORS.primary,
                      fontSize: SIZES.large,
                    },
                  }}
                  initialParams={{
                    role: userToken?.role,
                    user: userToken?.user,
                  }}
                />
                <Drawer.Screen
                  name="CFRecords"
                  component={CFRecords}
                  options={{
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerTitleAlign: "center",
                    headerTitle: "",
                    headerTitleStyle: {
                      textTransform: "uppercase",
                      color: COLORS.primary,
                      fontSize: SIZES.large,
                    },
                  }}
                />
                <Drawer.Screen
                  name="RegisterCF"
                  component={RegistrationAdmin}
                  options={{
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerTitleAlign: "center",
                    headerTitle: "",
                    headerTitleStyle: {
                      textTransform: "uppercase",
                      color: COLORS.primary,
                      fontSize: SIZES.large,
                    },
                  }}
                />
                <Drawer.Screen
                  name="CFReport"
                  component={CFReport}
                  initialParams={{ role: userToken?.role }}
                  options={{
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerTitleAlign: "center",
                    headerTitle: "",
                    headerTitleStyle: {
                      textTransform: "uppercase",
                      color: COLORS.primary,
                      fontSize: SIZES.large,
                    },
                  }}
                />
              </Drawer.Group>
            )}

            {userToken.role == "CF" && (
              <Drawer.Group>
                <Drawer.Screen
                  name="Dashboard"
                  component={DashBoard}
                  initialParams={{
                    role: userToken?.role,
                    user: userToken?.user,
                  }}
                  options={{
                    headerStyle: { backgroundColor: COLORS.darkWhite },
                    headerTitleAlign: "center",
                    headerTitle: userToken?.role,
                    headerTitleStyle: {
                      textTransform: "uppercase",
                      color: COLORS.primary,
                      fontSize: SIZES.large,
                    },
                  }}
                />
                <Drawer.Screen
                  name="Usajili"
                  component={RegistrationsCf}
                  initialParams={{ role: userToken?.role }}
                  options={{
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
                <Drawer.Screen
                  name="Makatibu Records"
                  component={MakatibuRecords}
                  initialParams={{ role: userToken?.role }}
                  options={{
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerTitleAlign: "center",
                    headerTitle: "Rekodi Za Makatibu",
                    headerTitleStyle: {
                      textTransform: "uppercase",
                      color: COLORS.white,
                      fontSize: SIZES.large,
                    },
                  }}
                />
                <Drawer.Screen
                  name="Sajili Vikundi"
                  component={RegisterKikundi}
                  initialParams={{ role: userToken?.role }}
                  options={{
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerTitleAlign: "center",
                    headerTitle: "SAJILI KIKUNDI",
                    headerTitleStyle: {
                      textTransform: "uppercase",
                      color: COLORS.white,
                      fontSize: SIZES.large,
                    },
                  }}
                />
                <Drawer.Screen
                  name="Sajili Katibu"
                  component={RegisterKatibu}
                  initialParams={{ role: userToken?.role }}
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
                <Drawer.Screen
                  name="Rekodi za Vikundi"
                  component={CfStackComponent}
                  options={{
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerTitleAlign: "center",
                    headerTitle: "Rekodi Za Vikundi",
                    headerTitleStyle: {
                      textTransform: "uppercase",
                      color: COLORS.white,
                      fontSize: SIZES.large,
                    },
                  }}
                />
              </Drawer.Group>
            )}

            {userToken.role == "Katibu" && (
              <Drawer.Group>
                <Drawer.Screen
                  name="Dashboard"
                  component={KatibuStackComponent}
                  initialParams={{
                    role: userToken?.role,
                    user: userToken?.user,
                  }}
                  options={{
                    headerStyle: { backgroundColor: COLORS.darkWhite },
                    headerTitleAlign: "center",
                    headerTitle: userToken?.role,
                    headerTitleStyle: {
                      textTransform: "uppercase",
                      color: COLORS.primary,
                      fontSize: SIZES.large,
                    },
                  }}
                />
                <Drawer.Screen
                  name="Wanachama"
                  component={MemberStackProvider}
                  initialParams={{
                    role: userToken?.role,
                    user: userToken?.user,
                  }}
                  options={{
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerTitleAlign: "center",
                    headerTitle: "",
                    headerTitleStyle: {
                      textTransform: "uppercase",
                      color: COLORS.primary,
                      fontSize: SIZES.large,
                    },
                  }}
                />
                <Drawer.Screen
                  name="Rekodi ya Fomu"
                  component={FormsStackComponent}
                  initialParams={{ role: userToken?.role }}
                  options={{
                    headerStyle: { backgroundColor: COLORS.primary },
                    headerTitleAlign: "center",
                    headerTitle: "",
                    headerTitleStyle: {
                      textTransform: "uppercase",
                      color: COLORS.primary,
                      fontSize: SIZES.large,
                    },
                  }}
                />
              </Drawer.Group>
            )}
          </Drawer.Navigator>
        </NavigationContainer>
      )}
    </AuthProvider>
  );
}
