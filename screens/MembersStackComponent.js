import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Members from "./Members";
import MemberData from "./MemberData";
import RegisterMwanachama from "./RegisterMwanachama";
import MemberStackProvide, {
  KatibuDataContext,
} from "../context/MemberStackProvide";
import { query, collection, where, getDocs, db } from "../context/firebase";
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

// const q = query(
//   collection(db, "KikundiMembers"),
//   where("Kikundi Chake", "==", kikundi?.name)
// );
// onSnapshot(q, (querySnapshot) => {
//   let vikundis = [];
//   querySnapshot.forEach((doc) => {
//     vikundis.push(doc.data());
//   });
//   // setVikundi([...vikundis]);
//   console.log("Current watu!", vikundis);
// });

const MembersStackComponent = ({ katibuEmail }) => {
  const [loading, setLoading] = useState(false);
  const { getKikundiChaKatibu, members, setMembers, setKikundi, kikundi } =
    useContext(KatibuDataContext);
  useEffect(() => {
    setLoading(true);
    getKikundiChaKatibu(katibuEmail)
      .then((docs) => {
        let doc = docs.docs[0].data();
        setKikundi(doc);
        let getKikundiMembers = async (kikundiName) => {
          let members_ = [];
          try {
            const q = query(
              collection(db, "KikundiMembers"),
              where("Kikundi Chake", "==", kikundiName)
            );
            const docs = await getDocs(q);
            docs.forEach((doc) => {
              members_.push(doc.data());
            });
            setMembers([...members_]);
            setLoading(false);
          } catch (e) {
            alert(e.message);
          }
        };
        getKikundiMembers(doc.name);
      })
      .catch((e) => {
        setLoading(false);
        alert(e.message);
      });
  }, []);
  return (
    <>
      {loading && members.length == 0 ? (
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
            initialParams={{ kikundi, members }}
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
