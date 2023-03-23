import { SafeAreaView, StatusBar } from "react-native";
import React from "react";
import Login from "./Login";
import { COLORS } from "../constants";

const Auth = ({ setUser, setUserToken, setRole }) => {
  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      <Login setUser={setUser} setUserToken={setUserToken} setRole={setRole} />
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.darkWhite} />
    </SafeAreaView>
  );
};

export default Auth;
