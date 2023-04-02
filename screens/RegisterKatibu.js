import React, { useContext, useState } from "react";
import { View, Alert } from "react-native";
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
import { updateKatibu } from "../context/submits";
import { KatibuRecordsContext } from "../context/KatibuRecordsProvider";

const RegisterKatibu = ({ route }) => {
  const edit = route.params?.edit;
  const data = route.params?.data;
  const cfEmail = route.params?.cfEmail;
  const { states, dispatch } = useContext(KatibuRecordsContext);
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let change = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 5; i++) {
    change += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  var name = "" || data?.["name"];
  var katEmail = "" || data?.["email"];
  var katPhone = "" || data?.["phone"];
  var passw = "" || data?.["password"];

  const [fullname, setFullName] = useState(name);
  const [email, setEmail] = useState(katEmail);
  const [phone, setPhone] = useState(katPhone);
  const [anuani, setAnuani] = useState("");
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
          alert("Umefanikiwa Kubadilisha taarifa za Katibu");
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
          const addUser = async (user) => {
            try {
              await addDoc(collection(db, "users"), {
                userId: user.uid,
                ...formData,
                assigned: "no",
                role: "Katibu",
                createdBy: cfEmail,
              });
              // await dispatch({
              //   type: "ADD_KATIBU",
              //   katibu: {
              //     userId: user.uid,
              //     ...formData,
              //     assigned: "no",
              //     role: "Katibu",
              //     createdBy: cfEmail,
              //   },
              // });
            } catch (e) {
              setLoading(false);
              alert(e.message.split(" ")[2]);
            }
          };
          addUser(user);
          setLoading(false);
          alert("Umefanikiwa Kusajili Katibu");
          // dispatch({
          //   type: "SET_CHANGE",
          //   change: change,
          // });
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
          alert(error.message.split(" ")[2]);
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
          title={"Fomu ya Usajili wa Katibu"}
          subTitle={
            route.params?.edit
              ? `Badilisha Taarifa za Katibu ${route.params?.data.name}`
              : "Fomu ya Usajili wa Katibu"
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
            label="Jina la Katibu"
            value={fullname}
            placeholder={"Ingiza jina la Katibu"}
            onChangeText={(text) => setFullName(text)}
          />
          <CustomInput
            icon={<Icon name="mail-outline" size={25} color={COLORS.primary} />}
            label="Barua pepe"
            value={email}
            editable={!edit}
            placeholder={"Ingiza barua pepe ya Katibu"}
            onChangeText={(text) => setEmail(text)}
          />
          <CustomInput
            icon={<Icons name="phone" size={25} color={COLORS.primary} />}
            label="Namba ya Simu"
            placeholder={"Ingiza namba ya simu"}
            value={phone}
            onChangeText={(text) => setPhone(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="location-outline" size={25} color={COLORS.primary} />
            }
            label="Anuani Ya Makazi"
            placeholder={"Ingiza anuani ya makazi"}
            value={anuani}
            onChangeText={(text) => setAnuani(text)}
          />
          <CustomInput
            icon={<Icon name="person" size={25} color={COLORS.primary} />}
            label="Jina la Utumiaji la Katibu"
            placeholder={"Ingiza jina la utumiaji"}
            value={username}
            onChangeText={(text) => setUsername(text)}
          />
          {!edit && (
            <CustomInput
              icon={
                <Icon name="lock-closed" size={25} color={COLORS.primary} />
              }
              label="NenoSiri la Katibu"
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
              label="NenoSiri la Katibu"
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
              loading={loading}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default RegisterKatibu;
