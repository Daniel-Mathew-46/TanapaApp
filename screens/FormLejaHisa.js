import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { Button, CustomInput, FormsDropDown, FormsHeader } from "../components";
import { SIZES, COLORS } from "../constants";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/AntDesign";
import Iconz from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { submitFormData } from "../context/submits";
import { KatibuTasksContexts } from "../context/KatibuTasksProvider";
import moment from "moment/moment";

const RenderFields = ({
  item,
  setMemberSampleData,
  deductFromMembersToShow,
}) => {
  let key = Object.keys(item)[0];
  key = Number(key);
  let name = item[key];
  let todayDate = moment().format("D/MM/YYYY");
  const [dateValue, setDateValue] = useState(todayDate);
  const [jina, setJina] = useState(name);

  useEffect(() => {
    setMemberSampleData(dateValue, key, "tarehe");
  }, [dateValue]);

  return (
    <>
      <View
        style={{
          marginTop: SIZES.large,
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            color: COLORS.gray,
            fontSize: SIZES.large,
            fontWeight: "bold",
          }}
        >
          {name}
        </Text>
        <TouchableOpacity onPress={() => deductFromMembersToShow(key)}>
          <Icons name="minuscircle" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <CustomInput
        icon={<Icon name="person" size={25} color={COLORS.primary} />}
        label="Jina la Mwanachama"
        placeholder={"Ingiza jina la Mwanachama"}
        value={jina}
        onChangeText={(text) => {
          setJina(text);
          setMemberSampleData(jina, key, "jina");
        }}
      />
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
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Hisa Anzia"
        placeholder={"Ingiza hisa anzia"}
        onChangeText={(text) => {
          setMemberSampleData(text, key, "hisa_anzia");
        }}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Idadi ya Hisa"
        placeholder={"Ingiza idadi ya hisa"}
        onChangeText={(text) => setMemberSampleData(text, key, "idadi_hisa")}
        isNumber={true}
      />
    </>
  );
};

const FormLejaHisa = ({ route }) => {
  const { states, dispatch } = useContext(KatibuTasksContexts);
  const katibuEmail = route.params?.katibuEmail;
  const week = route.params?.week;
  const weekNumber = week ? Number(week) : null;
  const idToNamesMapArray = [];
  const membersIds =
    states?.members?.length > 0
      ? states.members.map((item) => item["Namba yake"])
      : [];

  const membersNames =
    states?.members?.length > 0
      ? states.members.map((item) => item["Jina la Mwanachama"])
      : [];

  for (let i = 0; i < states?.members?.length; i++) {
    let obj = {};
    let id = membersIds[i];
    obj[id] = membersNames[i];
    idToNamesMapArray.push(obj);
  }

  const [currMember, setCurrMember] = useState();
  const [loading, setLoading] = useState(false);
  const [membersFilled, setMembersFilled] = useState({});
  const [wanachamaShown, setWanachamaShown] = useState([]);
  const fields = {
    jina: 0,
    tarehe: 1,
    hisa_anzia: 2,
    idadi_hisa: 3,
  };

  const deduceMembersToShow = (index, label) => {
    let indexNameMap = {};
    indexNameMap[index] = label;
    let arrIndexes = wanachamaShown;
    arrIndexes.push(indexNameMap);
    setCurrMember(index);
    setWanachamaShown(arrIndexes);
  };

  const deductFromMembersToShow = (index) => {
    let remArrIndexes = wanachamaShown?.filter(
      (item) => Math.floor(Object.keys(item)[0]) !== index
    );
    let { [index]: deleted, ...remMembersFilled } = membersFilled;
    setWanachamaShown(remArrIndexes);
    setMembersFilled({ ...remMembersFilled });
  };

  //Updating values per each member filled
  const setMemberSampleData = (text, index, fieldName) => {
    let members_filled = { ...membersFilled };
    if (Object.keys(members_filled).length > 0) {
      let indexToPutText = fields[fieldName];
      let curr_data = members_filled[index];
      if (typeof curr_data === "undefined") {
        let newMemberData = [];
        newMemberData[indexToPutText] = text;
        curr_data = [...newMemberData];
      }
      let dataArr = [...curr_data];
      dataArr[indexToPutText] = text;
      members_filled[index] = dataArr;
      setMembersFilled((prevState) => ({ ...members_filled }));
    } else {
      let newData = [];
      let indexToPutText = fields[fieldName];
      newData[indexToPutText] = text;
      members_filled[index] = [...newData];
      setMembersFilled((prevState) => ({ ...members_filled }));
    }
  };

  const handleSetName = (jina, dateValue, key) => {
    setMemberSampleData(jina, key, "jina");
    setMemberSampleData(dateValue, key, "tarehe");
  };

  const handleSubmit = () => {
    if (Object.keys(membersFilled).length === 0) {
      alert("Tafadhali jaza taarifa sahihi!");
      return;
    }
    Object.values(membersFilled).forEach((memberArr) => {
      for (let i = 0; i < memberArr.length; i++) {
        if (typeof memberArr[i] === "undefined") memberArr.fill(" ", i, i + 1);
      }
    });
    const memberDataToSubmit = { ...membersFilled };
    const docName =
      "Leja_ya_Hisa_za_Mteja_" +
      katibuEmail?.split("@")[0] +
      "_week_" +
      weekNumber;
    const formData = {
      0: [
        "Jina la Mwanachama",
        "Tarehe",
        "Hisa Anzia",
        "Idadi ya Hisa alizochukua",
      ],
      ...memberDataToSubmit,
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

    const onSubmitConfirm = () => {
      setLoading(true);
      submitFormData(
        "FormDocs",
        katibuEmail,
        "Leja ya Hisa za Mteja",
        docName,
        weekNumber,
        formData
      )
        .then(() => {
          setLoading(false);
          alert("Umefanikiwa Kukusanya Taarifa.");
          dispatch({
            type: "SET_LEJA_HISA_FORM_STATE",
            data: { ...memberDataToSubmit },
            forms_filled: [...states.formsFilled, "leja hisa"],
          });
        })
        .catch((e) => {
          setLoading(false);
          alert(e.message);
        });
    };
  };
  return (
    <ScrollView style={{ flex: 1 }}>
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
          title={"Leja ya Hisa za Mteja"}
          subTitle={"Fomu Leja Hisa za Mteja"}
        />
      </View>

      <KeyboardAwareScrollView>
        <View
          style={{
            paddingHorizontal: SIZES.large,
            marginTop: SIZES.large,
          }}
        >
          <FormsDropDown
            labelText={"Chagua Mwanachama"}
            options={idToNamesMapArray}
            value={currMember}
            setValue={deduceMembersToShow}
          />
          {wanachamaShown?.map((item, index) => (
            <RenderFields
              key={`${index} ${item}`}
              item={item}
              setMemberSampleData={setMemberSampleData}
              deductFromMembersToShow={deductFromMembersToShow}
              memberFilled={membersFilled}
              handleSetName={handleSetName}
            />
          ))}
          {states.formsFilled.includes("leja hisa") && (
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: COLORS.gray, fontSize: SIZES.large }}>
                Fomu hii imeshajazwa!
              </Text>
            </View>
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

export default FormLejaHisa;
