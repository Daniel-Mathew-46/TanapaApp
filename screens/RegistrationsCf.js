import { View, SafeAreaView, StatusBar, FlatList } from "react-native";
import React from "react";
import { COLORS, SIZES, assets } from "../constants";
import { TaskCard, TaskText, Stats } from "../components";

const RegistrationsCf = ({ navigation }) => {
  return (
    <SafeAreaView>
      <View>
        <View
          style={{
            paddingHorizontal: SIZES.large,
            width: "100%",
            backgroundColor: COLORS.primary,
            paddingVertical: SIZES.font,
          }}
        >
          <View>
            <TaskCard
              title={"Sajili Vikundi"}
              subTitle={"Vikundi vilivyosajiliwa"}
              count={2}
              iconName={"addusergroup"}
              iconSize={40}
              customStyle={{ width: "100%", fontSize: SIZES.large }}
              navigation={navigation}
            />

            <View
              style={{
                flexDirection: "row",
                marginTop: SIZES.small,
                justifyContent: "space-between",
              }}
            >
              <TaskCard
                title={"Sajili Katibu"}
                subTitle={"Makatibu waliosajiliwa"}
                iconName={"adduser"}
                iconSize={30}
                count={1}
                customStyle={{ width: "45%", fontSize: SIZES.medium - 2 }}
                navigation={navigation}
              />
              <TaskCard
                title={"Sajili Kijiji"}
                subTitle={"Vijiji vilivyosajiliwa"}
                iconName={"addusergroup"}
                iconSize={30}
                count={4}
                customStyle={{ width: "45%", fontSize: SIZES.medium - 2 }}
                navigation={navigation}
              />
            </View>
          </View>
        </View>

        <View
          style={{
            width: "100%",
          }}
        >
          <TaskText text={"Usajili wa Karibuni"} />
          <View
            style={{
              height: "100%",
              paddingHorizontal: SIZES.extraLarge,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                paddingVertical: SIZES.small,
                flex: 1,
              }}
            >
              {/* RightItem */}
              <View
                style={{
                  width: "50%",
                  height: "100%",
                }}
              >
                <Stats
                  statsStyle={{
                    width: "100%",
                    justifyContent: "center",
                    fontSize: SIZES.extraLarge,
                    iconSize: 70,
                    textFont: SIZES.extraLarge,
                    paddingHorizontal: SIZES.font,
                    paddingVertical: SIZES.extraLarge + 30,
                  }}
                  text={"Vikundi"}
                  count={7}
                />
              </View>

              {/* LeftItem */}
              <View
                style={{
                  width: "50%",
                }}
              >
                <View
                  style={{
                    height: "100%",
                    paddingRight: SIZES.base,
                  }}
                >
                  <Stats
                    statsStyle={{
                      width: "100%",
                      paddingHorizontal: SIZES.base,
                      marginLeft: SIZES.font,
                      justifyContent: "center",
                      fontSize: SIZES.extraLarge + 8,
                      textFont: SIZES.large,
                      paddingHorizontal: SIZES.font,
                      iconSize: 40,
                    }}
                    text={"Vijiji"}
                    count={4}
                  />
                  <Stats
                    statsStyle={{
                      width: "100%",
                      marginLeft: SIZES.font,
                      justifyContent: "center",
                      marginTop: SIZES.base + 2,
                      fontSize: SIZES.extraLarge + 8,
                      iconSize: 40,
                      textFont: SIZES.large,
                      paddingHorizontal: SIZES.font,
                    }}
                    text={"Makatibu"}
                    count={2}
                  />
                </View>
              </View>
            </View>
          </View>
          {/* <View
            style={{
              paddingHorizontal: SIZES.font,
              paddingVertical: SIZES.large,
            }}
          >
            <FlatList
              data={personData}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <CustomDataCard
                  data={item}
                  hasAvatar={true}
                  options={{
                    angalia: "Angalia",
                  }}
                  navigation={navigation}
                />
              )}
              keyExtractor={(item) => item.id}
              ListFooterComponent={<View />}
              ItemSeparatorComponent={<View style={{ marginBottom: 40 }} />}
              ListFooterComponentStyle={{ marginBottom: "80%" }}
            />
          </View> */}
        </View>
      </View>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default RegistrationsCf;
