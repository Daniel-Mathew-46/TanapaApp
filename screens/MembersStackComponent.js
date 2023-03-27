import React, { useContext } from "react";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Members from "./Members";
import MemberData from "./MemberData";
import RegisterMwanachama from "./RegisterMwanachama";
import MemberStackProvide, {
  KatibuDataContext,
} from "../context/MemberStackProvide";
import { COLORS } from "../constants";

const MemberStack = createNativeStackNavigator();

const MemberStackProvider = ({ route }) => {
  const katibuEmail = route?.params?.user;
  return (
    <MemberStackProvide katibuEmail={katibuEmail}>
      <MembersStackComponent katibuEmail={katibuEmail} />
    </MemberStackProvide>
  );
};

const MembersStackComponent = ({}) => {
  const { states } = useContext(KatibuDataContext);
  return (
    <>
      {states?.loading && states?.members.length == 0 ? (
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
        <MemberStack.Navigator
          initialRouteName="Members"
          screenOptions={{ headerShown: false }}
        >
          <MemberStack.Screen
            name="Members"
            component={Members}
            initialParams={{ kikundi: states?.kikundi }}
          />
          <MemberStack.Screen name="MemberData" component={MemberData} />
          <MemberStack.Screen
            name="RegisterMwanachama"
            component={RegisterMwanachama}
          />
        </MemberStack.Navigator>
      )}
    </>
  );
};

export default MemberStackProvider;
