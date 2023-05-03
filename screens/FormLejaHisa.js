import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { CustomInput, FormsDropDown, FormsHeader } from "../components";
import { SIZES, COLORS } from "../constants";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/AntDesign";
import Iconz from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { KatibuTasksContexts } from "../context/KatibuTasksProvider";
import moment from "moment/moment";

const RenderFields = ({
  item,
  setMemberSampleData,
  week,
  deductFromMembersToShow,
}) => {
  let key = Object.keys(item)[0];
  key = Number(key);
  let name = item[key];
  const [jina, setJina] = useState(name);

  useEffect(() => {
    setMemberSampleData(jina, key, "jina");
  }, [jina]);

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
        <TouchableOpacity onPress={() => deductFromMembersToShow(key, name)}>
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
        }}
        editable={false}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Hisa Anzia"
        placeholder={"Ingiza hisa anzia"}
        onChangeText={(text) => {
          setMemberSampleData(text, key, "hisa_anzia");
        }}
        isNumber={true}
        editable={week === 1}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Hisa"
        editable={week !== 1}
        placeholder={"Ingiza hisa"}
        onChangeText={(text) => setMemberSampleData(text, key, "idadi_hisa")}
        isNumber={true}
      />
    </>
  );
};

const FormLejaHisa = ({ route, navigation: { navigate } }) => {
  const { states, dispatch } = useContext(KatibuTasksContexts);
  const week = Number(states.weekNumber);
  const data = route.params?.data;
  const prevWeekData = { ...states.prevWeekData, weekNumber: Number(week) };
  const kadiYaMahudhurioFilled = data.KadiYaMahudhurio;
  const lejaYaHisaPrevWeeks = { ...prevWeekData.LejaYaHisa };
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

  // console.log(week);
  console.log(kadiYaMahudhurioFilled);
  // console.log(idToNamesMapArray);

  const todayDate = moment().format("D/MM/YYYY");
  const [currMember, setCurrMember] = useState();
  const [membersFilled, setMembersFilled] = useState({});
  const [wanachamaShown, setWanachamaShown] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([
    ...idToNamesMapArray,
  ]);
  const fields = {
    jina: 0,
    hisa_anzia: 1,
    idadi_hisa: 2,
  };

  const deduceMembersToShow = (index, label, remOptions) => {
    let indexNameMap = {};
    indexNameMap[index] = label;
    let arrIndexes = wanachamaShown;
    arrIndexes.push(indexNameMap);
    setDropdownOptions(remOptions);
    setCurrMember(index);
    setWanachamaShown(arrIndexes);
  };

  const deductFromMembersToShow = (index, name) => {
    let remArrIndexes = wanachamaShown?.filter(
      (item) => Math.floor(Object.keys(item)[0]) !== index
    );
    let remOptions = [...dropdownOptions];
    remOptions.push({ [index]: name });
    let { [index]: deleted, ...remMembersFilled } = membersFilled;
    setWanachamaShown(remArrIndexes);
    setMembersFilled({ ...remMembersFilled });
    setDropdownOptions(remOptions);
  };

  //Updating values per each member filled
  const setMemberSampleData = (text, index, fieldName) => {
    if (fieldName !== "jina" && isNaN(text)) {
      alert("Tafadhali ingiza tarakimu!");
      return;
    }
    let members_filled = { ...membersFilled };
    let indexToPutText = fields[fieldName];
    if (Object.keys(members_filled).length > 0) {
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
      newData[indexToPutText] = text;
      members_filled[index] = [...newData];
      setMembersFilled((prevState) => ({ ...members_filled }));
    }
  };

  console.log(membersFilled);

  const beforeMoveToNextForm = () => {
    if (Object.keys(membersFilled).length === 0) {
      alert("Tafadhali jaza taarifa sahihi!");
      return;
    }

    if (Number(week) === 1) {
      for (let i = 0; i < Object.values(membersFilled).length; i++) {
        let memberArr = Object.values(membersFilled)[i];
        if (typeof memberArr[1] === "undefined") {
          alert(`Tafadhali jaza taarifa sahihi kwa ${memberArr[0]}`);
          return;
        }

        if (memberArr[1] === "" || /\s/.test(memberArr[1])) {
          alert(`Tafadhali jaza taarifa sahihi kwa ${memberArr[0]}.`);
          return;
        }
        memberArr[2] = memberArr[1];
      }
    } else {
      for (let i = 0; i < Object.values(membersFilled).length; i++) {
        let memberArr = Object.values(membersFilled)[i];
        if (typeof memberArr[2] === "undefined") {
          alert(`Tafadhali jaza taarifa sahihi kwa mwanachama ${memberArr[0]}`);
          return;
        }
        if (memberArr[2] === "" || /\s/.test(memberArr[1])) {
          alert(`Tafadhali jaza taarifa sahihi kwa mwanachama${memberArr[0]}.`);
          return;
        }
        memberArr[1] = 0;
      }
    }

    let jumla_hisa_wiki = 0;
    let jumla_hisa_cumulative =
      { ...lejaYaHisaPrevWeeks[(week - 1).toString()]?.["cumulativeJumla"] } ||
      {};

    //Calculating total hisa for a mwanachama and extend the array
    Object.keys(membersFilled).forEach((memberId) => {
      let prevWeekHisasTaken = jumla_hisa_cumulative[memberId] || 0;

      let thisWeekHisaSum =
        Math.floor(prevWeekHisasTaken) +
        Math.floor(membersFilled[memberId]?.[2]);
      jumla_hisa_cumulative[memberId] = thisWeekHisaSum;
    });
    Object.values(membersFilled).forEach((memberArr) => {
      jumla_hisa_wiki += Math.floor(memberArr[2]);
    });

    const thisWeeksData = {
      Tarehe: todayDate,
      0: ["Jina la Mwanachama", "Hisa Anzia", "Hisa"],
      ...membersFilled,
      jumlaYaWiki: jumla_hisa_wiki,
      cumulativeJumla: jumla_hisa_cumulative,
    };

    lejaYaHisaPrevWeeks[week] = thisWeeksData;
    Alert.alert(
      "Uhakiki",
      "Umehakiki taarifa kabla ya kwenda fomu inayofuata?",
      [
        { text: "Hapana", onPress: () => {} },
        {
          text: "Ndiyo",
          onPress: () => {
            onToNextFormConfirm();
          },
        },
      ]
    );

    const onToNextFormConfirm = () => {
      // dispatch({
      //   type: "SET_LEJA_HISA_FORM_STATE",
      //   data: { ...prevWeekData },
      // });
      let dataCopy = { ...data };
      dataCopy["LejaYaHisa"] = lejaYaHisaPrevWeeks;
      navigate("LEJAMFUKO", { data: dataCopy });
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
          <CustomInput
            icon={<Iconz name="date-range" size={25} color={COLORS.primary} />}
            label="Tarehe"
            placeholder={"Andika tarehe"}
            value={todayDate}
            editable={false}
            isNumber={true}
          />
          <FormsDropDown
            labelText={"Chagua Mwanachama"}
            options={dropdownOptions}
            value={currMember}
            setValue={deduceMembersToShow}
          />
          {wanachamaShown.map((item, index) => (
            <RenderFields
              key={`${index} ${item}`}
              item={item}
              setMemberSampleData={setMemberSampleData}
              deductFromMembersToShow={deductFromMembersToShow}
              week={Number(week)}
            />
          ))}
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "flex-end",
              marginBottom: SIZES.font,
            }}
          >
            <TouchableOpacity onPress={beforeMoveToNextForm}>
              <Text
                style={{
                  color: COLORS.primary,
                  fontSize: SIZES.large,
                }}
              >{`Fomu inayofuata >>`}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default FormLejaHisa;
