import React, { useEffect, useReducer, useState } from "react";
import { View, Alert } from "react-native";
import {
  Button,
  CustomInput,
  DropDownComponent,
  FormsHeader,
} from "../components";
import { SIZES, COLORS } from "../constants";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import {
  collection,
  db,
  doc,
  getDocs,
  where,
  query,
  getDoc,
  setDoc,
  updateDoc,
} from "../context/firebase";

const RegisterKikundi = ({ route }) => {
  const cfEmail = route.params?.cfEmail;
  const [jinaKikundi, setJinaKikundi] = useState("");
  const [kata, setKata] = useState("");
  const [thamaniHisa, setThamaniHisa] = useState("");
  const [nambaUsajili, setNambaUsajili] = useState("");
  const [bima, setBima] = useState("");
  const [riba, setRiba] = useState("");
  const [loading, setLoading] = useState(false);
  const [katibu, setKatibu] = useState(null);

  const fetchStates = {
    fetchLoading: false,
    katibus: [],
  };

  const fetchReducers = (prevStates, action) => {
    switch (action.type) {
      case "activate_fetch_login":
        return {
          ...prevStates,
          fetchLoading: true,
        };
      case "set_katibus":
        return {
          ...prevStates,
          fetchLoading: false,
          katibus: [...action.payload],
        };
    }
  };

  const [states, dispatch] = useReducer(fetchReducers, fetchStates);

  useEffect(() => {
    dispatch({ type: "activate_fetch_login" });
    let unAssignedNames = [];
    const getKatibusUnassigned = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("assigned", "==", "no"),
          where("createdBy", "==", cfEmail)
        );
        const docs = await getDocs(q);
        docs.forEach((doc) => {
          let name = doc.data().name;
          unAssignedNames.push(name);
        });
        dispatch({ type: "set_katibus", payload: unAssignedNames });
      } catch (e) {
        console.log(e.message);
      }
    };
    getKatibusUnassigned();
  }, []);

  const submitToFirebase = (name, kikundiName, data) => {
    setLoading(true);

    const submitData = async (name, kikundiName, data) => {
      try {
        const docRef = doc(db, "Vikundi", kikundiName);
        const kikundi = await getDoc(docRef);
        if (kikundi.exists()) {
          alert("Kikundi hichi tayari kipo!");
          return;
        } else {
          await setDoc(docRef, {
            ...data,
          });
          return name;
        }
      } catch (e) {
        setLoading(false);
        alert(e.message.split(" ")[2]);
      }
    };
    const updateUser = async (name) => {
      //We update users assigned property
      const docs = await getDocs(
        query(collection(db, "users"), where("name", "==", name))
      );
      const _doc = docs.docs[0];
      const updateUserAssigned = async (docId) => {
        try {
          await updateDoc(doc(db, "users", docId), {
            assigned: "yes",
          });
        } catch (e) {
          console.log(e);
        }
      };
      await updateUserAssigned(_doc.id);
    };
    submitData(name, kikundiName, data)
      .then((name) => {
        updateUser(name);
      })
      .then(() => {
        setLoading(false);
        alert("Umefanikiwa Kusajili Kikundi");
        setJinaKikundi("");
        setKata("");
        setThamaniHisa("");
        setNambaUsajili("");
        setBima("")
        setRiba("")
      })
      .catch((e) => {
        alert(e.message.split(" ")[2]);
      });
  };

  const handleSubmit = () => {
    if (
      jinaKikundi == "" ||
      katibu == "" ||
      kata == "" ||
      thamaniHisa == "" ||
      nambaUsajili == ""
    ) {
      alert("Tafadhali jaza taarifa sahihi!");
      return;
    }
    if(isNaN(thamaniHisa) || isNaN(riba) || isNaN(bima)) {
      alert("Thamani ya Hisa au Riba au Bima sio sahihi!");
      return;
    }
    const formData = {
      name: jinaKikundi,
      Katibu: katibu,
      "Kata ya Kikundi": kata,
      "Thamani ya Hisa ya Kikundi": thamaniHisa,
      "Namba ya usajili ya Kikundi": nambaUsajili,
      "Asilimia ya Bima": bima,
      "Asilimia ya Riba": riba,
      createdBy: cfEmail,
    };

    Alert.alert("Uhakiki", "Umehakiki taarifa zote kwa usahihi?", [
      {
        text: "Hapana",
        onPress: () => {},
      },
      {
        text: "Ndiyo",
        onPress: () => {
          submitToFirebase(katibu, jinaKikundi, formData);
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
          title={"Fomu ya Usajili wa Kikundi"}
          subTitle={"Fomu ya usajili wa kikundi"}
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
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Jina la Kikundi"
            placeholder={"Ingiza jina la kikundi"}
            value={jinaKikundi}
            onChangeText={(text) => setJinaKikundi(text)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Namba ya usajili ya kikundi"
            placeholder={"Ingiza namba ya usajili ya kikundi"}
            value={nambaUsajili}
            onChangeText={(text) => setNambaUsajili(text)}
            isNumber={true}
          />

          <DropDownComponent
            label={"Barua Pepe ya Katibu"}
            loading={states?.fetchLoading}
            options={states?.katibus}
            value={katibu}
            setValue={setKatibu}
          />

          <CustomInput
            icon={
              <Icon name="location-outline" size={25} color={COLORS.primary} />
            }
            label="Kata ya Kikundi"
            placeholder={"Ingiza kata ya kikundi"}
            value={kata}
            onChangeText={(text) => setKata(text)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Thamani ya Hisa ya Kikundi"
            placeholder={"Ingiza thamani ya hisa"}
            value={thamaniHisa}
            onChangeText={(text) => setThamaniHisa(text)}
            isNumber={true}
          />

<CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Asilimia ya Bima ya Kikundi (%)"
            placeholder={"Ingiza asilimia ya bima(%)"}
            value={bima}
            onChangeText={(text) => setBima(text)}
            isNumber={true}
          />

<CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Asilimia ya Riba ya Kikundi(%)"
            placeholder={"Ingiza asilimia ya riba(%)"}
            value={riba}
            onChangeText={(text) => setRiba(text)}
            isNumber={true}
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
              loading={loading}
              onPress={handleSubmit}
            />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default RegisterKikundi;
