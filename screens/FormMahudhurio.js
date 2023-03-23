import { View } from "react-native";
import React from "react";
import {
  Button,
  CustomInput,
  FormsHeader,
  RadioComponent,
} from "../components";
import { SIZES, COLORS } from "../constants";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const FormMahudhurio = () => {
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
      <KeyboardAwareScrollView>
        <View
          style={{
            paddingHorizontal: SIZES.large,
            marginTop: SIZES.large,
          }}
        >
          <RadioComponent label={`Gideon Ndabuye Yupo?`} />
          <RadioComponent label={`Daniel Mathew Yupo?`} />
          <RadioComponent label={`Evance Samson Yupo?`} />
          <RadioComponent label={`Haji Zuberi Yupo?`} />
          <RadioComponent label={`Jofrey Kajungu Yupo?`} />
          <RadioComponent label={`Jumbi Lukujo Yupo?`} />
          <View
            style={{
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: SIZES.base,
            }}
          >
            <Button text={"Kusanya Taarifa"} />
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScrollView>
  );
};

export default FormMahudhurio;
