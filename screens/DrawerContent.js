import React from "react";
import { View, StyleSheet } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { Avatar, Title, Caption, Drawer } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { assets, COLORS, SIZES } from "../constants";
import { auth, signOut } from "../context/firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DrawerContent = (props) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.darkWhite,
      }}
    >
      <DrawerContentScrollView {...props} style={{ marginTop: -4 }}>
        <View style={styles.drawerContent}>
          <View style={styles.userInfoSection}>
            <View>
              <Avatar.Image source={assets.person01} size={70} />
              <View>
                <Title style={styles.title}>Zaidu Nyoni</Title>
                <Caption style={styles.caption}>{props?.role}</Caption>
              </View>
            </View>
          </View>

          <Drawer.Section style={styles.drawerSection}>
            {props?.data?.map((item, index) => (
              <DrawerItem
                key={index}
                label={item.opt}
                icon={() => (
                  <Icon name={item.icon} size={30} color={COLORS.primary} />
                )}
                onPress={() => props.navigation.navigate(item.opt)}
                labelStyle={{
                  marginLeft: -10,
                  fontSize: SIZES.large,
                  color: COLORS.primary,
                  color: COLORS.gray,
                  fontWeight: "bold",
                }}
              />
            ))}
          </Drawer.Section>
        </View>
      </DrawerContentScrollView>
      <Drawer.Section>
        <DrawerItem
          label={"Toka"}
          icon={({ color, size }) => (
            <Icon name="exit-to-app" size={size} color={COLORS.primary} />
          )}
          onPress={async () => {
            signOut(auth).then(() => {
              const onSignOut = async () => {
                try {
                  await AsyncStorage.removeItem("user");
                  await props?.setUserToken(null);
                } catch (e) {
                  alert(e.message);
                }
              };
              onSignOut();
            });

            // .then(() => {
            // })
            // .then(() => props?.setUserToken(null))
            // .catch((error) => alert(error.message));
          }}
          labelStyle={{
            fontSize: SIZES.large,
            color: COLORS.primary,
            color: COLORS.gray,
            fontWeight: "bold",
          }}
        />
      </Drawer.Section>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: SIZES.small,
  },
  title: {
    fontSize: 22,
    marginTop: 18,
    color: COLORS.white,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 18,
    marginTop: 4,
    color: COLORS.darkWhite,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragragh: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
