import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useReducer } from "react";
import { COLORS, SIZES } from "../constants";
import { query, collection, where, getDocs, db } from "../context/firebase";

const renderWanachama = (members) => {
  let key = Object.keys(members)[0];
  if (members[key]?.length === 0)
    return (
      <Text style={{ color: COLORS.gray, fontSize: SIZES.medium }}>
        Hakuna Wanachama!
      </Text>
    );
  return members[key]?.map((item, index) => (
    <Text
      key={index}
      style={{
        fontWeight: "bold",
        fontSize: SIZES.medium,
        color: COLORS.gray,
        marginBottom: SIZES.medium,
      }}
    >
      {item}
    </Text>
  ));
};

const KikundiData = ({ route }) => {
  const data = route.params?.data;
  const kikundiName = route.params?.data?.name;

  const kikundiDataInit = {
    members: {},
    loading: false,
    change: "no",
  };

  const kikundiMembersDataReducer = (prevStates, action) => {
    switch (action.type) {
      case "ACTIVATE_LOADING":
        return {
          ...prevStates,
          loading: action.loading,
        };
      case "SET_KIKUNDIMEMBERS":
        return {
          ...prevStates,
          members: action.payload,
          loading: action.loading,
        };
      case "CHANGE":
        return {
          ...prevStates,
          change: action.change,
        };
    }
  };

  const [statesMembers, dispatch] = useReducer(
    kikundiMembersDataReducer,
    kikundiDataInit
  );

  useEffect(() => {
    if (!Object.keys(statesMembers?.members).includes(kikundiName)) {
      const getKikundiMembers = async () => {
        dispatch({ type: "ACTIVATE_LOADING", loading: true });
        try {
          const q = query(
            collection(db, "KikundiMembers"),
            where("Kikundi Chake", "==", kikundiName)
          );
          const wanachamaDocs = await getDocs(q);
          if (wanachamaDocs.docs.length === 0) {
            dispatch({
              type: "SET_KIKUNDIMEMBERS",
              kikundi: kikundiName,
              payload: {},
              loading: false,
            });
          } else {
            let members_ = [];
            let kikundiObj = { ...statesMembers.members };
            wanachamaDocs.forEach((doc) => {
              let memberData = doc.data();
              let name = memberData?.["Jina la Mwanachama"];
              members_.push(name);
            });
            console.log(members_);
            kikundiObj[kikundiName] = members_;
            dispatch({
              type: "SET_KIKUNDIMEMBERS",
              kikundi: kikundiName,
              payload: kikundiObj,
              loading: false,
            });
          }
        } catch (e) {
          console.log(e.message);
        }
      };
      getKikundiMembers();
    }
    return;
  }, []);

  return (
    <SafeAreaView>
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
            <View>
              <Text
                style={{
                  textAlign: "left",
                  color: COLORS.white,
                  fontSize: SIZES.extraLarge + 5,
                }}
              >
                Taarifa Ya Kikundi {`${data?.name}`}
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
            if (item !== "createdBy") {
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
          <Text
            style={{
              fontSize: SIZES.medium,
              marginTop: SIZES.small,
              fontWeight: "bold",
            }}
          >
            Wanachama:
          </Text>
          {statesMembers?.loading ? (
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: 10,
              }}
            >
              <ActivityIndicator size={20} color={COLORS.darkWhite} />
            </View>
          ) : (
            renderWanachama(statesMembers?.members)
          )}
        </View>
      </View>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default KikundiData;
