import { View, Text, SafeAreaView, ScrollView, StatusBar } from "react-native";
import React from "react";
import {
  GroupsInformation,
  Header,
  HelloText,
  HorizontalList,
  HorizontalListAdmin,
  PicNameHeader,
  SectionTitle,
  TaskText,
  VerticalList,
} from "../components";
import { COLORS } from "../constants";

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
        {/* HeaderComponent */}
        {/* <Header text={role} color={COLORS.primary} /> */}

        {/* HeaderUser */}
        <PicNameHeader username={userEmail} role={role} />

        {/* HelloText */}
        <HelloText username={userEmail} />

        {/* TaskText */}
        {(role == "Admin" || role == "CF") && (
          <TaskText text={`Shughuli za ${role}`} role={role} />
        )}
        {role == "Katibu" && <TaskText text={`wiki`} role={role} />}

        {role !== "Katibu" ? (
          <View>
            {/* Horizontal List */}
            {role == "Admin" && (
              <HorizontalListAdmin navigation={navigation} role={role} />
            )}

            {role == "CF" && (
              <HorizontalList navigation={navigation} role={role} />
            )}

            {/* SectionTitle */}
            {role == "CF" && (
              <SectionTitle text={` Rekodi ya shughuli za ${role}`} />
            )}

            {role == "Admin" && <SectionTitle text={`Kwa Ujumla`} />}
          </View>
        ) : null}

        {/* Vertical List */}
        <VerticalList navigation={navigation} role={role} />

        {role == "CF" && (
          <View>
            {/* SectionTitle for CF role*/}
            <SectionTitle text={"Rekodi ya Taarifa za Vikundi"} />

            {/* Cards Taarifa za Vikundi for CF role*/}
            <GroupsInformation />
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
