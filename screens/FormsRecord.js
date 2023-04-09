import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useContext } from "react";
import { COLORS, SIZES } from "../constants";
import { FormDataCard } from "../components";
import { getDoc, db, doc } from "../context/firebase";
import { FormsDataContext } from "../context/FormsRecordProvider";

const FormsRecord = ({ navigation, route }) => {
  const { states, dispatch } = useContext(FormsDataContext);
  const data = route.params?.data;
  const forms = data?.forms;
  const week = data?.week;
  const _forms = states?.forms[0]?.[week];
  const checkerForm = _forms[0];
  const formDataArray = [];
  useEffect(() => {
    if (states?.formDatas === null) {
      dispatch({ type: "ACTIVATE_FORMLOADING", loading: true });
      const getFormData = async (forms) => {
        try {
          const formObj = {};
          for (let j = 0; j < forms.length; j++) {
            let docName = forms[j];
            const doc_ = await getDoc(doc(db, "FormDocs", docName));
            if (doc_.exists()) {
              formObj[docName] = doc_.data();
            }
          }
          formDataArray.push(formObj);
          await dispatch({ type: "SET_FORMS", payload: formDataArray });
        } catch (e) {
          console.log(e.message);
        }
      };
      getFormData(_forms);
    } else {
      const getFormData = async (forms) => {
        try {
          const virtualFormObj = { ...states?.formDatas[0] };
          for (let i = 0; i < forms?.length; i++) {
            let docName = forms?.[i];
            if (typeof virtualFormObj?.[docName] === "undefined") {
              const doc_ = await getDoc(doc(db, "FormDocs", docName));
              if (doc_.exists()) {
                virtualFormObj[docName] = doc_.data();
              }
            } else {
              break;
            }
          }
          formDataArray.push(virtualFormObj);
          await dispatch({ type: "SET_FORMS", payload: formDataArray });
        } catch (e) {
          console.log(e.message);
        }
      };
      getFormData(_forms);
    }
  }, []);
  return (
    <SafeAreaView style={{}}>
      <View>
        <View
          style={{
            width: "100%",
            paddingTop: SIZES.base,
            paddingBottom: SIZES.small,
            backgroundColor: COLORS.primary,
            borderBottomLeftRadius: 10,
            borderBottomRightRadius: 10,
          }}
        >
          <View
            style={{
              paddingHorizontal: SIZES.medium,
              width: "100%",
            }}
          >
            <View>
              <Text
                style={{
                  textAlign: "left",
                  color: COLORS.white,
                  fontSize: SIZES.extraLarge,
                }}
              >
                {`Fomu Za Week Ya ${data?.week} ulizotuma`}
              </Text>
            </View>
            <View
              style={{
                marginTop: SIZES.small,
              }}
            >
              <Text
                style={{
                  textAlign: "left",
                  fontSize: SIZES.large,
                }}
              >
                {`Rekodi za Fomu Ulizopakia Week Ya ${data?.week}`}
              </Text>
            </View>
          </View>
        </View>
      </View>

      {/* Render Cards */}
      <View
        style={{
          width: "100%",
          paddingHorizontal: SIZES.font,
          paddingVertical: SIZES.extraLarge,
        }}
      >
        {states?.formDatas == null ||
        typeof states?.formDatas[0]?.[checkerForm] === "undefined" ? (
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
          // <>
          //   {typeof states?.formDatas[0]?.[checkerForm] === "undefined" ? (
          //     <View
          //       style={{
          //         flex: 1,
          //         justifyContent: "center",
          //         alignItems: "center",
          //       }}
          //     >
          //       <Text style={{ color: COLORS.gray, fontSize: SIZES.medium }}>
          //         Hakuna taarifa zozote!
          //       </Text>
          //     </View>
          //   ) : (
          <FlatList
            data={forms}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <FormDataCard
                text={item}
                // data={states?.formDatas}
                navigation={navigation}
              />
            )}
            ListHeaderComponentStyle={{ marginBottom: SIZES.base }}
            keyExtractor={(item) => item}
            ListFooterComponent={
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 10,
                  height: 200,
                }}
              >
                {/* <Button text={"Pakua"} /> */}
              </View>
            }
            ItemSeparatorComponent={<View style={{ marginBottom: 40 }} />}
          />
          //   )}
          // </>
        )}
      </View>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default FormsRecord;
