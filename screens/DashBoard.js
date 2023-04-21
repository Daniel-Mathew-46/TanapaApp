import { View, SafeAreaView, ScrollView, StatusBar } from "react-native";
import React from "react";

import {
  GroupsInformation,
  HelloText,
  HorizontalList,
  HorizontalListAdmin,
  PicNameHeader,
  SectionTitle,
  TaskText,
  VerticalList,
} from "../components";
import { COLORS } from "../constants";
import CfWeekFormDataProvider from "../context/CfWeekFormDataProvider";

const DashBoard = ({ navigation, route }) => {
  role = route.params?.role;
  const userEmail = route.params?.user;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.darkWhite,
      }}
    >
      <ScrollView>
        {/* HeaderUser */}
        <PicNameHeader username={userEmail} role={role} />

        {/* HelloText */}
        <HelloText username={userEmail} />

        {/* TaskText */}
        {(role == "Admin" || role == "CF") && (
          <TaskText text={`Shughuli za ${role}`} role={role} />
        )}

        {role !== "Katibu" ? (
          <View>
            {/* Horizontal List */}
            {role == "Admin" && (
              <HorizontalListAdmin
                navigation={navigation}
                role={role}
                adminEmail={userEmail}
              />
            )}

            {role == "CF" && (
              <HorizontalList
                navigation={navigation}
                role={role}
                cfEmail={userEmail}
              />
            )}

            {/* SectionTitle */}
            {role == "CF" && (
              <SectionTitle text={` Rekodi ya shughuli za ${role}`} />
            )}

            {role == "Admin" && <SectionTitle text={`Kwa Ujumla`} />}
          </View>
        ) : null}

        {/* Vertical List */}
        <VerticalList
          navigation={navigation}
          role={role}
          userEmail={userEmail}
        />

        {role == "CF" && (
          <View>
            {/* SectionTitle for CF role*/}
            <SectionTitle text={"Taarifa za Vikundi kwa wiki"} />

            {/* Cards Taarifa za Vikundi for CF role*/}
            <GroupsInformation
              navigation={navigation}
              role={role}
              cfEmail={userEmail}
            />
          </View>
        )}

        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={COLORS.darkWhite}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default DashBoard;
