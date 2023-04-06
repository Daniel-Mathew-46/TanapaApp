import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { View, ActivityIndicator } from "react-native";
import React, { useState, useContext } from "react";
import {
  Button,
  Text,
  FormsHeader,
  AttendanceRadioComponent,
} from "../components";
import { SIZES, COLORS } from "../constants";
import { ScrollView } from "react-native";
import { submitFormData } from "../context/submits";
import { KatibuTasksContexts } from "../context/KatibuTasksProvider";

const FormMahudhurio = ({ route }) => {
  const { states } = useContext(KatibuTasksContexts);
  const katibuEmail = route.params?.katibuEmail;
  const week = route.params?.week;
  const weekNumber = week ? Number(week) : null;
  const membersNames =
    states?.members?.length > 0
      ? states?.members?.map((item) => item["Jina la Mwanachama"])
      : [];
  const mahudhurioArray = states?.members ? [] : null;
  const formData = {};
  const [loading, setLoading] = useState(false);

  const populateMahudhurio = (value, index) => {
    mahudhurioArray[index] = value || "Hapana";
  };

  const handleSubmit = () => {
    if (week === null || typeof week === "undefined") {
      alert("Tafadhali sema ni wiki ya ngapi!");
      return;
    }
    const docName =
      "Kadi_Ya_Mahudhurio_" +
      katibuEmail?.split("@")[0] +
      "_week_" +
      weekNumber;
    for (i = 0; i < states?.members?.length; i++) {
      let jina = membersNames[i];
      let jibu = mahudhurioArray[i];
      formData[jina] = jibu;
    }
    setLoading(true);
    submitFormData(
      "FormDocs",
      katibuEmail,
      "Kadi Ya Mahudhurio Kila Wiki",
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
            <KeyboardAwareScrollView>
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
          )}
        </>
      )}
    </ScrollView>
  );
};

export default FormMahudhurio;
