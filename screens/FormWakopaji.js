import { View } from "react-native";
import React from "react";
import { Button, CustomInput, FormsHeader } from "../components";
import { SIZES, COLORS } from "../constants";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const FormWakopaji = () => {
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
          title={"Fomu Wakopaji na Marejesho"}
          subTitle={"Fomu ya wakopaji na marejesho"}
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
            label="Jina la Mkopaji"
            placeholder={"Ingiza jina kamili la mkopaji"}
            onChangeFunc={() => {}}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Kiasi cha Mkopo"
            placeholder={"Ingiza kiasi cha mkopo"}
            onChangeFunc={() => {}}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="riba"
            placeholder={"Ingiza riba"}
            onChangeFunc={() => {}}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Bima"
            placeholder={"Ingiza Bima"}
            onChangeFunc={() => {}}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="1"
            placeholder={"Ingiza 1"}
            onChangeFunc={() => {}}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="2"
            placeholder={"Ingiza 2"}
            onChangeFunc={() => {}}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="3"
            placeholder={"Ingiza 3"}
            onChangeFunc={() => {}}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="4"
            placeholder={"Ingiza 4"}
            onChangeFunc={() => {}}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="5"
            placeholder={"Ingiza 5"}
            onChangeFunc={() => {}}
            isNumber={true}
          />

          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Jumla"
            placeholder={"Weka Jumla"}
            onChangeFunc={() => {}}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Jumla Kuu"
            placeholder={"Weka Jumla kuu"}
            onChangeFunc={() => {}}
            isNumber={true}
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

export default FormWakopaji;
