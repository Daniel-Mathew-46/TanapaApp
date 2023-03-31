import { View } from "react-native";
import React, { useState } from "react";
import {
  Button,
  CustomInput,
  FormsHeader,
  RadioComponent,
} from "../components";
import { SIZES, COLORS } from "../constants";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { submitFormData } from "../context/submits";

const FormTaarifaMwezi = ({ route }) => {
  const katibuEmail = route.params?.katibuEmail;
  const week = route.params?.week;
  const weekNumber = week ? Number(week) : null;

  const [wanachamaKiume, setWanachamaKiume] = useState("");
  const [wanachamaKike, setWanachamaKike] = useState("");
  const [asilimiaMahudhurio, setAsilimiaMahudhurio] = useState("");
  const [nyongezaMkopo, setNyongezaMkopo] = useState("");
  const [kiasiMarejesho, setKiasiMarejesho] = useState("");
  const [kiwangoMkopoJuu, setKiwangoMkopoChaJuu] = useState("");
  const [wanachamaKopeshwa, setIdadiWanachamaKopeshwa] = useState("");
  const [thamaniMiradi, setThamaniMiradi] = useState("");
  const [mafunzo, setMafunzo] = useState("");
  const [jinaTembelewa, setJinaTembelewa] = useState("");
  const [maoni, setMaoni] = useState("");
  const [changamoto, setChangamoto] = useState("");
  const [radioAnswerMafunzo, setRadioAnswerMafunzo] = useState("");
  const [radioAnswerMtembelewa, setRadioAnswerMtembelewa] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (week === null || typeof week === "undefined") {
      alert("Tafadhali sema ni wiki ya ngapi!");
      return;
    }
    const docName =
      "Taarifa_Ya_Mwezi_" + katibuEmail?.split("@")[0] + "_week_" + weekNumber;
    const formData = {
      "Idadi ya Wanachama wa Kiume": wanachamaKiume,
      "Idadi ya Wanachama wa Kike": wanachamaKike,
      "Asilimia Mahudhurio kwa Mwezi": asilimiaMahudhurio,
      "Nyongeza ya Mkopo/Bei ya Mkopo": nyongezaMkopo,
      "Kiasi cha Marejesho kilichopokelewa": kiasiMarejesho,
      "Kiwango cha Mkopo cha Juu Kilichotolewa": kiwangoMkopoJuu,
      "Idadi ya Wanachama waliokopeshwa": wanachamaKopeshwa,
      "Thamani ya Miradi ya Pamoja": thamaniMiradi,
      "Mlitembelewa na mtu/shirika/taasisi?": radioAnswerMtembelewa,
      "Kuna Mafunzo Yoyote Mliyopata Kipindi Hiki?": radioAnswerMafunzo,
      "Kama ndio nani alitoa?": mafunzo,
      "Kama ndio andika jina lake": jinaTembelewa,
      "Changamoto zozote?": changamoto,
      "Maoni Yako": maoni,
    };
    setLoading(true);
    submitFormData(
      "FormDocs",
      katibuEmail,
      "Taarifa ya Mwezi Ya Kikundi",
      docName,
      weekNumber,
      formData
    )
      .then(() => {
        setLoading(false);
        setWanachamaKiume("");
        setWanachamaKike("");
        setAsilimiaMahudhurio("");
        setNyongezaMkopo("");
        setKiasiMarejesho("");
        setKiwangoMkopoChaJuu("");
        setIdadiWanachamaKopeshwa("");
        setThamaniMiradi("");
        setMafunzo("");
        setJinaTembelewa("");
        setMaoni("");
        setChangamoto("");
        alert("Umefanikiwa Kukusanya Taarifa.");
      })
      .catch((e) => {
        setLoading(false);
        alert(e.message);
      });
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
          title={"Fomu taarifa za Kikundi"}
          subTitle={"Fomu taarifa za kikundi"}
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
            label="Idadi ya Wanachama wa Kiume"
            placeholder={"Ingiza idadi ya waume"}
            value={wanachamaKiume}
            onChangeText={(text) => setWanachamaKiume(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Idadi ya Wanachama wa Kike"
            placeholder={"Ingiza mahudhurio ya wake"}
            value={wanachamaKike}
            onChangeText={(text) => setWanachamaKike(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Asilimia ya mahudhurio kwa mwezi"
            placeholder={"Ingiza asilimia ya mahudhurio"}
            value={asilimiaMahudhurio}
            onChangeText={(text) => setAsilimiaMahudhurio(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Nyongeza ya Mkopo/Bei ya Mkopo"
            placeholder={"Ingiza nyongeza/bei ya mkopo"}
            value={nyongezaMkopo}
            onChangeText={(text) => setNyongezaMkopo(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Kiasi cha marejesho kilichopokelewa"
            placeholder={"Ingiza kiasi kilichopokelewa"}
            value={kiasiMarejesho}
            onChangeText={(text) => setKiasiMarejesho(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Kiwango cha mkopo cha juu kilichotolewa"
            placeholder={"Ingiza kiwango chajuu kilichotolewa"}
            value={kiwangoMkopoJuu}
            onChangeText={(text) => setKiwangoMkopoChaJuu(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Idadi ya Wanachama waliokopeshwa"
            placeholder={"Ingiza idadi"}
            value={wanachamaKopeshwa}
            onChangeText={(text) => setIdadiWanachamaKopeshwa(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Thamani ya Miradi ya Pamoja"
            placeholder={"Ingiza thamani ya miradi"}
            value={thamaniMiradi}
            onChangeText={(text) => setThamaniMiradi(text)}
            isNumber={true}
          />
          <RadioComponent
            label={"Mlitembelewa na mtu/shirika/taasisi?"}
            hasDependentInput={true}
            dependentText={"Kama ndio andika jina lake"}
            dependentPlaceHolder={"Ingiza jina kamili"}
            onchangeText={(text) => setJinaTembelewa(text)}
            radioAnswer={radioAnswerMtembelewa}
            setRadioAnswer={setRadioAnswerMtembelewa}
          />
          <RadioComponent
            label={"Kuna Mafunzo Yoyote Mliyopata Kipindi Hiki?"}
            hasDependentInput={true}
            dependentText={"Kama ndio nani alitoa?"}
            dependentPlaceHolder={"Ingiza taarifa kamili"}
            multiLine={true}
            onchangeText={(text) => setMafunzo(text)}
            radioAnswer={radioAnswerMafunzo}
            setRadioAnswer={setRadioAnswerMafunzo}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Changamoto zozote?"
            placeholder={"Taja changamoto"}
            value={changamoto}
            onChangeText={(text) => setChangamoto(text)}
            multiLine={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Maoni Yako"
            placeholder={"Toa maoni yako"}
            value={maoni}
            onChangeText={(text) => setMaoni(text)}
            multiLine={true}
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

export default FormTaarifaMwezi;
