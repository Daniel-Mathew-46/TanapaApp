import { View, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { Button, CustomInput, FormsHeader } from "../components";
import { SIZES, COLORS, generateChars } from "../constants";
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
import { CFRecordsContext } from "../context/CfRecordsProvider";
import { updateKatibu } from "../context/submits";

const RegistrationAdmin = ({ route }) => {
  const edit = route.params?.edit;
  const data = route.params?.data;
  const adminEmail = route.params?.adminEmail;
  const { dispatch } = useContext(CFRecordsContext);

  let change = generateChars();

  var name = "" || data?.["name"];
  var cfEmail = "" || data?.["email"];
  var cfPhone = "" || data?.["phone"];
  var cfAnuani = "" || data?.["anuani"];
  var passw = "" || data?.["password"];

  const [fullname, setFullName] = useState(name);
  const [email, setEmail] = useState(cfEmail);
  const [phone, setPhone] = useState(cfPhone);
  const [anuani, setAnuani] = useState(cfAnuani);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState(passw);
  const [confPasswd, setConfPasswd] = useState("");
  const [loading, setLoading] = useState(false);

  const submitToFirebase = () => {
    const formData = {
      name: fullname,
      email,
      phone,
      anuani,
      password,
    };
    setLoading(true);
    if (edit) {
      updateKatibu(data?.["email"], formData, change, dispatch)
        .then(() => {
          setLoading(false);
          alert("Umefanikiwa Kubadilisha taarifa za CF");
          setFullName("");
          setEmail("");
          setAnuani("");
          setUsername("");
          setPhone("");
        })
        .catch((e) => {
          alert(e.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredentials) => {
          const user = userCredentials.user;
          // setUserDetails(user)
          const addData = async (user) => {
            try {
              await addDoc(collection(db, "users"), {
                userId: user.uid,
                ...formData,
                role: "CF",
                createdBy: adminEmail,
              });
            } catch (e) {
              setLoading(false);
              alert(e.message.split(" ")[2]);
            }
          };
          addData(user);
          setLoading(false);
          alert("Umefanikiwa Kusajili CF");
          dispatch({
            type: "SET_CHANGE",
            change: change,
          });
          setFullName("");
          setEmail("");
          setAnuani("");
          setUsername("");
          setPhone("");
          setPassword("");
          setConfPasswd("");
        })
        .catch((error) => {
          setLoading(false);
          console.log(error);
        });
    }
  };

  const handleSubmit = () => {
    if (!edit) {
      if (confPasswd !== password) {
        alert("Nenosiri hazifanani!Rudia Nenosiri kwa usahihi!");
        return;
      }
      if (fullname == "" || email == "" || phone == "" || password == "") {
        alert("Tafadhali jaza taarifa kamili!");
        return;
      }
    } else {
      if (fullname == "" || email == "" || phone == "") {
        alert("Tafadhali jaza taarifa kamili!");
        return;
      }
    }
    if (phone.length !== 10 || isNaN(phone)) {
      alert("Namba ya Simu siyo sahihi!");
      return;
    }
    Alert.alert("Uhakiki", "Umehakiki taarifa zote kwa usahihi?", [
      {
        text: "Hapana",
        onPress: () => {},
      },
      {
        text: "Ndiyo",
        onPress: () => {
          submitToFirebase();
        },
      },
    ]);
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
          subTitle={
            route.params?.edit
              ? `Badilisha Taarifa za CF ${route.params?.data.name}`
              : "Fomu ya Usajili wa CF"
          }
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
            value={fullname}
            onChangeText={(text) => {
              setFullName(text);
            }}
          />
          <CustomInput
            icon={<Icon name="mail-outline" size={25} color={COLORS.primary} />}
            label="Barua pepe"
            placeholder={"Ingiza barua pepe ya CF"}
            value={email}
            editable={!edit}
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
          <CustomInput
            icon={<Icons name="phone" size={25} color={COLORS.primary} />}
            label="Namba ya Simu"
            placeholder={"Ingiza namba ya simu"}
            value={phone}
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
            value={anuani}
            onChangeText={(text) => {
              setAnuani(text);
            }}
          />
          <CustomInput
            icon={<Icon name="person" size={25} color={COLORS.primary} />}
            label="Jina la Utumiaji la CF"
            placeholder={"Ingiza jina la utumiaji"}
            value={username}
            onChangeText={(text) => {
              setUsername(text);
            }}
          />
          {!edit && (
            <CustomInput
              icon={
                <Icon name="lock-closed" size={25} color={COLORS.primary} />
              }
              label="NenoSiri la Community Facilitator"
              placeholder={"Ingiza nenosiri"}
              value={password}
              onChangeText={(text) => setPassword(text)}
              isPassword={true}
            />
          )}
          {!edit && (
            <CustomInput
              icon={
                <Icon name="lock-closed" size={25} color={COLORS.primary} />
              }
              label="NenoSiri la Community Facilitator"
              placeholder={"Ingiza tena nenosiri"}
              value={confPasswd}
              onChangeText={(text) => setConfPasswd(text)}
              isPassword={true}
            />
          )}

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
