import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import { COLORS, assets, SIZES } from "../constants";
import { FormInput, Button, TextComponent } from "../components";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import Icon from "react-native-vector-icons/MaterialIcons";
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  query,
  collection,
  db,
  where,
  addDoc,
  getDocs,
} from "../context/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ setUser, setUserToken }) => {
  const [goToSignUp, setGoToSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const role_to_options = {
    Admin: [
      { opt: "Dashboard", icon: "view-dashboard-outline" },
      { opt: "Rekodi za MaCF", icon: "file-document-edit-outline" },
      { opt: "Report za MaCF", icon: "file-document-edit-outline" },
    ],
    CF: [
      { opt: "Dashboard", icon: "view-dashboard-outline" },
      { opt: "Usajili", icon: "file-document-edit-outline" },
      // { opt: "Fomu za Wiki", icon: "file-document-edit-outline" },
      { opt: "Rekodi za Makatibu", icon: "page-previous-outline" },
      { opt: "Rekodi za Vikundi", icon: "page-previous-outline" },
    ],
    Katibu: [
      { opt: "Dashboard", icon: "view-dashboard-outline" },
      { opt: "Wanachama", icon: "account-group-outline" },
      { opt: "Rekodi ya Fomu", icon: "page-previous-outline" },
    ],
  };

  const onPress = () => {
    if (email === "" || password === "") {
      alert("Tafadhali jaza taarifa sahihi!");
      return;
    }
    let user = null;
    if (!goToSignUp) {
      setLoading(!loading);
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          user = userCredentials.user;
          setUser(user);
          const fetchUserRole = async (userId) => {
            try {
              const q = query(
                collection(db, "users"),
                where("userId", "==", userId)
              );
              const docs = await getDocs(q);
              const doc = docs.docs[0].data();
              let role_ = await doc.role;
              setLoading(false);
              await AsyncStorage.setItem(
                "user",
                JSON.stringify({
                  user: user.email,
                  role: role_,
                  roles: role_to_options[role_],
                })
              );
              await setUserToken({
                user: user.email,
                role: role_,
                roles: role_to_options[role_],
              });
            } catch (e) {
              alert(e.message);
            }
          };
          fetchUserRole(user.uid);
        })
        .catch((error) => {
          setLoading(false);
          alert(error.message);
        });
    } else {
      setLoading(!loading);
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          setLoading(false);
          const user = userCredentials.user;
          const addData = async (user) => {
            try {
              await addDoc(collection(db, "users"), {
                userId: user.uid,
                name: fullname,
                email,
                password,
                role: "Katibu",
              });
            } catch (e) {
              alert(e.message);
            }
          };
          addData(user);
          alert("Umefanikiwa Kusajili");
          setGoToSignUp(false);
        })
        .catch((error) => {
          setLoading(false);
          alert(error.message);
        });
    }
  };

  return (
    <View
      style={{
        backgroundColor: COLORS.darkWhite,
        alignItems: "center",
        flex: 1,
        width: "100%",
        paddingHorizontal: SIZES.medium,
      }}
    >
      <View
        style={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
          width: "100%",
        }}
      >
        <KeyboardAwareScrollView>
          <Image
            source={assets.logo3}
            resizeMode="contain"
            style={{
              height: 300,
              width: 300,
              backgroundColor: COLORS.darkWhite,
              alignSelf: "center",
            }}
          />

          {goToSignUp && (
            <FormInput
              label={"Jina Kamili"}
              placeholder={"Ingiza jina kamili"}
              icon={<Icon name="person" size={25} color={COLORS.gray} />}
              isPasswordInput={false}
              onChangeText={(fullname) => setFullName(fullname)}
            />
          )}

          <FormInput
            label={"Barua Pepe"}
            placeholder={"Ingiza barua pepe"}
            icon={<Icon name="mail" size={25} color={COLORS.gray} />}
            isPasswordInput={false}
            onChangeText={(email) => setEmail(email)}
          />
          <FormInput
            label={"Neno Siri"}
            placeholder={"Ingiza neno siri"}
            icon={<Icon name="lock" size={25} color={COLORS.gray} />}
            isPasswordInput={true}
            secureTextEntry={true}
            onChangeText={(passwd) => setPassword(passwd)}
          />

          {goToSignUp && (
            <FormInput
              label={"Rudia Neno Siri"}
              placeholder={"Ingiza neno siri"}
              icon={<Icon name="lock" size={25} color={COLORS.gray} />}
              isPasswordInput={true}
              secureTextEntry={true}
            />
          )}

          <TextComponent text={"                   "} />

          <Button
            loading={loading}
            onPress={onPress}
            text={goToSignUp ? "SAJILI" : "INGIA"}
          />
          <View
            style={{
              marginTop: 10,
              width: "100%",
              paddingHorizontal: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {goToSignUp ? (
              <Text
                style={{
                  fontStyle: "italic",
                  fontSize: 17,
                  color: COLORS.gray,
                }}
              >
                Una akaunti tayari?
                <Text
                  style={{
                    color: COLORS.primary,
                    fontStyle: "italic",
                    fontSize: 17,
                  }}
                  onPress={() => setGoToSignUp(false)}
                >
                  Ingia
                </Text>
              </Text>
            ) : null}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </View>
  );
};

export default Login;
