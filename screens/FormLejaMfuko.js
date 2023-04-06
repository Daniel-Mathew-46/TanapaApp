import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useState } from "react";
import { Button, CustomInput, FormsDropDown, FormsHeader } from "../components";
import { SIZES, COLORS } from "../constants";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/AntDesign";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { submitFormData } from "../context/submits";
import { KatibuTasksContexts } from "../context/KatibuTasksProvider";

const RenderFields = ({
  item,
  setMemberSampleData,
  deductFromMembersToShow,
}) => {
  let key = Object.keys(item)[0];
  let intKey = Number(key);
  let name = item[key];
  const [namba_, setNamba_] = useState(key);
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
        <TouchableOpacity onPress={() => deductFromMembersToShow(intKey)}>
          <Icons name="minuscircle" size={20} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Namba ya Mwanachama"
        placeholder={"Ingiza namba"}
        value={namba_}
        onChangeText={(text) => {
          setNamba_(text);
          setMemberSampleData(namba_, key, "namba");
        }}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Afya"
        placeholder={"Ingiza afya"}
        onChangeText={(text) => {
          setMemberSampleData(text, intKey, "afya");
        }}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Elimu"
        placeholder={"Weka elimu"}
        onChangeText={(text) => setMemberSampleData(text, intKey, "elimu")}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Mazingira"
        placeholder={"Ingiza mazingira"}
        onChangeText={(text) => setMemberSampleData(text, intKey, "mazingira")}
        isNumber={true}
      />
    </>
  );
};

const FormLejaMfuko = ({ route }) => {
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
  const [salioAnzia, setSalioAnzia] = useState("");
  const [currMember, setCurrMember] = useState();
  const [loading, setLoading] = useState(false);
  const [membersFilled, setMembersFilled] = useState({});
  const [wanachamaShown, setWanachamaShown] = useState([]);
  const fields = {
    namba: 0,
    afya: 1,
    elimu: 2,
    mazingira: 3,
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
      "Leja_ya_Mfuko_" + katibuEmail?.split("@")[0] + "_week_" + weekNumber;
    const formData = {
      0: ["Namba ya Mwanachama", "Afya", "Elimu", "Mazingira"],
      ...memberDataToSubmit,
    };
    setLoading(true);
    submitFormData(
      "FormDocs",
      katibuEmail,
      "Leja ya Mfuko wa Jamii",
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

  console.log(membersFilled);
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
          title={`Leja Mfuko wa Jamii`}
          subTitle={"Fomu Leja mfuko wa jamii"}
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
            label="Salio Anzia"
            placeholder={"Ingiza salio anzia!"}
            value={salioAnzia}
            onChangeText={(text) => setSalioAnzia(text)}
            isNumber={true}
          />
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

export default FormLejaMfuko;
