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
  jumlaZaWanachama,
}) => {
  let key = Object.keys(item)[0];
  key = Number(key);
  let name = item[key];
  let jumlaDataObj = jumlaZaWanachama[key];
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
        label="Jina la Mkopaji"
        placeholder={"Ingiza jina kamili la mkopaji"}
        value={jina}
        onChangeText={(text) => {
          setJina(text);
        }}
        editable={false}
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
        label="Jumla"
        placeholder={"Weka Jumla"}
        value={jumlaDataObj.jumla.toString()}
        onChangeText={(text) => setMemberSampleData(text, key, "jumla")}
        isNumber={true}
        editable={false}
      />
    </>
  );
};

const FormWakopaji = ({ route, navigation: { navigate } }) => {
  const todayDate = moment().format("D/MM/YYYY");
  const { states, dispatch } = useContext(KatibuTasksContexts);
  const week = Number(states.weekNumber);
  const data = route.params?.data;
  const lejaYaMfukoWaJamiiFilled = data?.LejaYaMfukoWaJamii;
  const prevWeekData = { ...states.prevWeekData, weekNumber: Number(week) };
  const wakopajiPrevWeeks = { ...prevWeekData.WakopajiNaMarejesho };
  const idToNamesMapArray = [];

  //Filter Wanachama without Madeni Only
  // const prevWeekWakopajiData = { ...wakopajiPrevWeeks[week - 1] };
  let jumlaZaWanachamaCopy = {};
  let computedJumlaWiki = false;
  let ribaTotal = 0;
  let bimaTotal = 0;
  const prevWeekWakopajiData = {
    1: ["Muka Bidu", "8/01/2023", 0, 5, 5000],
    2: ["Maisha Ally", "8/01/2023", 50000, 5, 5000],
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
    if (!(memberData[2] > 0)) {
      jumlaZaWanachamaCopy[id] = {};
      obj[id] = membersNames[i];
      idToNamesMapArray.push(obj);
    }
  }

  const [jumlaZaWanachama, setJumlaZaWanachama] = useState({});
  const [currMember, setCurrMember] = useState();
  const [membersFilled, setMembersFilled] = useState({});
  const [wanachamaShown, setWanachamaShown] = useState([]);
  const [dropdownOptions, setDropdownOptions] = useState([
    ...idToNamesMapArray,
  ]);
  const fields = {
    jina: 0,
    kiasi: 1,
    riba: 2,
    bima: 3,
    jumla: 4,
    maelezo: 5,
  };

  useEffect(() => {
    if (idToNamesMapArray.length > 0) {
      idToNamesMapArray?.forEach((item) => {
        let id = Object.keys(item)[0];
        jumlaZaWanachamaCopy[id] = { kiasi: 0, riba: 0, bima: 0, jumla: 0 };
      });
      setJumlaZaWanachama({ ...jumlaZaWanachamaCopy });
    }
  }, []);

  console.log(jumlaZaWanachama);

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
    let jumlaZaWanachamaFilled = { ...jumlaZaWanachama };
    jumlaZaWanachamaFilled[index] = { kiasi: 0, riba: 0, bima: 0, jumla: 0 };
    let { [index]: deleted, ...remMembersFilled } = membersFilled;
    setWanachamaShown(remArrIndexes);
    setMembersFilled({ ...remMembersFilled });
    setDropdownOptions(remOptions);
    setJumlaZaWanachama({ ...jumlaZaWanachamaFilled });
  };

  //Updating values per each member filled
  const setMemberSampleData = (text, index, fieldName) => {
    if (fieldName !== "jina" && isNaN(text)) {
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
      if (fieldName === "kiasi") {
        let jumlaZaWanachamaObjData = { ...jumlaZaWanachama };
        let jumlaZaMwanachamaObjData = {
          ...jumlaZaWanachama[index.toString()],
        };
        let kiasiNumber = Number(text);
        let bima = jumlaZaMwanachamaObjData?.["bima"];
        let riba = jumlaZaMwanachamaObjData?.["riba"];
        let amountRibaToAdd = (riba / 100) * kiasiNumber;
        let totalSum = kiasiNumber + amountRibaToAdd + bima;
        jumlaZaMwanachamaObjData["kiasi"] = kiasiNumber;
        jumlaZaMwanachamaObjData["jumla"] = totalSum;
        jumlaZaWanachamaObjData[index] = jumlaZaMwanachamaObjData;
        setJumlaZaWanachama({ ...jumlaZaWanachamaObjData });
      }
      if (fieldName === "riba") {
        let jumlaZaWanachamaObjData = { ...jumlaZaWanachama };
        let jumlaZaMwanachamaObjData = {
          ...jumlaZaWanachama[index.toString()],
        };
        let ribaNumber = Number(text);
        let bima = jumlaZaMwanachamaObjData?.["bima"];
        let kiasi = jumlaZaMwanachamaObjData?.["kiasi"];
        let amountRibaToAdd = (ribaNumber / 100) * kiasi;
        let totalSum = kiasi + amountRibaToAdd + bima;
        jumlaZaMwanachamaObjData["riba"] = ribaNumber;
        jumlaZaMwanachamaObjData["jumla"] = totalSum;
        jumlaZaWanachamaObjData[index] = jumlaZaMwanachamaObjData;
        setJumlaZaWanachama({ ...jumlaZaWanachamaObjData });
      }
      if (fieldName === "bima") {
        let jumlaZaWanachamaObjData = { ...jumlaZaWanachama };
        let jumlaZaMwanachamaObjData = {
          ...jumlaZaWanachama[index.toString()],
        };
        let bimaNumber = Number(text);
        let kiasi = jumlaZaMwanachamaObjData?.["kiasi"];
        let riba = jumlaZaMwanachamaObjData?.["riba"];
        let amountRibaToAdd = (riba / 100) * kiasi;
        let totalSum = kiasi + amountRibaToAdd + bimaNumber;
        jumlaZaMwanachamaObjData["bima"] = bimaNumber;
        jumlaZaMwanachamaObjData["jumla"] = totalSum;
        jumlaZaWanachamaObjData[index] = jumlaZaMwanachamaObjData;
        setJumlaZaWanachama({ ...jumlaZaWanachamaObjData });
      }
    } else {
      let newData = [];
      let indexToPutText = fields[fieldName];
      newData[indexToPutText] = text;
      members_filled[index] = [...newData];
      setMembersFilled((prevState) => ({ ...members_filled }));
      if (fieldName === "kiasi") {
        let jumlaZaWanachamaObjData = { ...jumlaZaWanachama };
        let jumlaZaMwanachamaObjData = {
          ...jumlaZaWanachama[index.toString()],
        };
        let kiasiNumber = Number(text);
        let bima = jumlaZaMwanachamaObjData?.["bima"];
        let riba = jumlaZaMwanachamaObjData?.["riba"];
        let amountRibaToAdd = (riba / 100) * kiasiNumber;
        let totalSum = kiasiNumber + amountRibaToAdd + bima;
        jumlaZaMwanachamaObjData["kiasi"] = kiasiNumber;
        jumlaZaMwanachamaObjData["jumla"] = totalSum;
        jumlaZaWanachamaObjData[index] = jumlaZaMwanachamaObjData;
        setJumlaZaWanachama({ ...jumlaZaWanachamaObjData });
      }
      if (fieldName === "riba") {
        let jumlaZaWanachamaObjData = { ...jumlaZaWanachama };
        let jumlaZaMwanachamaObjData = {
          ...jumlaZaWanachama[index.toString()],
        };
        let ribaNumber = Number(text);
        let bima = jumlaZaMwanachamaObjData?.["bima"];
        let kiasi = jumlaZaMwanachamaObjData?.["kiasi"];
        let amountRibaToAdd = (ribaNumber / 100) * kiasi;
        let totalSum = kiasi + amountRibaToAdd + bima;
        jumlaZaMwanachamaObjData["riba"] = ribaNumber;
        jumlaZaMwanachamaObjData["jumla"] = totalSum;
        jumlaZaWanachamaObjData[index] = jumlaZaMwanachamaObjData;
        setJumlaZaWanachama({ ...jumlaZaWanachamaObjData });
      }
      if (fieldName === "bima") {
        let jumlaZaWanachamaObjData = { ...jumlaZaWanachama };
        let jumlaZaMwanachamaObjData = {
          ...jumlaZaWanachama[index.toString()],
        };
        let bimaNumber = Number(text);
        let kiasi = jumlaZaMwanachamaObjData?.["kiasi"];
        let riba = jumlaZaMwanachamaObjData?.["riba"];
        let amountRibaToAdd = (riba / 100) * kiasi;
        let totalSum = kiasi + amountRibaToAdd + bimaNumber;
        jumlaZaMwanachamaObjData["bima"] = bimaNumber;
        jumlaZaMwanachamaObjData["jumla"] = totalSum;
        jumlaZaWanachamaObjData[index] = jumlaZaMwanachamaObjData;
        setJumlaZaWanachama({ ...jumlaZaWanachamaObjData });
      }
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
              navigate("MAREJESHO", { data: {} });
            },
          },
        ]
      );
    } else {
      //Sanitize the values received to get clean values
      for (let i = 0; i < Object.values(membersFilled).length; i++) {
        let memberArr = Object.values(membersFilled)[i];
        if (
          typeof memberArr[1] === "undefined" ||
          typeof memberArr[2] === "undefined" ||
          typeof memberArr[3] === "undefined"
        ) {
          alert(
            `Mwanachama ${memberArr[0]} hajajaziwa kiasi au riba au bima. Tafadhali jaza taarifa sahihi.`
          );
          return;
        }

        if (
          memberArr[1] === "" ||
          /\s/.test(memberArr[1]) ||
          memberArr[2] === "" ||
          /\s/.test(memberArr[2]) ||
          memberArr[3] === "" ||
          /\s/.test(memberArr[3])
        ) {
          alert(
            `Tafadhali jaza taarifa sahihi kwa Mwanachama ${memberArr[0]}.`
          );
          return;
        }
        if (memberArr[1] === 0) {
          alert(
            `Kiasi cha mkopo cha ${memberArr[0]} hakiwezi kikawa 0. Kama hakopi usimuongeze kwenye orodha!.`
          );
          return;
        }
      }

      //Structure data as the way they are going to be stored in firebase.
      for (let i = 0; i < Object.keys(membersFilled).length; i++) {
        let key = Object.keys(membersFilled)[i];
        let memberArr = membersFilled[key];
        if (memberArr.length !== 12) {
          memberArr.splice(1, 0, todayDate);
          memberArr.splice(
            5,
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            jumlaZaWanachama[key]["jumla"],
            ""
          );
        }
      }

      for (let i = 0; i < Object.keys(membersFilled).length; i++) {
        let key = Object.keys(membersFilled)[i];
        let memberArr = membersFilled[key];
        if (!computedJumlaWiki) {
          ribaTotal += Number(memberArr[3]);
          bimaTotal += Number(memberArr[4]);
        }
      }

      computedJumlaWiki = true;

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
        ...membersFilled,
        jumlaYaWiki: { riba: ribaTotal, bima: bimaTotal },
      };

      wakopajiPrevWeeks[week] = thisWeeksData;

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
        dataCopy["FomuYaWakopaji"] = wakopajiPrevWeeks;
        navigate("MAREJESHO", { data: dataCopy });
      };
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
        <FormsHeader title={"Fomu Ya Wakopaji"} subTitle={"Fomu ya wakopaji"} />
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
              jumlaZaWanachama={jumlaZaWanachama}
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

export default FormWakopaji;
