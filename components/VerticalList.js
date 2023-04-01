import { View } from "react-native";
import React from "react";
import { SIZES } from "../constants";
import KatibuTasks from "./KatibuTasks";
import MemberStackProvide from "../context/MemberStackProvide";
import CFProvider from "../context/CFProvider";
import CFStats from "./CFStats";
import AdminProvider from "../context/AdminProvider";
import AdminStats from "./AdminStats";

const VerticalList = ({ role, navigation, userEmail }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: SIZES.large,
        marginTop: SIZES.font,
        flex: 1,
      }}
    >
      {role == "Admin" ? (
        <AdminProvider>
          <AdminStats />
        </AdminProvider>
      ) : null}

      {/* Case of Community Facilitator */}
      {role == "CF" ? (
        <CFProvider>
          <CFStats />
        </CFProvider>
      ) : null}

      {/* Katibu Case */}
      {role == "Katibu" ? (
        <View
          style={{
            height: "100%",
          }}
        >
          <MemberStackProvide katibuEmail={userEmail}>
            <KatibuTasks navigation={navigation} />
          </MemberStackProvide>
        </View>
      ) : null}
    </View>
  );
};

export default VerticalList;
