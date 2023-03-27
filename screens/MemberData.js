import { View, Text, SafeAreaView, StatusBar, Alert } from "react-native";
import React, { useState, useContext } from "react";
import { COLORS, SIZES } from "../constants";
import { Button } from "../components";
import { deleteMember } from "../context/submits";
import { KatibuDataContext } from "../context/MemberStackProvide";

const MemberData = ({ route }) => {
  const { states, dispatch } = useContext(KatibuDataContext);
  const data = route.params?.data;
  const deleteParam = route.params?.delete;
  const [loading, setLoading] = useState(false);

  const handleDelete = () => {
    Alert.alert("Uhakiki", "Una Uhakika?", [
      { text: "Acha", onPress: () => {} },
      {
        text: "Futa",
        onPress: () => {
          onDeleteConfirm();
        },
      },
    ]);

    const onDeleteConfirm = () => {
      setLoading(true);
      let currMembers = states?.members;
      currMembers = currMembers.filter(
        (item) => item["Barua Pepe"] !== data?.["Barua Pepe"]
      );
      deleteMember(data?.["Barua Pepe"])
        .then(() => {
          alert("Umefanikiwa Kufuta Taarifa.");
          setLoading(false);
          dispatch({
            type: "DELETE_MEMBER",
            remMembers: currMembers,
          });
        })
        .catch((e) => {
          setLoading(false);
          alert(e.message);
        });
    };
  };
  return (
    <SafeAreaView style={{}}>
      <View>
        <View
          style={{
            width: "100%",
            paddingTop: SIZES.base,
            paddingBottom: SIZES.font,
            backgroundColor: COLORS.primary,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <View
            style={{
              paddingHorizontal: SIZES.medium,
              width: "100%",
            }}
          >
            <View
              style={
                {
                  // marginTop: SIZES.small,
                }
              }
            >
              <Text
                style={{
                  textAlign: "left",
                  color: COLORS.white,
                  fontSize: SIZES.extraLarge + 5,
                }}
              >
                Taarifa Ya Mwanachama {`${data?.["Jina la Mwanachama"]}`}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Render Card */}
      {!states?.deleteFlag && (
        <View
          style={{
            width: "100%",
            paddingHorizontal: SIZES.medium,
            paddingTop: SIZES.extraLarge,
          }}
        >
          <View
            style={{
              paddingHorizontal: SIZES.font,
              paddingVertical: SIZES.font,
              backgroundColor: COLORS.darkWhite,
              borderRadius: 10,
              shadowColor: COLORS.gray,
              shadowOffset: {
                width: 5,
                height: 5,
              },
              shadowOpacity: 0.75,
              elevation: 9,
            }}
          >
            {Object.keys(data).map((item, index) => {
              if (item !== "Kikundi Chake") {
                return (
                  <Text
                    key={index}
                    style={{
                      fontSize: SIZES.medium,
                      marginTop: SIZES.small,
                    }}
                  >
                    {item}:{" "}
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: SIZES.medium,
                        color: COLORS.gray,
                        marginBottom: SIZES.medium,
                      }}
                    >
                      {data[item]}
                    </Text>
                  </Text>
                );
              }
            })}
          </View>
        </View>
      )}
      {deleteParam && !states?.deleteFlag && (
        <Button
          text={"Futa Mwanachama"}
          loading={loading}
          onPress={handleDelete}
        />
      )}
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default MemberData;
