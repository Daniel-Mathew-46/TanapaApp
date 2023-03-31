import { View } from "react-native";
import React, { useState } from "react";
import { SIZES } from "../constants";
import Stats from "./Stats";
import { Dimensions } from "react-native";
import KatibuTasks from "./KatibuTasks";
import MemberStackProvide from "../context/MemberStackProvide";

const VerticalList = ({ role, navigation, userEmail }) => {
  const [windowWidth, setWindowWidth] = useState(
    Dimensions.get("screen").width
  );

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
        <View
          style={{
            height: "100%",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              paddingVertical: SIZES.base,
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
                  height: "100%",
                  justifyContent: "center",
                  fontSize: SIZES.extraLarge,
                  iconSize: 70,
                  textFont: SIZES.extraLarge,
                  paddingHorizontal: SIZES.font,
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
                  text={"Community Facilitator"}
                  count={2}
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
      ) : null}

      {/* Case of Community Facilitator */}
      {role == "CF" ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stats
            statsStyle={{
              width: windowWidth / 3.7,
              height: 60,
              marginRight: SIZES.font,
              justifyContent: "center",
              fontSize: SIZES.medium,
              iconSize: 20,
              paddingHorizontal: SIZES.font,
            }}
            text={"Katibu"}
            count={2}
          />
          <Stats
            statsStyle={{
              width: windowWidth / 3.7,
              height: 60,
              marginRight: SIZES.font,
              justifyContent: "center",
              fontSize: SIZES.medium,
              iconSize: 20,
              paddingHorizontal: SIZES.font,
            }}
            text={"Vikundi"}
            count={5}
          />
          <Stats
            statsStyle={{
              width: windowWidth / 3.7,
              height: 60,
              marginRight: SIZES.font,
              justifyContent: "center",
              fontSize: SIZES.medium,
              iconSize: 20,
              paddingHorizontal: SIZES.font,
            }}
            text={"Vijiji"}
            count={2}
          />
        </View>
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
