import React from "react";
import { View } from "react-native";
import { Button, CustomInput, FormsHeader } from "../components";
import { SIZES, COLORS } from "../constants";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const RegisterKatibu = ({ route }) => {
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
          title={"Fomu ya Usajili wa Katibu"}
          subTitle={
            route.params?.edit
              ? `Badilisha Taarifa za Katibu ${route.params?.data.name}`
              : "Fomu ya Usajili wa Katibu"
          }
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
            icon={<Icon name="person" size={25} color={COLORS.primary} />}
            label="Jina la Katibu"
            placeholder={"Ingiza jina la Katibu"}
            onChangeFunc={() => {}}
          />
          <CustomInput
            icon={<Icon name="mail-outline" size={25} color={COLORS.primary} />}
            label="Barua pepe"
            placeholder={"Ingiza barua pepe ya Katibu"}
            onChangeFunc={() => {}}
          />
          <CustomInput
            icon={<Icons name="phone" size={25} color={COLORS.primary} />}
            label="Namba ya Simu"
            placeholder={"Ingiza namba ya simu"}
            onChangeFunc={() => {}}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="location-outline" size={25} color={COLORS.primary} />
            }
            label="Anuani Ya Makazi"
            placeholder={"Ingiza anuani ya makazi"}
            onChangeFunc={() => {}}
          />
          <CustomInput
            icon={<Icon name="person" size={25} color={COLORS.primary} />}
            label="Jina la Utumiaji la Katibu"
            placeholder={"Ingiza jina la utumiaji"}
            onChangeFunc={() => {}}
          />
          <CustomInput
            icon={<Icon name="lock-closed" size={25} color={COLORS.primary} />}
            label="NenoSiri la Katibu"
            placeholder={"Ingiza nenosiri"}
            onChangeFunc={() => {}}
            isPassword={true}
          />
          <CustomInput
            icon={<Icon name="lock-closed" size={25} color={COLORS.primary} />}
            label="NenoSiri la Katibu"
            placeholder={"Ingiza tena nenosiri"}
            onChangeFunc={() => {}}
            isPassword={true}
          />

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

export default RegisterKatibu;
