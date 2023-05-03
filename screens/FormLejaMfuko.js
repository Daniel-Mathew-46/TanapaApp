import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import { CustomInput, FormsDropDown, FormsHeader } from "../components";
import { SIZES, COLORS } from "../constants";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/AntDesign";
import Iconz from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { KatibuTasksContexts } from "../context/KatibuTasksProvider";
import moment from "moment/moment";
import { TimelineMap } from "../constants/timeline";

const RenderFields = ({
  item,
  setMemberSampleData,
  deductFromMembersToShow,
  week,
  kiasiLeoObj,
  salio_anzia,
}) => {
  let key = Object.keys(item)[0];
  let intKey = Number(key);
  let name = item[key];
  let jamiiFields = kiasiLeoObj[key];
  const [namba_, setNamba_] = useState(key);
  useEffect(() => {
    setMemberSampleData(namba_, key, "namba");
  }, [namba_]);
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
        <TouchableOpacity onPress={() => deductFromMembersToShow(intKey, name)}>
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
        }}
        isNumber={true}
        editable={false}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Salio Anzia"
        placeholder={"Ingiza salio anzia!"}
        value={salio_anzia.toString()}
        onChangeText={(text) => setMemberSampleData(text, key, "salio_anzia")}
        isNumber={true}
        editable={false}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Kiasi"
        placeholder={"Ingiza kiasi"}
        onChangeText={(text) => {
          setMemberSampleData(text, intKey, "kiasi");
        }}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Afya"
        placeholder={"Ingiza afya"}
        value={jamiiFields[0].toString()}
        onChangeText={(text) => {
          setMemberSampleData(text, intKey, "afya");
        }}
        editable={false}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Elimu"
        placeholder={"Weka elimu"}
        value={jamiiFields[1].toString()}
        onChangeText={(text) => setMemberSampleData(text, intKey, "elimu")}
        editable={false}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Mazingira"
        placeholder={"Ingiza mazingira"}
        value={jamiiFields[2].toString()}
        editable={false}
        onChangeText={(text) => setMemberSampleData(text, intKey, "mazingira")}
        isNumber={true}
      />
    </>
  );
};

const FormLejaMfuko = ({ route, navigation: { navigate } }) => {
  const { states, dispatch } = useContext(KatibuTasksContexts);
  const week = Number(states.weekNumber);
  const data = route.params?.data;
  const prevWeekData = { ...states.prevWeekData, weekNumber: Number(week) };
  const lejaYaHisaFilled = data?.LejaYaHisa;
  const lejaYaMfukoWaJamiiPrevWeeks = { ...prevWeekData.LejaYaMfukoWaJamii };
  const [kiasiLeoObj, setKiasiLeoObj] = useState({});
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

  let ratio = [4, 4, 2];
  let jumlaAmountPerMemberRequired = 0;
  let salio_anzia =
    lejaYaMfukoWaJamiiPrevWeeks[(week - 1).toString()]?.[
      "Salio Anzia Mwezi Ujao"
    ] ||
    lejaYaMfukoWaJamiiPrevWeeks[(week - 1).toString()]?.[
      "cumulativeJumla"
    ]?.[1]?.[0] ||
    0;
  let afyaJumlaWiki = 0;
  let elimuJumlaWiki = 0;
  let mazingiraJumlaWiki = 0;
  let computedBalance = false;
  let kiasiChaJamii =
    Math.floor(states?.kikundiData?.["Kiasi cha fedha cha jamii"]) || 1000;
  let thamaniYaHisa = Math.floor(
    states?.kikundiData?.["Thamani ya Hisa ya Kikundi"]
  );
  let nextMonthSalioAnzia = 0;
  let jumlaYaWiki = [];
  let cumulative_jumla = {};
  let siku_mtu_hajatoa =
    {
      ...lejaYaMfukoWaJamiiPrevWeeks[(week - 1).toString()]?.[
        "Siku Mtu Hajatoa"
      ],
    } || {};

  let salioAnziaFields = [];
  if (TimelineMap.hasOwnProperty(week + 1)) {
    //This means that it is after 4 weeks
    salioAnziaFields = ratio.map((value) => (value / 10) * salio_anzia);
    jumlaAmountPerMemberRequired = kiasiChaJamii * 4;
  } else {
    if (week === 1) {
      salioAnziaFields = ratio.map((value) => (value / 10) * salio_anzia);
    } else {
      salioAnziaFields = ratio.map((value) => (value / 10) * salio_anzia);
    }
  }

  console.log(lejaYaHisaFilled);

  const todayDate = moment().format("D/MM/YYYY");
  const [currMember, setCurrMember] = useState();
  const [membersFilled, setMembersFilled] = useState({});
  const [wanachamaShown, setWanachamaShown] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([
    ...idToNamesMapArray,
  ]);
  const fields = {
    namba: 0,
    salio_anzia: 1,
    kiasi: 2,
    afya: 3,
    elimu: 4,
    mazingira: 5,
  };

  useEffect(() => {
    let kiasiLeoObjCopy = {};
    membersIds?.forEach((id) => (kiasiLeoObjCopy[id] = [0, 0, 0]));
    setKiasiLeoObj({ ...kiasiLeoObjCopy });
  }, []);

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
    if (fieldName !== "namba" && isNaN(text)) {
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
      if (fieldName === "kiasi") {
        let kiasiNumber = Number(text);
        let kiasiLeoFields = ratio.map((value) => (value / 10) * kiasiNumber);
        let kiasiLeoObjData = { ...kiasiLeoObj };
        kiasiLeoObjData[index] = kiasiLeoFields;
        setKiasiLeoObj({ ...kiasiLeoObjData });
      }
    } else {
      let newData = [];
      newData[indexToPutText] = text;
      members_filled[index] = [...newData];
      setMembersFilled((prevState) => ({ ...members_filled }));
      if (fieldName === "kiasi") {
        let kiasiNumber = Number(text);
        let kiasiLeoFields = ratio.map((value) => (value / 10) * kiasiNumber);
        let kiasiLeoObjData = { ...kiasiLeoObj };
        kiasiLeoObjData[index] = kiasiLeoFields;
        setKiasiLeoObj({ ...kiasiLeoObjData });
      }
    }
  };

  console.log(membersFilled);

  const beforeMoveToNextForm = () => {
    //Check if there is not any member filled
    if (Object.keys(membersFilled).length === 0) {
      alert("Tafadhali jaza taarifa sahihi!");
      return;
    }

    //Sanitize the values received to get clean values
    for (let i = 0; i < Object.values(membersFilled).length; i++) {
      let key = Object.keys(membersFilled)[i];
      let memberArr = Object.values(membersFilled)[i];
      if (typeof memberArr[2] === "undefined") {
        alert(`Mwanachama ${key} hajajaziwa!Kama hajatoa tafadhali jaza 0 .`);
        return;
      }
      if (memberArr[2] === "" || /\s/.test(memberArr[2])) {
        alert(`Mwanachama ${key} hajajaziwa taarifa sahihi!.`);
        return;
      }
      if (typeof memberArr[1] === "undefined") {
        memberArr[1] = salio_anzia;
      }
      if (!isNaN(memberArr[2]) || !isNaN(memberArr[1])) {
        //Means that we havent replaced kiasi with [afya, elimu, mazingira]
        memberArr[2] = [...kiasiLeoObj[key]];
        memberArr[1] = [...salioAnziaFields];
      }
    }

    //Get last Weeks' cumulative amounts to compute cumulative amount for this week
    for (let i = 0; i < Object.keys(membersFilled).length; i++) {
      let key = Object.keys(membersFilled)[i];
      let kiasiChake = kiasiLeoObj[key].reduce((a, b) => a + b, 0);
      let [salioAnzia, ...lastWeekCumulative] = lejaYaMfukoWaJamiiPrevWeeks[
        week - 1
      ]?.["cumulativeJumla"]?.[key] || [0, 0, 0, 0];
      let thisWeekKiasi = [...kiasiLeoObj[key]];
      if (jumlaYaWiki.length !== 3) {
        afyaJumlaWiki += kiasiLeoObj[key][0];
        elimuJumlaWiki += kiasiLeoObj[key][1];
        mazingiraJumlaWiki += kiasiLeoObj[key][2];
      }
      let thisWeekCumulativeJumla = lastWeekCumulative.map((item, i) => {
        return item + thisWeekKiasi[i];
      });
      if (thisWeekCumulativeJumla.length === 3) {
        thisWeekCumulativeJumla = [salioAnzia, ...thisWeekCumulativeJumla];
      }
      cumulative_jumla[key] = thisWeekCumulativeJumla;
      if (kiasiChake < kiasiChaJamii && !computedBalance) {
        let balance = kiasiChaJamii - kiasiChake;
        let memberDaysUnpaidData = siku_mtu_hajatoa.hasOwnProperty(key)
          ? { ...siku_mtu_hajatoa[key] }
          : {};

        let daysNumber = memberDaysUnpaidData["days"] || 0;
        let balance_amount = memberDaysUnpaidData["balanceAmount"] || 0;
        memberDaysUnpaidData["days"] = daysNumber + 1;
        memberDaysUnpaidData["balanceAmount"] = balance_amount + balance;
        siku_mtu_hajatoa[key] = memberDaysUnpaidData;
      }
    }

    if (jumlaYaWiki.length !== 3) {
      jumlaYaWiki[0] = afyaJumlaWiki;
      jumlaYaWiki[1] = elimuJumlaWiki;
      jumlaYaWiki[2] = mazingiraJumlaWiki;
    }

    // console.log("New MembersFilledObj", membersFilled);
    // console.log("This Week Cumulative", cumulative_jumla);
    // console.log("DaysUnpaid", siku_mtu_hajatoa);
    // console.log("Jumla wiki", jumlaYaWiki);

    if (TimelineMap.hasOwnProperty(week + 1)) {
      //check if member has no KiasiChaJamii in Total
      for (let i = 0; i < Object.keys(cumulative_jumla).length; i++) {
        let memberKey = Object.keys(cumulative_jumla)[i];
        let [salioAnzia, ...onlyJamiiCumulative] = cumulative_jumla[memberKey];
        let memberMonthlyJumla = onlyJamiiCumulative.reduce((a, b) => a + b, 0);
        if (
          memberMonthlyJumla < jumlaAmountPerMemberRequired &&
          !computedBalance
        ) {
          let hisaOwnedByMember =
            lejaYaHisaFilled[week.toString()]["cumulativeJumla"][memberKey];
          let worthHisaOwnedByMember =
            Math.floor(hisaOwnedByMember) * thamaniYaHisa;
          worthHisaOwnedByMember =
            worthHisaOwnedByMember -
            (jumlaAmountPerMemberRequired - memberMonthlyJumla);
          lejaYaHisaFilled[week.toString()]["cumulativeJumla"][memberKey] =
            Math.trunc(worthHisaOwnedByMember / thamaniYaHisa);
          nextMonthSalioAnzia = salioAnzia + jumlaAmountPerMemberRequired;
        }
      }
      const thisWeeksData = {
        Tarehe: todayDate,
        0: [
          "Namba ya Mwanachama",
          ["Afya", "Elimu", "Mazingira"],
          ["Afya", "Elimu", "Mazingira"],
        ],
        ...membersFilled,
        jumlaYaWiki: jumlaYaWiki,
        cumulativeJumla: cumulative_jumla,
        "Siku Mtu Hajatoa": siku_mtu_hajatoa,
        "Salio Anzia Mwezi Ujao": nextMonthSalioAnzia,
      };

      lejaYaMfukoWaJamiiPrevWeeks[week] = thisWeeksData;
      // prevWeekData["LejaYaHisa"] = lejaYaHisaPrevWeek;
      // prevWeekData["LejaYaMfukoWaJamii"] = lejaYaMfukoWaJamiiPrevWeek;
      computedBalance = true;
    } else {
      const thisWeeksData = {
        tarehe: todayDate,
        0: [
          "Namba ya Mwanachama",
          ["Afya", "Elimu", "Mazingira"],
          ["Afya", "Elimu", "Mazingira"],
        ],
        ...membersFilled,
        jumlaYaWiki: jumlaYaWiki,
        cumulativeJumla: cumulative_jumla,
        "Siku Mtu Hajatoa": siku_mtu_hajatoa,
      };

      lejaYaMfukoWaJamiiPrevWeeks[week] = thisWeeksData;
      // prevWeekData["LejaYaMfukoWaJamii"] = lejaYaMfukoWaJamiiPrevWeek;
      computedBalance = true;
    }

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
      //   type: "SET_LEJA_MFUKO_FORM_STATE",
      //   data: { ...prevWeekData },
      // });
      let dataCopy = { ...data };
      dataCopy["LejaYaHisa"] = lejaYaHisaFilled;
      dataCopy["LejaYaMfukoWaJamii"] = lejaYaMfukoWaJamiiPrevWeeks;
      navigate("WAKOPAJI", { data: dataCopy });
    };
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
          {wanachamaShown?.map((item, index) => (
            <RenderFields
              key={`${index} ${item}`}
              item={item}
              setMemberSampleData={setMemberSampleData}
              deductFromMembersToShow={deductFromMembersToShow}
              week={Number(week)}
              kiasiLeoObj={kiasiLeoObj}
              salio_anzia={salio_anzia}
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

export default FormLejaMfuko;
