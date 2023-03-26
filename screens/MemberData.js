import { View, Text, SafeAreaView, StatusBar, Alert } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../constants";
import { Button } from "../components";
import { deleteMember } from "../context/submits";

const MemberData = ({ route }) => {
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
      deleteMember(data?.["Barua Pepe"])
        .then(() => {
          setLoading(false);
          alert("Umefanikiwa Kufuta Taarifa.");
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
      {deleteParam && (
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
