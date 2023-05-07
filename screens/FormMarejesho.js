import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import { CustomInput, FormsHeader, FormsDropDown } from "../components";
import { SIZES, COLORS } from "../constants";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/AntDesign";
import Iconz from "react-native-vector-icons/MaterialIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { KatibuTasksContexts } from "../context/KatibuTasksProvider";
import moment from "moment/moment";
import { intervalToDuration } from "date-fns";

const RenderFields = ({
  item,
  setMemberSampleData,
  deductFromMembersToShow,
  prevWeeksWakopajiData,
  todayDate,
  wanachamaMikopoPaymentData,
}) => {
  let key = Object.keys(item)[0];
  key = Number(key);
  let name = item[key];
  const [jina, setJina] = useState(name);

  let memberData = [...prevWeeksWakopajiData[key]];
  let getDaysSinceDebtDate = (startDate, todayDate) => {
    var startDateArray = startDate.split("/");
    var todayDateArray = todayDate.split("/");
    var a = new Date(
      Math.floor(startDateArray[2]),
      Math.floor(startDateArray[1]),
      Math.floor(startDateArray[0])
    );
    var b = new Date(
      Math.floor(todayDateArray[2]),
      Math.floor(todayDateArray[1]),
      Math.floor(todayDateArray[0])
    );
    // var days = (b - a) / (60 * 60 * 24 * 1000);
    let duration = intervalToDuration({
      start: a,
      end: b,
    });

    // Determine the duration in month we still in
    if (duration["months"] > 0 && duration["days"] === 0) {
      isEndOfPeriod = true;
      return [duration["months"], duration["days"]];
    } else {
      return [duration["months"] + 1, duration["days"]];
    }
  };

  let [debtDurationMonths, debtDurationDays] = getDaysSinceDebtDate(
    memberData[1],
    todayDate
  );
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
        label="Jina la Mkopaji"
        placeholder={"Ingiza jina kamili la mkopaji"}
        value={jina}
        onChangeText={(text) => {
          setJina(text);
        }}
        editable={false}
      />
      <CustomInput
        icon={<Iconz name="date-range" size={25} color={COLORS.primary} />}
        label="Tarehe Ya Mkopo"
        placeholder={"Andika tarehe"}
        value={memberData[1]}
        editable={false}
        isNumber={true}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Kiasi cha Mkopo"
        placeholder={"Ingiza kiasi cha mkopo"}
        value={memberData[2].toString()}
        isNumber={true}
        editable={false}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Riba"
        placeholder={"Ingiza riba"}
        value={memberData[3].toString()}
        isNumber={true}
        editable={false}
      />
      {(debtDurationMonths === 3 || debtDurationMonths === 6) && (
        <CustomInput
          icon={
            <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
          }
          label="Ongezeko la Riba"
          placeholder={"Ingiza riba"}
          onChangeText={(text) => setMemberSampleData(text, key, "riba")}
          isNumber={true}
        />
      )}
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Bima"
        placeholder={"Ingiza Bima"}
        value={memberData[4].toString()}
        isNumber={true}
        editable={false}
      />
      {debtDurationMonths === 1 && (
        <CustomInput
          icon={
            <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
          }
          label="1"
          placeholder={"Ingiza 1"}
          onChangeText={(text) => setMemberSampleData(text, key, 1)}
          isNumber={true}
        />
      )}
      {debtDurationMonths > 1 && (
        <CustomInput
          icon={
            <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
          }
          label="1"
          placeholder={"Ingiza 1"}
          value={memberData[5].toString()}
          isNumber={true}
          editable={false}
        />
      )}
      {debtDurationMonths === 2 && (
        <CustomInput
          icon={
            <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
          }
          label="2"
          placeholder={"Ingiza 2"}
          onChangeText={(text) => setMemberSampleData(text, key, 2)}
          isNumber={true}
        />
      )}
      {debtDurationMonths > 2 && (
        <CustomInput
          icon={
            <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
          }
          label="2"
          value={memberData[6].toString()}
          placeholder={"Ingiza 2"}
          isNumber={true}
          editable={false}
        />
      )}
      {debtDurationMonths === 3 && (
        <CustomInput
          icon={
            <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
          }
          label="3"
          placeholder={"Ingiza 3"}
          onChangeText={(text) => setMemberSampleData(text, key, 3)}
          isNumber={true}
        />
      )}
      {debtDurationMonths > 3 && (
        <CustomInput
          icon={
            <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
          }
          label="3"
          value={memberData[7].toString()}
          placeholder={"Ingiza 3"}
          isNumber={true}
          editable={false}
        />
      )}
      {debtDurationMonths === 4 && (
        <CustomInput
          icon={
            <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
          }
          label="4"
          placeholder={"Ingiza 4"}
          onChangeText={(text) => setMemberSampleData(text, key, 4)}
          isNumber={true}
        />
      )}
      {debtDurationMonths > 4 && (
        <CustomInput
          icon={
            <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
          }
          label="4"
          value={memberData[8].toString()}
          placeholder={"Ingiza 4"}
          isNumber={true}
          editable={false}
        />
      )}
      {debtDurationMonths === 5 && (
        <CustomInput
          icon={
            <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
          }
          label="5"
          placeholder={"Ingiza 5"}
          onChangeText={(text) => setMemberSampleData(text, key, 5)}
          isNumber={true}
        />
      )}
      {debtDurationMonths > 5 && (
        <CustomInput
          icon={
            <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
          }
          label="5"
          value={memberData[9].toString()}
          placeholder={"Ingiza 5"}
          isNumber={true}
          editable={false}
        />
      )}
      {debtDurationMonths === 6 && (
        <CustomInput
          icon={
            <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
          }
          label="6"
          placeholder={"Ingiza 6"}
          onChangeText={(text) => setMemberSampleData(text, key, 6)}
          isNumber={true}
        />
      )}
      {debtDurationMonths > 6 && (
        <CustomInput
          icon={
            <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
          }
          label="6"
          value={memberData[10].toString()}
          placeholder={"Ingiza 6"}
          isNumber={true}
          editable={false}
        />
      )}
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Jumla ya marejesho mpaka sasa"
        placeholder={"Weka Jumla"}
        value={wanachamaMikopoPaymentData[key][7].toString()}
        isNumber={true}
        editable={false}
      />
      <CustomInput
        icon={<Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />}
        label="Jumla baada ya marejesho"
        placeholder={"Weka Jumla"}
        value={wanachamaMikopoPaymentData[key][8].toString()}
        onChangeText={(text) => setMemberSampleData(text, key, "jumla")}
        isNumber={true}
        editable={false}
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

const FormMarejesho = ({ route, navigation: { navigate } }) => {
  const todayDate = moment().format("D/MM/YYYY");
  const { states, dispatch } = useContext(KatibuTasksContexts);
  const week = Number(states.weekNumber);
  const data = route.params?.data;
  const fomuYaWakopaji = data?.FomuYaWakopaji;
  const prevWeekData = { ...states.prevWeekData, weekNumber: Number(week) };
  const WakopajiNaMarejeshoPrevWeeks = { ...prevWeekData.WakopajiNaMarejesho };
  const idToNamesMapArray = [];
  const [wanachamaMikopoPaymentData, setWanachamaMikopoPaymentData] = useState(
    {}
  );

  //Get Last Week's data we need.
  //Filter Wanachama without Madeni Only
  // const prevWeekWakopajiData = { ...marejeshoPrevWeeks[week - 1] };
  const prevWeekWakopajiData = {
    2: [
      "Maisha Ally",
      "8/02/2023",
      50000,
      5,
      5000,
      10000,
      0,
      0,
      0,
      0,
      0,
      47500,
      "Amemaliza",
    ],
  };

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
    let memberData = prevWeekWakopajiData[id] || [];
    if (memberData[2] > 0) {
      obj[id] = membersNames[i];
      idToNamesMapArray.push(obj);
    }
  }

  //Get days difference between two dates
  let isEndOfPeriod = false;
  let memberMkopoPaymentDataNonState = [];
  let wanachamaMikopoPaymentDataCopyNonState = {
    ...wanachamaMikopoPaymentData,
  };
  idToNamesMapArray?.forEach((item) => {
    let id = Object.keys(item)[0];
    memberMkopoPaymentDataNonState[0] = prevWeekWakopajiData[id]?.[3] || 0;
    memberMkopoPaymentDataNonState[1] = prevWeekWakopajiData[id]?.[5] || 0;
    memberMkopoPaymentDataNonState[2] = prevWeekWakopajiData[id]?.[6] || 0;
    memberMkopoPaymentDataNonState[3] = prevWeekWakopajiData[id]?.[7] || 0;
    memberMkopoPaymentDataNonState[4] = prevWeekWakopajiData[id]?.[8] || 0;
    memberMkopoPaymentDataNonState[5] = prevWeekWakopajiData[id]?.[9] || 0;
    memberMkopoPaymentDataNonState[6] = prevWeekWakopajiData[id]?.[10] || 0;
    memberMkopoPaymentDataNonState[7] =
      memberMkopoPaymentDataNonState[1] +
      memberMkopoPaymentDataNonState[2] +
      memberMkopoPaymentDataNonState[3] +
      memberMkopoPaymentDataNonState[4] +
      memberMkopoPaymentDataNonState[5] +
      memberMkopoPaymentDataNonState[6];
    memberMkopoPaymentDataNonState[8] = prevWeekWakopajiData[id]?.[11] || 0;
    memberMkopoPaymentDataNonState[9] = prevWeekWakopajiData[id]?.[12] || "";
    wanachamaMikopoPaymentDataCopyNonState[id] = memberMkopoPaymentDataNonState;
  });

  // console.log(wakopajiTareheZaMikopo);
  // console.log("Wakooppaijaid moitnhs", wakopajiDebtPeriods);
  // console.log("Non state", wanachamaMikopoPaymentDataCopyNonState);
  console.log(fomuYaWakopaji);

  const [currMember, setCurrMember] = useState();
  const [membersFilled, setMembersFilled] = useState({});
  const [wanachamaShown, setWanachamaShown] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([
    ...idToNamesMapArray,
  ]);
  const fields = {
    jina: 0,
    riba: 1,
    maelezo: 2,
  };

  useEffect(() => {
    if (idToNamesMapArray.length > 0) {
      let memberMkopoPaymentData = [];
      let wanachamaMikopoPaymentDataCopy = { ...wanachamaMikopoPaymentData };
      idToNamesMapArray?.forEach((item) => {
        let id = Object.keys(item)[0];
        memberMkopoPaymentData[0] = prevWeekWakopajiData[id]?.[3] || 0;
        memberMkopoPaymentData[1] = prevWeekWakopajiData[id]?.[5] || 0;
        memberMkopoPaymentData[2] = prevWeekWakopajiData[id]?.[6] || 0;
        memberMkopoPaymentData[3] = prevWeekWakopajiData[id]?.[7] || 0;
        memberMkopoPaymentData[4] = prevWeekWakopajiData[id]?.[8] || 0;
        memberMkopoPaymentData[5] = prevWeekWakopajiData[id]?.[9] || 0;
        memberMkopoPaymentData[6] = prevWeekWakopajiData[id]?.[10] || 0;
        memberMkopoPaymentData[7] =
          memberMkopoPaymentData[1] +
          memberMkopoPaymentData[2] +
          memberMkopoPaymentData[3] +
          memberMkopoPaymentData[4] +
          memberMkopoPaymentData[5] +
          memberMkopoPaymentData[6];
        memberMkopoPaymentData[8] = prevWeekWakopajiData[id]?.[11] || 0;
        memberMkopoPaymentData[9] = prevWeekWakopajiData[id]?.[12] || "";
        wanachamaMikopoPaymentDataCopy[id] = memberMkopoPaymentData;
      });
      setWanachamaMikopoPaymentData({ ...wanachamaMikopoPaymentDataCopy });
    }
  }, []);

  console.log(wanachamaMikopoPaymentData);

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
    if (fieldName !== "jina" && fieldName !== "maelezo" && isNaN(text)) {
      alert("Tafadhali ingiza tarakimu!");
      return;
    }
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
      //Updating wanachamapayment data
      if (fieldName !== "jina" && fieldName !== "maelezo") {
        // wanachamaMikopoPaymentDataCopyNonState
        let wanachamaMikopoPaymentDataCopy = { ...wanachamaMikopoPaymentData };
        let mwanachamaMikopoPaymentData = [
          ...wanachamaMikopoPaymentDataCopy[index],
        ];
        let ribaIliyokuwepo = wanachamaMikopoPaymentDataCopyNonState[index][0];
        let kiasiChaMkopo = wanachamaMikopoPaymentDataCopyNonState[index][8];
        let totalMweziHuu = 0;
        if (fieldName === "riba") {
          let ribaMpya = Number(text);
          let amountRibaMpyaToAdd = (ribaMpya / 100) * kiasiChaMkopo;
          kiasiChaMkopo = kiasiChaMkopo + amountRibaMpyaToAdd;
          mwanachamaMikopoPaymentData[0] = ribaMpya + ribaIliyokuwepo;
        } else {
          let rejeshoLeo = Number(text);
          let mweziHuu =
            wanachamaMikopoPaymentDataCopyNonState[index][fieldName];
          totalMweziHuu = rejeshoLeo + mweziHuu;
        }
        let jumlaYaMarejesho =
          wanachamaMikopoPaymentDataCopyNonState[index][7] + totalMweziHuu;
        let jumlaBaadaYaMarejesho = kiasiChaMkopo - jumlaYaMarejesho;
        mwanachamaMikopoPaymentData[fieldName] = totalMweziHuu;
        mwanachamaMikopoPaymentData[7] = jumlaYaMarejesho;
        mwanachamaMikopoPaymentData[8] = jumlaBaadaYaMarejesho;
        wanachamaMikopoPaymentDataCopy[index] = mwanachamaMikopoPaymentData;
        setWanachamaMikopoPaymentData({ ...wanachamaMikopoPaymentDataCopy });
      }
      if (fieldName === "maelezo") {
        let maelezo = text;
        let wanachamaMikopoPaymentDataCopy = { ...wanachamaMikopoPaymentData };
        let mwanachamaMikopoPaymentData = [
          ...wanachamaMikopoPaymentDataCopy[index],
        ];
        mwanachamaMikopoPaymentData[9] = maelezo;
        wanachamaMikopoPaymentDataCopy[index] = mwanachamaMikopoPaymentData;
        setWanachamaMikopoPaymentData({ ...wanachamaMikopoPaymentDataCopy });
      }
      // if (fieldName === "riba") {
      //   // wanachamaMikopoPaymentDataCopyNonState
      //   let wanachamaMikopoPaymentDataCopy = { ...wanachamaMikopoPaymentData };
      //   let mwanachamaMikopoPaymentData = [
      //     ...wanachamaMikopoPaymentDataCopy[index],
      //   ];
      //   let ribaMpya = Number(text);
      //   let ribaIliyokuwepo = wanachamaMikopoPaymentDataCopyNonState[index][0];
      //   let kiasiChaMkopo = wanachamaMikopoPaymentDataCopyNonState[index][8];
      //   let amountRibaMpyaToAdd = (ribaMpya / 100) * kiasiChaMkopo;
      //   let totalSum = kiasiChaMkopo + amountRibaMpyaToAdd;
      //   mwanachamaMikopoPaymentData[0] = ribaMpya + ribaIliyokuwepo;
      //   mwanachamaMikopoPaymentData[8] = totalSum;
      //   wanachamaMikopoPaymentDataCopy[index] = mwanachamaMikopoPaymentData;
      //   setWanachamaMikopoPaymentData({ ...wanachamaMikopoPaymentDataCopy });
      // }
    } else {
      let newData = [];
      let indexToPutText = fields[fieldName];
      newData[indexToPutText] = text;
      members_filled[index] = [...newData];
      setMembersFilled((prevState) => ({ ...members_filled }));
      //Updating wanachamapayment data
      if (fieldName !== "jina" && fieldName !== "maelezo") {
        // wanachamaMikopoPaymentDataCopyNonState
        let wanachamaMikopoPaymentDataCopy = { ...wanachamaMikopoPaymentData };
        let mwanachamaMikopoPaymentData = [
          ...wanachamaMikopoPaymentDataCopy[index],
        ];
        let ribaIliyokuwepo = wanachamaMikopoPaymentDataCopyNonState[index][0];
        let kiasiChaMkopo = wanachamaMikopoPaymentDataCopyNonState[index][8];
        let totalMweziHuu = 0;
        if (fieldName === "riba") {
          let ribaMpya = Number(text);
          let amountRibaMpyaToAdd = (ribaMpya / 100) * kiasiChaMkopo;
          kiasiChaMkopo = kiasiChaMkopo + amountRibaMpyaToAdd;
          mwanachamaMikopoPaymentData[0] = ribaMpya + ribaIliyokuwepo;
        } else {
          let rejeshoLeo = Number(text);
          let mweziHuu =
            wanachamaMikopoPaymentDataCopyNonState[index][fieldName];
          totalMweziHuu = rejeshoLeo + mweziHuu;
        }
        let jumlaYaMarejesho =
          wanachamaMikopoPaymentDataCopyNonState[index][7] + totalMweziHuu;
        let jumlaBaadaYaMarejesho = kiasiChaMkopo - jumlaYaMarejesho;
        mwanachamaMikopoPaymentData[fieldName] = totalMweziHuu;
        mwanachamaMikopoPaymentData[7] = jumlaYaMarejesho;
        mwanachamaMikopoPaymentData[8] = jumlaBaadaYaMarejesho;
        wanachamaMikopoPaymentDataCopy[index] = mwanachamaMikopoPaymentData;
        setWanachamaMikopoPaymentData({ ...wanachamaMikopoPaymentDataCopy });
      }
      if (fieldName === "maelezo") {
        let maelezo = text;
        let wanachamaMikopoPaymentDataCopy = { ...wanachamaMikopoPaymentData };
        let mwanachamaMikopoPaymentData = [
          ...wanachamaMikopoPaymentDataCopy[index],
        ];
        mwanachamaMikopoPaymentData[9] = maelezo;
        wanachamaMikopoPaymentDataCopy[index] = mwanachamaMikopoPaymentData;
        setWanachamaMikopoPaymentData({ ...wanachamaMikopoPaymentDataCopy });
      }
      // if (fieldName === "riba") {
      //   // wanachamaMikopoPaymentDataCopyNonState
      //   let wanachamaMikopoPaymentDataCopy = { ...wanachamaMikopoPaymentData };
      //   let mwanachamaMikopoPaymentData = [
      //     ...wanachamaMikopoPaymentDataCopy[index],
      //   ];
      //   let ribaMpya = Number(text);
      //   let ribaIliyokuwepo = wanachamaMikopoPaymentDataCopyNonState[index][0];
      //   let kiasiChaMkopo = wanachamaMikopoPaymentDataCopyNonState[index][8];
      //   let amountRibaMpyaToAdd = (ribaMpya / 100) * kiasiChaMkopo;
      //   let totalSum = kiasiChaMkopo + amountRibaMpyaToAdd;
      //   mwanachamaMikopoPaymentData[0] = ribaMpya + ribaIliyokuwepo;
      //   mwanachamaMikopoPaymentData[8] = totalSum;
      //   wanachamaMikopoPaymentDataCopy[index] = mwanachamaMikopoPaymentData;
      //   setWanachamaMikopoPaymentData({ ...wanachamaMikopoPaymentDataCopy });
      // }
    }
  };

  console.log(membersFilled);

  const beforeMoveToNextForm = () => {
    if (
      idToNamesMapArray.length === 0 ||
      (idToNamesMapArray.length > 0 && Object.keys(membersFilled).length === 0)
    ) {
      Alert.alert(
        "Uhakiki",
        "Kwa kukubali kwenda fomu nyingine, mfumo utachukulia kwamba hakuna wakopaji siku ya leo?",
        [
          { text: "Hapana", onPress: () => {} },
          {
            text: "Ndiyo",
            onPress: () => {
              navigate("SHUGHULI ZA WIKI", { data: {} });
            },
          },
        ]
      );
    } else {
      const memberDataToSubmit = {};
      for (let i = 0; i < Object.keys(membersFilled).length; i++) {
        let key = Object.keys(membersFilled)[i];
        let mwanachamaData = [...prevWeekWakopajiData[key]];
        let mwanachamaFilledData = [...wanachamaMikopoPaymentData[key]];
        mwanachamaData[3] = mwanachamaFilledData[0];
        mwanachamaData[5] = mwanachamaFilledData[1];
        mwanachamaData[6] = mwanachamaFilledData[2];
        mwanachamaData[7] = mwanachamaFilledData[2];
        mwanachamaData[8] = mwanachamaFilledData[4];
        mwanachamaData[9] = mwanachamaFilledData[5];
        mwanachamaData[10] = mwanachamaFilledData[6];
        mwanachamaData[11] = mwanachamaFilledData[8];
        mwanachamaData[12] = mwanachamaFilledData[9];
        memberDataToSubmit[key] = mwanachamaData;
      }

      console.log(memberDataToSubmit);

      const { 0: tableHeaders, ...newWakopaji } = fomuYaWakopaji[week];

      const thisWeeksData = {
        0: [
          "Jina la Mwanachama",
          "Tarehe Ya Mkopo",
          "Kiasi Cha Mkopo",
          "Riba",
          " Bima",
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
        ...newWakopaji,
      };

      // console.log(thisWeeksData);
      WakopajiNaMarejeshoPrevWeeks[week] = thisWeeksData;

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
        let dataCopy = { ...data };
        dataCopy["WakopajiNaMarejesho"] = WakopajiNaMarejeshoPrevWeeks;
        navigate("SHUGHULI ZA WIKI", { data: dataCopy });
      };
    }

    //   setLoading(true);
    //   submitFormData(
    //     "FormDocs",
    //     katibuEmail,
    //     "Fomu ya Wakopaji na Marejesho",
    //     docName,
    //     weekNumber,
    //     formData
    //   )
    //     .then(() => {
    //       setLoading(false);
    //       alert("Umefanikiwa Kukusanya Taarifa.");
    //       dispatch({
    //         type: "SET_WAKOPAJI_FORM_STATE",
    //         data: { ...memberDataToSubmit },
    //         forms_filled: [...states.formsFilled, "wakopaji"],
    //       });
    //     })
    //     .catch((e) => {
    //       setLoading(false);
    //       alert(e.message);
    //     });
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
          title={"Fomu Ya Marejesho"}
          subTitle={"Fomu ya marejesho"}
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
            label="Tarehe "
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
              prevWeeksWakopajiData={prevWeekWakopajiData}
              todayDate={todayDate}
              wanachamaMikopoPaymentData={wanachamaMikopoPaymentData}
              wanachamaMikopoPaymentDataCopyNonState={
                wanachamaMikopoPaymentDataCopyNonState
              }
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

export default FormMarejesho;
