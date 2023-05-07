import { View, Text, Alert } from "react-native";
import React, { useContext, useState } from "react";
import { Button, CustomInput, FormsHeader } from "../components";
import { SIZES, COLORS } from "../constants";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { submitFormData } from "../context/submits";
import { KatibuTasksContexts } from "../context/KatibuTasksProvider";
import Iconz from "react-native-vector-icons/MaterialIcons";
import moment from "moment/moment";

const FormShughuli = ({ route }) => {
  const { states, dispatch } = useContext(KatibuTasksContexts);
  const katibuEmail = route.params?.katibuEmail;
  const kikundi = states?.kikundi;
  const week = Number(states.weekNumber);
  const data = route.params?.data;
  const namesToGenderMapArray = [];

  console.log("Whole Week Data.................\n", data);
  // const mahudhurioData = { ...states?.mahudhurioFormData };
  // const lejaMfukoData = { ...states?.lejaMfukoFormData };
  // const lejaHisaData = { ...states?.lejaHisaFormData };
  // const wakopajiData = { ...states?.wakopajiFormData };

  // const membersGenders =
  //   states?.members?.length > 0
  //     ? states.members.map((item) => item["Jinsia"])
  //     : [];

  // const membersNames =
  //   states?.members?.length > 0
  //     ? states.members.map((item) => item["Jina la Mwanachama"])
  //     : [];

  // for (let i = 0; i < states?.members?.length; i++) {
  //   let obj = {};
  //   let name = membersNames[i];
  //   obj[name] = membersGenders[i];
  //   namesToGenderMapArray.push(obj);
  // }

  //Computing Summations
  //Leja Mfuko
  // let afya_ = 0;
  // let elimu_ = 0;
  // if (Object.keys(lejaMfukoData).length !== 0) {
  //   Object.values(lejaMfukoData).forEach((memberArr) => {
  //     for (let i = 1; i < memberArr.length; i++) {
  //       if (typeof memberArr[i] === " ") memberArr.fill(0, i, i + 1);
  //     }
  //   });
  //   Object.values(lejaMfukoData).forEach((memberArr) => {
  //     afya_ += Math.floor(memberArr[2]);
  //     elimu_ += Math.floor(memberArr[3]);
  //   });
  // }
  // //Leja Hisa
  // let idadi_hisa = 0;
  // if (Object.keys(lejaHisaData).length !== 0) {
  //   Object.values(lejaHisaData).forEach((memberArr) => {
  //     for (let i = 2; i < memberArr.length; i++) {
  //       if (memberArr[i] === " ") memberArr.fill(0, i, i + 1);
  //     }
  //   });
  //   Object.values(lejaHisaData).forEach((memberArr) => {
  //     idadi_hisa += Math.floor(memberArr[3]);
  //   });
  // }

  //Wakopaji
  // let bima_ = 0;
  // if (Object.keys(wakopajiData).length !== 0) {
  //   Object.values(wakopajiData).forEach((memberArr) => {
  //     for (let i = 2; i < memberArr.length - 1; i++) {
  //       if (memberArr[i] === " ") memberArr.fill(0, i, i + 1);
  //     }
  //   });
  //   Object.values(wakopajiData).forEach((memberArr) => {
  //     bima_ += Math.floor(memberArr[4]);
  //   });
  // }

  // //Mahudhurio
  // let wake = 0;
  // let waume = 0;

  // if (Object.keys(mahudhurioData).length !== 0) {
  //   namesToGenderMapArray.forEach((member) => {
  //     let name = Object.keys(member)[0];
  //     let gender = member[name];

  //     if (gender === "Me" && mahudhurioData[name] == "Ndiyo") waume += 1;

  //     if (gender === "Ke" && mahudhurioData[name] == "Ndiyo") wake += 1;
  //   });
  // }
  // let mahudhurio_jumla = wake + waume;

  // console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$");
  // console.log(afya_);
  // console.log(elimu_);
  // console.log("&&&&&&&&&&&&&&&&&&&&&&&");
  // console.log(wakopajiData);
  // console.log(lejaMfukoData);
  // console.log(lejaHisaData);
  // console.log(mahudhurioData);
  // console.log(namesToGenderMapArray);

  let jumla_ = 0;
  const [mahudhurioJumla, setMahudhurioJumla] = useState();
  const [mahudhurioWaume, setMahudhurioWaume] = useState();
  const [mahudhurioWake, setMahudhurioWake] = useState();
  const [idadiHisa, setIdadiHisa] = useState();
  const [adhabu, setAdhabu] = useState(0);
  const [afya, setAfya] = useState();
  const [elimu, setElimu] = useState();
  const [zawadiRuzuku, setZawadiRuzuku] = useState(0);
  const [mkopoAmbatanishi, setMkopoAmbatanishi] = useState(0);
  const [nyongezaMkopo, setNyongezaMkopo] = useState(0);
  const [bimaMkopo, setBimaMkopo] = useState();
  const [mapatoMengine, setMapatoMengine] = useState(0);
  const [jumla, setJumla] = useState();
  const [jumlaKuu, setJumlaKuu] = useState();
  const [loading, setLoading] = useState(false);
  let todayDate = moment().format("D/MM/YYYY");
  const [dateValue, setDateValue] = useState(todayDate);

  // const set_adhabu = (text) => {
  //   if (isNaN(text)) {
  //     alert("Tafadhali ingiza tarakimu!");
  //     return;
  //   }
  //   let textTens_ = Math.floor(text / 10) * 10;
  //   let text_ = Math.floor(text % 10);
  //   let finalValue = Math.floor(textTens_ + text_);
  //   setAdhabu(finalValue);
  // };

  // const set_zawadi_ruzuku = (text) => {
  //   if (isNaN(text)) {
  //     alert("Tafadhali ingiza tarakimu!");
  //     return;
  //   }
  //   let textTens_ = Math.floor(text / 10) * 10;
  //   let text_ = Math.floor(text % 10);
  //   let finalValue = Math.floor(textTens_ + text_);
  //   setZawadiRuzuku(finalValue);
  // };
  // const set_mkopoambatanishi = (text) => {
  //   if (isNaN(text)) {
  //     alert("Tafadhali ingiza tarakimu!");
  //     return;
  //   }
  //   let textTens_ = Math.floor(text / 10) * 10;
  //   let text_ = Math.floor(text % 10);
  //   let finalValue = Math.floor(textTens_ + text_);

  //   setMkopoAmbatanishi(finalValue);
  // };
  // const set_nyongezamkopo = (text) => {
  //   if (isNaN(text)) {
  //     alert("Tafadhali ingiza tarakimu!");
  //     return;
  //   }
  //   let textTens_ = Math.floor(text / 10) * 10;
  //   let text_ = Math.floor(text % 10);
  //   let finalValue = Math.floor(textTens_ + text_);
  //   setNyongezaMkopo(finalValue);
  // };
  // const set_mapato_mengineyo = (text) => {
  //   if (isNaN(text)) {
  //     alert("Tafadhali ingiza tarakimu!");
  //     return;
  //   }
  //   let textTens_ = Math.floor(text / 10) * 10;
  //   let text_ = Math.floor(text % 10);
  //   let finalValue = Math.floor(textTens_ + text_);
  //   setMapatoMengine(finalValue);
  // };

  // const set_jumla_zote = (value) => {
  //   setJumla((prevJumla) => prevJumla + value);
  //   setJumlaKuu((prevJumla) => prevJumla + value);
  // };

  const handleSubmit = () => {
    if (week === null || typeof week === "undefined") {
      alert("Tafadhali sema ni wiki ya ngapi!");
      return;
    }
    // katibuEmail?.split("@")[0]
    // const docName =
    //   "Shughuli_za_Kikundi_za_wiki_" +
    //   katibuEmail?.split("@")[0] +
    //   "_week_" +
    //   weekNumber;
    const formData = {
      0: [
        "Tarehe",
        "Mahudhurio Waume",
        "Mahudhurio Wake",
        "Mahudhurio Jumla",
        "Idadi ya Hisa",
        "Adhabu",
        "Afya",
        "Elimu",
        "Zawadi/Ruzuku",
        "Mkopo Ambatanishi",
        "Nyongeza ya Mkopo",
        "Bima Mkopo",
        "Mapato Mengine",
        "Jumla",
        "Jumla Kuu",
      ],
      1: [
        dateValue,
        mahudhurioWaume,
        mahudhurioWake,
        mahudhurioJumla,
        idadiHisa,
        adhabu,
        afya,
        elimu,
        zawadiRuzuku,
        mkopoAmbatanishi,
        nyongezaMkopo,
        bimaMkopo,
        mapatoMengine,
        jumla,
        jumlaKuu,
      ],
    };

    Alert.alert("Uhakiki", "Umehakiki Taarifa kwa usahihi?", [
      { text: "Hapana", onPress: () => {} },
      {
        text: "Ndiyo",
        onPress: () => {
          onSubmitConfirm();
        },
      },
    ]);

    // const onSubmitConfirm = () => {
    //   setLoading(true);
    //   submitFormData(
    //     "FormDocs",
    //     katibuEmail,
    //     "Shughuli za Kikundi za kila wiki",
    //     docName,
    //     formData
    //   )
    //     .then(() => {
    //       setLoading(false);
    //       setZawadiRuzuku("");
    //       alert("Umefanikiwa Kukusanya Taarifa.");
    //       dispatch({
    //         type: "SET_SHUGHULI_FORM_STATE",
    //         forms_filled: [...states.formsFilled, "shughuli"],
    //       });
    //     })
    //     .catch((e) => {
    //       setLoading(false);
    //       alert(e.message);
    //       console.log(e.message);
    //     });
    // };
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
          title={`Fomu Shughuli Za Kikundi`}
          subTitle={"Fomu shughuli za kikundi"}
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
            icon={<Iconz name="date-range" size={25} color={COLORS.primary} />}
            label="Tarehe"
            placeholder={"Andika tarehe"}
            value={dateValue}
            onChangeText={(text) => {
              setDateValue(text);
            }}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            // value={mahudhurioWaume.toString()}
            label="Mahudhurio ya Waume"
            placeholder={"Ingiza mahudhurio ya waume"}
            onChangeText={(text) => setMahudhurioWaume(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            // value={mahudhurioWake.toString()}
            label="Mahudhurio ya Wake"
            placeholder={"Ingiza mahudhurio ya Wake"}
            onChangeText={(text) => setMahudhurioWake(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            // value={mahudhurioJumla.toString()}
            label="Mahudhurio Jumla"
            placeholder={"Ingiza jumla ya mahudhurio"}
            onChangeText={(text) => setMahudhurioJumla(text)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            // value={idadiHisa.toString()}
            label="Idadi ya Hisa"
            placeholder={"Ingiza idadi ya hisa"}
            isNumber={true}
            onChangeText={(text) => setIdadiHisa(text)}
          />

          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            // value={afya.toString()}
            label="Afya"
            placeholder={"Ingiza Afya"}
            onChangeText={(text) => setAfya(text)}
            // isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Elimu"
            // value={elimu.toString()}
            placeholder={"Ingiza elimu"}
            onChangeText={(text) => setElimu(text)}
            // isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            // value={adhabu.toString()}
            label="Adhabu"
            placeholder={"Ingiza adhabu"}
            // onChangeText={(text) => set_adhabu(text)}
            isNumber={true}
            // onBlur={() => set_jumla_zote(adhabu)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            // value={zawadiRuzuku.toString()}
            label="Zawadi/Ruzuku"
            placeholder={"Ingiza zawadi/ruzuku"}
            // onChangeText={(text) => set_zawadi_ruzuku(text)}
            isNumber={true}
            // onBlur={() => set_jumla_zote(zawadiRuzuku)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            // value={mkopoAmbatanishi.toString()}
            label="Mkopo Ambatanishi"
            placeholder={"Ingiza idadi ya mikopo ambatanishi"}
            // onChangeText={(text) => set_mkopoambatanishi(text)}
            isNumber={true}
            // onBlur={() => set_jumla_zote(mkopoAmbatanishi)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            // value={nyongezaMkopo.toString()}
            label="Nyongeza ya mkopo"
            placeholder={"Ingiza nyongeza ya mkopo"}
            // onChangeText={(text) => set_nyongezamkopo(text)}
            isNumber={true}
            // onBlur={() => set_jumla_zote(nyongezaMkopo)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            // value={bimaMkopo.toString()}
            label="Bima ya Mkopo"
            placeholder={"Ingiza bima ya mkopo"}
            // onChangeText={(text) => setBimaMkopo(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            // value={mapatoMengine.toString()}
            label="Mapato Mengine"
            placeholder={"Ingiza mapato mengine"}
            // onChangeText={(text) => set_mapato_mengineyo(text)}
            isNumber={true}
            // onBlur={() => set_jumla_zote(mapatoMengine)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            // value={jumla.toString()}
            label="Jumla"
            placeholder={"Weka Jumla"}
            // onChangeText={(jumla) => setJumla(jumla)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            // value={jumlaKuu.toString()}
            label="Jumla Kuu"
            placeholder={"Weka Jumla kuu"}
            // onChangeText={(jumla) => setJumlaKuu(jumla)}
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

export default FormShughuli;
