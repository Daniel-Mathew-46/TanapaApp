import {
  View,
  ActivityIndicator,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import React, { useState, useContext } from "react";
import { FormsHeader, AttendanceRadioComponent } from "../components";
import { SIZES, COLORS } from "../constants";
import { ScrollView } from "react-native";
import { KatibuTasksContexts } from "../context/KatibuTasksProvider";
import moment from "moment/moment";
import { TimelineMap } from "../constants/timeline";

const FormMahudhurio = ({ route, navigation: { navigate } }) => {
  const { states, dispatch } = useContext(KatibuTasksContexts);
  const week = Number(states.weekNumber);
  const prevWeekData = { ...states.prevWeekData, weekNumber: Number(week) };
  const kadiYaMahudhurioPrevWeek = { ...prevWeekData.KadiYaMahudhurio };
  let todayDate = moment().format("D/MM/YYYY");
  const membersNames =
    states?.members?.length > 0
      ? states?.members?.map((item) => item["Jina la Mwanachama"])
      : [];
  const mahudhurioArray = states?.members ? [] : [];
  const formData = {};

  // console.log(week);
  console.log(kadiYaMahudhurioPrevWeek);

  const populateMahudhurio = (value, index) => {
    mahudhurioArray[index] = value || "Hapana";
  };

  const beforeMoveToNextForm = () => {
    if (mahudhurioArray.length === 0) {
      alert("Tafadhali jaza taarifa sahihi!");
      return;
    }
    for (i = 0; i < states?.members?.length; i++) {
      let jina = membersNames[i];
      let jibu = mahudhurioArray[i];
      formData[jina] = jibu;
    }
    for (let i = 0; i < Object.keys(formData).length; i++) {
      let jina = Object.keys(formData)[i];
      let mahudhurioYake = formData[jina];
      if (typeof mahudhurioYake === "undefined") {
        alert(`${jina} hajajazwa!`);
        return;
      }
    }

    // setformdata(formData);
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
      const namesToGenderMapArray = [];
      const membersGenders =
        states?.members?.length > 0
          ? states.members.map((item) => item["Jinsia"])
          : [];

      const membersNames =
        states?.members?.length > 0
          ? states.members.map((item) => item["Jina la Mwanachama"])
          : [];

      for (let i = 0; i < states?.members?.length; i++) {
        let obj = {};
        let name = membersNames[i];
        obj[name] = membersGenders[i];
        namesToGenderMapArray.push(obj);
      }

      let cumulativeWake =
        kadiYaMahudhurioPrevWeek[week - 1]?.["cumulativeJumla"]?.[0] || 0;
      let cumulativeWaume =
        kadiYaMahudhurioPrevWeek[week - 1]?.["cumulativeJumla"]?.[1] || 0;
      let wake = 0;
      let waume = 0;

      if (Object.keys(formData).length !== 0) {
        namesToGenderMapArray.forEach((member) => {
          let name = Object.keys(member)[0];
          let gender = member[name];

          if (gender === "Me" && formData[name] == "Ndiyo") waume += 1;

          if (gender === "Ke" && formData[name] == "Ndiyo") wake += 1;
        });
      }
      let mahudhurio_jumla = wake + waume;
      let cumulativeJumla = cumulativeWake + cumulativeWaume;
      let thisWeeksData = {};
      thisWeeksData["Tarehe"] = todayDate;
      thisWeeksData["mahudhurio"] = { ...formData };
      thisWeeksData["mahudhurioJumla"] = [waume, wake, mahudhurio_jumla];
      let cumulativeJumlaArray = [
        cumulativeWaume + waume,
        cumulativeWake + wake,
        cumulativeJumla + mahudhurio_jumla,
      ];

      if (TimelineMap.hasOwnProperty(week + 1)) {
        let mwezi = TimelineMap[week];
        thisWeeksData["cumulativeJumla"] = [...cumulativeJumlaArray];
        thisWeeksData[mwezi] = [...cumulativeJumlaArray];
        kadiYaMahudhurioPrevWeek[week] = thisWeeksData;
      } else {
        thisWeeksData["cumulativeJumla"] = [...cumulativeJumlaArray];
        kadiYaMahudhurioPrevWeek[week] = thisWeeksData;
      }
      // prevWeekData["KadiYaMahudhurio"] = kadiYaMahudhurioPrevWeek;
      console.log(kadiYaMahudhurioPrevWeek);
      dispatch({
        type: "SET_MAHUDHURIO_FORM_STATE",
        data: { ...prevWeekData },
      });
      let data = { KadiYaMahudhurio: kadiYaMahudhurioPrevWeek };
      navigate("LEJAHISA", { data });
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
          title={"Fomu Kadi ya Mahudhurio"}
          subTitle={"Fomu ya kadi ya mahudhurio"}
        />
      </View>
      {states?.members === null ? (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 10,
          }}
        >
          <ActivityIndicator size={40} color={COLORS.primary} />
        </View>
      ) : (
        <>
          {states?.members?.length === 0 ? (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ color: COLORS.gray, fontSize: SIZES.medium }}>
                Hakuna Wanachama.Sajili Wanachama
              </Text>
            </View>
          ) : (
            <View
              style={{
                paddingHorizontal: SIZES.large,
                marginTop: SIZES.large,
              }}
            >
              {states?.members?.map((item, index) => (
                <AttendanceRadioComponent
                  key={index}
                  label={`${item["Jina la Mwanachama"]} Yupo?`}
                  index={index}
                  populateMahudhurio={populateMahudhurio}
                />
              ))}
              <View
                style={{
                  width: "100%",
                  justifyContent: "center",
                  alignItems: "flex-end",
                  marginBottom: SIZES.base,
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
          )}
        </>
      )}
    </ScrollView>
  );
};

export default FormMahudhurio;
