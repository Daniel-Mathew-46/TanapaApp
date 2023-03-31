import { View } from "react-native";
import React, { useState } from "react";
import { Button, CustomInput, FormsHeader } from "../components";
import { SIZES, COLORS } from "../constants";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { submitFormData } from "../context/submits";

const FormWakopaji = ({ route }) => {
  const katibuEmail = route.params?.katibuEmail;
  const week = route.params?.week;
  const weekNumber = week ? Number(week) : null;

  const [jinaMkopaji, setJinaMkopaji] = useState("");
  const [kiasiMkopo, setKiasiMkopo] = useState("");
  const [riba, setRiba] = useState("");
  const [bima, setBima] = useState("");
  const [moja, setMoja] = useState("");
  const [mbili, setMbili] = useState("");
  const [tatu, setTatu] = useState("");
  const [nne, setNne] = useState("");
  const [tano, setTano] = useState("");
  const [jumla, setJumla] = useState("");
  const [jumlaKuu, setJumlaKuu] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (week === null || typeof week === "undefined") {
      alert("Tafadhali sema ni wiki ya ngapi!");
      return;
    }
    const docName =
      "Wakopaji_na_Marejesho_" +
      katibuEmail?.split("@")[0] +
      "_week_" +
      weekNumber;
    const formData = {
      "Jina la Mkopaji": jinaMkopaji,
      "Kiasi cha Mkopo": kiasiMkopo,
      Riba: riba,
      Bima: bima,
      Moja: moja,
      Mbili: mbili,
      Tatu: tatu,
      Nne: nne,
      Tano: tano,
      Jumla: jumla,
      "Jumla Kuu": jumlaKuu,
    };
    setLoading(true);
    submitFormData(
      "FormDocs",
      katibuEmail,
      "Shughuli ya Wakopaji na Marejesho",
      docName,
      weekNumber,
      formData
    )
      .then(() => {
        setLoading(false);
        setJinaMkopaji("");
        setKiasiMkopo("");
        setRiba("");
        setBima("");
        setMoja("");
        setMbili("");
        setTatu("");
        setNne("");
        setTano("");
        setJumla("");
        setJumlaKuu("");
        alert("Umefanikiwa Kukusanya Taarifa.");
      })
      .catch((e) => {
        setLoading(false);
        alert(e.message);
        console.log(e.message);
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
          title={"Fomu Wakopaji na Marejesho"}
          subTitle={"Fomu ya wakopaji na marejesho"}
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
            label="Jina la Mkopaji"
            placeholder={"Ingiza jina kamili la mkopaji"}
            value={jinaMkopaji}
            onChangeText={(text) => setJinaMkopaji(text)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Kiasi cha Mkopo"
            placeholder={"Ingiza kiasi cha mkopo"}
            onChangeText={(text) => setKiasiMkopo(text)}
            isNumber={true}
            value={kiasiMkopo}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Riba"
            placeholder={"Ingiza riba"}
            value={riba}
            onChangeText={(text) => setRiba(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Bima"
            placeholder={"Ingiza Bima"}
            value={bima}
            onChangeText={(text) => setBima(text)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="1"
            placeholder={"Ingiza 1"}
            value={moja}
            onChangeText={(text) => setMoja(text)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="2"
            placeholder={"Ingiza 2"}
            value={mbili}
            onChangeText={(text) => setMbili(text)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="3"
            placeholder={"Ingiza 3"}
            value={tatu}
            onChangeText={(text) => setTatu(text)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="4"
            placeholder={"Ingiza 4"}
            value={nne}
            onChangeText={(text) => setNne(text)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="5"
            placeholder={"Ingiza 5"}
            value={tano}
            onChangeText={(text) => setTano(text)}
            isNumber={true}
          />

          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Jumla"
            placeholder={"Weka Jumla"}
            value={jumla}
            onChangeText={(text) => setJumla(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Jumla Kuu"
            placeholder={"Weka Jumla kuu"}
            value={jumlaKuu}
            onChangeText={(text) => setJumlaKuu(text)}
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

export default FormWakopaji;
