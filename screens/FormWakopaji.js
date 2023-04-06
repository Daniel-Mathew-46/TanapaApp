import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useContext } from "react";
import { Button, CustomInput, FormsHeader, FormsDropDown } from "../components";
import { SIZES, COLORS } from "../constants";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/AntDesign";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { submitFormData } from "../context/submits";
import { KatibuTasksContexts } from "../context/KatibuTasksProvider";
import moment from "moment/moment";

const RenderFields = ({
  item,
  setMemberSampleData,
  deductFromMembersToShow,
}) => {
  const [dateValue, setDateValue] = useState(moment().format("D/MM/YYYY"));
  let key = Object.keys(item)[0];
  key = Number(key);
  let name = item[key];
  const [jina, setJina] = useState(name);
  return (
    <>
      {}
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
        label="Jina la Mkopaji"
        placeholder={"Ingiza jina kamili la mkopaji"}
        value={jina}
        onChangeText={(text) => {
          setJina(text);
          setMemberSampleData(jina, key, "jina");
        }}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Tarehe ya Mkopo"
        placeholder={"Chagua tarehe ya Mkopo"}
        value={`${dateValue}`}
        onChangeText={(text) => {
          setDateValue(text);
          setMemberSampleData(dateValue, key, "tarehe");
        }}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Kiasi cha Mkopo"
        placeholder={"Ingiza kiasi cha mkopo"}
        onChangeText={(text) => setMemberSampleData(text, key, "kiasi")}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Riba"
        placeholder={"Ingiza riba"}
        onChangeText={(text) => setMemberSampleData(text, key, "riba")}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Bima"
        placeholder={"Ingiza Bima"}
        onChangeText={(text) => setMemberSampleData(text, key, "bima")}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="1"
        placeholder={"Ingiza 1"}
        onChangeText={(text) => setMemberSampleData(text, key, 1)}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="2"
        placeholder={"Ingiza 2"}
        onChangeText={(text) => setMemberSampleData(text, key, 2)}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="3"
        placeholder={"Ingiza 3"}
        onChangeText={(text) => setMemberSampleData(text, key, 3)}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="4"
        placeholder={"Ingiza 4"}
        onChangeText={(text) => setMemberSampleData(text, key, 4)}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="5"
        placeholder={"Ingiza 5"}
        onChangeText={(text) => setMemberSampleData(text, key, 5)}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="5"
        placeholder={"Ingiza 5"}
        onChangeText={(text) => setMemberSampleData(text, key, 6)}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Jumla"
        placeholder={"Weka Jumla"}
        onChangeText={(text) => setMemberSampleData(text, key, "jumla")}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Maelezo"
        placeholder={"Andika Maelezo"}
        onChangeText={(text) => setMemberSampleData(text, key, "maelezo")}
        multiLine={true}
      />
    </>
  );
};

const FormWakopaji = ({ route }) => {
  const { states } = useContext(KatibuTasksContexts);
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
    kiasi: 2,
    riba: 3,
    bima: 4,
    1: 5,
    2: 6,
    3: 7,
    4: 8,
    5: 9,
    6: 10,
    jumla: 11,
    maelezo: 12,
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

  const handleSubmit = () => {
    if (week === null || typeof week === "undefined") {
      alert("Tafadhali sema ni wiki ya ngapi!");
      return;
    }
    const memberDataToSubmit = { ...membersFilled };
    const docName =
      "Wakopaji_na_Marejesho_" +
      katibuEmail?.split("@")[0] +
      "_week_" +
      weekNumber;
    const formData = {
      0: [
        "Jina",
        "Tarehe ya Mkopo",
        "Kiasi",
        "Riba",
        "Bima",
        1,
        2,
        3,
        4,
        5,
        6,
        "Jumla",
        "Maelezo",
      ],
      ...memberDataToSubmit,
    };

    setLoading(true);
    submitFormData(
      "FormDocs",
      katibuEmail,
      "Fomu ya Wakopaji na Marejesho",
      docName,
      weekNumber,
      formData
    )
      .then(() => {
        setLoading(false);
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
            />
          ))}
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
