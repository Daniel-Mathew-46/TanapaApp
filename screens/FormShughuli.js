import { View } from "react-native";
import React, { useState } from "react";
import { Button, CustomInput, FormsHeader } from "../components";
import { SIZES, COLORS } from "../constants";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { submitFormData } from "../context/submits";

const FormShughuli = ({ route }) => {
  const katibuEmail = route.params?.katibuEmail;

  const [mahudhurioJumla, setMahudhurioJumla] = useState("");
  const [mahudhurioWaume, setMahudhurioWaume] = useState("");
  const [mahudhurioWake, setMahudhurioWake] = useState("");
  const [idadiHisa, setIdadiHisa] = useState("");
  const [adhabu, setAdhabu] = useState("");
  const [afya, setAfya] = useState("");
  const [elimu, setElimu] = useState("");
  const [zawadiRuzuku, setZawadiRuzuku] = useState("");
  const [mkopoAmbatanishi, setMkopoAmbatanishi] = useState("");
  const [nyongezaMkopo, setNyongezaMkopo] = useState("");
  const [bimaMkopo, setBimaMkopo] = useState("");
  const [mapatoMengine, setMapatoMengine] = useState("");
  const [jumla, setJumla] = useState("");
  const [jumlaKuu, setJumlaKuu] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const formData = {
      "Mahudhurio Jumla": mahudhurioJumla,
      "Mahudhurio Waume": mahudhurioWaume,
      "Mahudhurio Wake": mahudhurioWake,
      "Idadi ya Hisa": idadiHisa,
      Adhabu: adhabu,
      Afya: afya,
      Elimu: elimu,
      "Zawadi/Ruzuku": zawadiRuzuku,
      "Mkopo Ambatanishi": mkopoAmbatanishi,
      "Nyongeza ya Mkopo": nyongezaMkopo,
      "Bima Mkopo": bimaMkopo,
      "Mapato Mengine": mapatoMengine,
      Jumla: jumla,
      "Jumla Kuu": jumlaKuu,
    };
    setLoading(true);
    submitFormData("FormDocs", katibuEmail, "Shughuli za Kikundi", formData)
      .then(() => {
        setLoading(false);
        alert("Umefanikiwa Kukusanya Taarifa.");
        setMahudhurioJumla("");
        setMahudhurioWaume("");
        setMahudhurioWake("");
        setIdadiHisa("");
        setAdhabu("");
        setAfya("");
        setElimu("");
        setZawadiRuzuku("");
        setMkopoAmbatanishi("");
        setNyongezaMkopo("");
        setBimaMkopo("");
        setMapatoMengine("");
        setJumla("");
        setJumlaKuu("");
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
          title={`Fomu shughuli za kikundi`}
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
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Mahudhurio Jumla"
            placeholder={"Ingiza idadi ya mahudhurio"}
            onChangeText={(text) => setMahudhurioJumla(text)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Mahudhurio ya Waume"
            placeholder={"Ingiza mahudhurio ya waume"}
            onChangeText={(text) => setMahudhurioWaume(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Mahudhurio ya Wake"
            placeholder={"Ingiza mahudhurio ya Wake"}
            onChangeText={(text) => setMahudhurioWake(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Idadi ya Hisa"
            placeholder={"Ingiza idadi ya hisa"}
            isNumber={true}
            onChangeText={(text) => setIdadiHisa(text)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Adhabu"
            placeholder={"Ingiza adhabu"}
            onChangeText={(text) => setAdhabu(text)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Afya"
            placeholder={"Ingiza Afya"}
            onChangeText={(text) => setAfya(text)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Elimu"
            placeholder={"Ingiza elimu"}
            onChangeText={(text) => setElimu(text)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Zawadi/Ruzuku"
            placeholder={"Ingiza zawadi/ruzuku"}
            onChangeText={(text) => setZawadiRuzuku(text)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Mkopo Ambatanishi"
            placeholder={"Ingiza idadi ya mikopo ambatanishi"}
            onChangeText={(text) => setMkopoAmbatanishi(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Nyongeza ya mkopo"
            placeholder={"Ingiza nyongeza ya mkopo"}
            onChangeText={(text) => setNyongezaMkopo(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Bima ya Mkopo"
            placeholder={"Ingiza bima ya mkopo"}
            onChangeText={(text) => setBimaMkopo(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Mapato Mengine"
            placeholder={"Ingiza mapato mengine"}
            onChangeText={(text) => setMapatoMengine(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Jumla"
            placeholder={"Weka Jumla"}
            onChangeText={(jumla) => setJumla(jumla)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Jumla Kuu"
            placeholder={"Weka Jumla kuu"}
            onChangeText={(jumla) => setJumlaKuu(jumla)}
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
