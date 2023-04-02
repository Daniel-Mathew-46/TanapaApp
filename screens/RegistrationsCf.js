import { SafeAreaView, StatusBar } from "react-native";
import React from "react";
import CFStatsUsajili from "../components/CFStatsUsajili";
import CFProvider from "../context/CFProvider";
import { COLORS } from "../constants";

const RegistrationsCf = ({ navigation }) => {
  return (
    <SafeAreaView>
      <CFProvider>
        <CFStatsUsajili navigation={navigation} />
      </CFProvider>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default RegistrationsCf;
