import { View } from "react-native";
import React, { useState } from "react";
import { Button, CustomInput, FormsHeader } from "../components";
import { SIZES, COLORS } from "../constants";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { submitFormData } from "../context/submits";

const FormMzunguko = ({ route }) => {
  const katibuEmail = route.params?.katibuEmail;

  const [jinaMwanachama, setJinaMwanachama] = useState("");
  const [idadiHisa, setIdadiHisa] = useState("");
  const [mifukoJamiiAfya, setMifukoJamiiAfya] = useState("");
  const [mifukoJamiiElimu, setMifukoJamiiElimu] = useState("");
  const [mifukoJamiiMazingira, setMifukoJamiiMazingira] = useState("");
  const [madeni, setMadeni] = useState("");
  const [gawio, setGawio] = useState("");
  const [salio, setSalio] = useState("");

  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const formData = {
      "Jina la Mwanachama": jinaMwanachama,
      "Idadi ya Hisa": idadiHisa,
      "Mifuko Jamii Ya Afya": mifukoJamiiAfya,
      "Mifuko Jamii Ya Elimu": mifukoJamiiElimu,
      "Mifuko Jamii Ya Mazingira": mifukoJamiiMazingira,
      Madeni: madeni,
      Gawio: gawio,
      Salio: salio,
    };
    setLoading(true);
    submitFormData("FormDocs", katibuEmail, "Kumaliza Mzunguko", formData)
      .then(() => {
        setLoading(false);
        alert("Umefanikiwa Kukusanya Taarifa.");
        setJinaMwanachama("");
        setIdadiHisa("");
        setMifukoJamiiAfya("");
        setMifukoJamiiElimu("");
        setMifukoJamiiMazingira("");
        setGawio("");
        setSalio("");
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
          title={"Fomu ya kumaliza Mzunguko"}
          subTitle={"Fomu ya kumaliza mzunguko"}
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
            label="Jina la Mwanachama"
            placeholder={"Ingiza jina kamili la Mwanachama"}
            onChangeText={(text) => setJinaMwanachama(text)}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Idadi ya Hisa"
            placeholder={"Ingiza idadi ya Hisa"}
            onChangeText={(text) => setIdadiHisa(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Mifuko ya jamii ya Afya"
            placeholder={"Ingiza mifuko ya jamii ya Afya"}
            onChangeText={(text) => setMifukoJamiiAfya(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Mifuko ya jamii ya Elimu"
            placeholder={"Ingiza Mifuko ya elimu"}
            onChangeText={(text) => setMifukoJamiiElimu(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Mifuko ya jamii ya mazingira"
            placeholder={"Ingiza mifuko ya jamii ya mazingira"}
            onChangeText={(text) => setMifukoJamiiMazingira(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Madeni"
            placeholder={"Ingiza Madeni"}
            onChangeText={(text) => setMadeni(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Gawio"
            placeholder={"Weka Gawio"}
            onChangeText={(text) => setGawio(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Salio"
            placeholder={"Weka Salio"}
            onChangeText={(text) => setSalio(text)}
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

export default FormMzunguko;
