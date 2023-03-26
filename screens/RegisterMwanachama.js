import React, { useState, useContext } from "react";
import { View } from "react-native";
import { Button, CustomInput, FormsHeader } from "../components";
import { SIZES, COLORS } from "../constants";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { submitMembersData } from "../context/submits";
import { KatibuDataContext } from "../context/MemberStackProvide";

const RegisterMwanachama = ({ route }) => {
  const { states, dispatch } = useContext(KatibuDataContext);
  const kikundi_ = route.params?.kikundi;
  const data = route.params?.data;
  var jina = "" || data?.["Jina la Mwanachama"];
  var email = "" || data?.["Barua Pepe"];
  var phone = "" || data?.["Barua Pepe"];
  var pobox = "" || data?.["Anuani"];

  const [kikundi, setKikundi] = useState(kikundi_);
  const [jinaMwanachama, setJinaMwanachama] = useState(jina);
  const [baruaPepe, setBaruaPepe] = useState(email);
  const [nambaSimu, setNambaSimu] = useState(phone);
  const [anuani, setAnuani] = useState(pobox);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    const formData = {
      "Jina la Mwanachama": jinaMwanachama,
      "Barua Pepe": baruaPepe,
      "Namba Ya Simu": nambaSimu,
      Anuani: anuani,
    };
    let currMembers = states?.members;
    if (route.params?.edit) {
      var _currMembers = [...currMembers].filter(
        (item) => item?.["Barua Pepe"] !== data?.["Barua Pepe"]
      );
      _currMembers.unshift({
        ...formData,
        "Kikundi Chake": data?.["Kikundi Chake"],
      });
    } else currMembers.unshift({ ...formData, "Kikundi Chake": kikundi });
    setLoading(true);
    if (route.params?.edit) {
      submitMembersData(
        data?.["Barua Pepe"],
        data?.["Kikundi Chake"],
        formData,
        (update = true)
      )
        .then(() => {
          setLoading(false);
          alert("Umefanikiwa Kukusanya Taarifa.");
          setJinaMwanachama("");
          setBaruaPepe("");
          setNambaSimu("");
          setAnuani("");
          dispatch({
            type: "UPDATE_MEMBER",
            payload: _currMembers,
          });
        })
        .catch((e) => {
          setLoading(false);
          alert(e.message);
        });
    } else {
      submitMembersData(null, kikundi, formData, false)
        .then(() => {
          setLoading(false);
          alert("Umefanikiwa Kukusanya Taarifa.");
          setJinaMwanachama("");
          setBaruaPepe("");
          setNambaSimu("");
          setAnuani("");
          dispatch({
            type: "ADD_NEW_MEMBER",
            payload: currMembers,
          });
        })
        .catch((e) => {
          setLoading(false);
          alert(e.message);
        });
    }
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
          title={"Fomu ya Usajili wa Mwanachama"}
          subTitle={
            route.params?.edit
              ? `Badilisha Taarifa za Mwanachama ${data["Jina la Mwanachama"]}`
              : "Fomu ya Usajili wa Mwanachama"
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
            value={kikundi || data["Kikundi Chake"]}
            label="Kikundi chako"
            placeholder={"Kikundi chako"}
            onChangeText={() => {}}
            editable={false}
          />
          <CustomInput
            icon={<Icon name="person" size={25} color={COLORS.primary} />}
            label="Jina kamili la Mwanachama"
            value={jinaMwanachama}
            placeholder={"Ingiza jina la Mwanachama"}
            onChangeText={(text) => setJinaMwanachama(text)}
          />
          <CustomInput
            icon={<Icon name="mail-outline" size={25} color={COLORS.primary} />}
            label="Barua pepe ya Mwanachama"
            placeholder={"Ingiza barua pepe"}
            value={baruaPepe}
            onChangeText={(text) => setBaruaPepe(text)}
          />
          <CustomInput
            icon={<Icons name="phone" size={25} color={COLORS.primary} />}
            label="Namba ya Simu"
            placeholder={"Ingiza namba ya simu"}
            value={nambaSimu}
            onChangeText={(text) => setNambaSimu(text)}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="location-outline" size={25} color={COLORS.primary} />
            }
            value={anuani}
            label="Anuani Ya Makazi"
            placeholder={"Ingiza anuani ya makazi"}
            onChangeText={(text) => setAnuani(text)}
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

export default RegisterMwanachama;
