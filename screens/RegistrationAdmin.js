import { View, Alert } from "react-native";
import React, { useState } from "react";
import { Button, CustomInput, FormsHeader } from "../components";
import { SIZES, COLORS } from "../constants";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import {
  collection,
  db,
  auth,
  createUserWithEmailAndPassword,
  addDoc,
} from "../context/firebase";

const RegistrationAdmin = ({ route }) => {
  const role = route?.params?.role;
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [anuani, setAnuani] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPasswd, setConfPasswd] = useState("");
  const [loading, setLoading] = useState(false);
  const [submit, setSubmit] = useState(false);

  const submitToFirebase = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        setLoading(false);
        const user = userCredentials.user;
        // setUserDetails(user)
        const addData = async (user) => {
          try {
            await addDoc(collection(db, "users"), {
              userId: user.uid,
              name: fullname,
              email,
              password,
              phone,
              role: "CF",
            });
          } catch (e) {
            alert(e.message);
          }
        };
        addData(user);
        alert("Umefanikiwa Kusajili");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  };

  const handleSubmit = () => {
    // Alert.alert("Uhakiki", "Umehakiki taarifa zote kwa usahihi?", [
    //   {
    //     text: "Hapana",
    //     onPress: () => {
    //       alert("Tafadhali hakikisha taarifa zote.");
    //     },
    //   },
    //   {
    //     text: "Ndiyo",
    //     onPress: () => setSubmit(true),
    //   },
    // ]);
    submitToFirebase();
  };

  return (
    <ScrollView>
      <View
        style={{
          width: "100%",
          paddingTop: SIZES.base,
          paddingBottom: SIZES.font,
          paddingHorizontal: SIZES.base,
          backgroundColor: COLORS.primary,
        }}
      >
        <FormsHeader
          title={"Fomu ya Usajili wa CF"}
          subTitle={"Fomu ya usajili wa Community Facilitator"}
        />
      </View>
      <KeyboardAwareScrollView>
        <View
          style={{
            paddingHorizontal: SIZES.large,
            marginTop: SIZES.large,
          }}
        >
          <CustomInput
            icon={<Icon name="person" size={25} color={COLORS.primary} />}
            label="Jina la Community Facilitator"
            placeholder={"Ingiza jina la CF"}
            onChangeText={(text) => {
              setFullName(text);
            }}
          />
          <CustomInput
            icon={<Icon name="mail-outline" size={25} color={COLORS.primary} />}
            label="Barua pepe"
            placeholder={"Ingiza barua pepe ya CF"}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <CustomInput
            icon={<Icons name="phone" size={25} color={COLORS.primary} />}
            label="Namba ya Simu"
            placeholder={"Ingiza namba ya simu"}
            onChangeText={(number) => {
              setPhone(number);
            }}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="location-outline" size={25} color={COLORS.primary} />
            }
            label="Anuani Ya Makazi"
            placeholder={"Ingiza anuani ya makazi"}
            onChangeText={(text) => {
              setAnuani(text);
            }}
          />
          <CustomInput
            icon={<Icon name="person" size={25} color={COLORS.primary} />}
            label="Jina la Utumiaji la CF"
            placeholder={"Ingiza jina la utumiaji"}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          <CustomInput
            icon={<Icon name="lock-closed" size={25} color={COLORS.primary} />}
            label="NenoSiri la Community Facilitator"
            placeholder={"Ingiza nenosiri"}
            onChangeText={(passwd) => setPassword(passwd)}
            isPassword={true}
          />
          <CustomInput
            icon={<Icon name="lock-closed" size={25} color={COLORS.primary} />}
            label="NenoSiri la Community Facilitator"
            placeholder={"Ingiza tena nenosiri"}
            onChangeText={(passwd) => setConfPasswd(passwd)}
            isPassword={true}
          />

          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: SIZES.base,
            }}
          >
            <Button
              text={"Kusanya Taarifa"}
              onPress={handleSubmit}
              loading={loading}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default RegistrationAdmin;
