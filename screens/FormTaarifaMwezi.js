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

const FormTaarifaMwezi = () => {
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
          title={"Fomu taarifa za Kikundi"}
          subTitle={"Fomu taarifa za kikundi"}
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
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Idadi ya Wanachama wa Kiume"
            placeholder={"Ingiza idadi ya waume"}
            onChangeFunc={() => {}}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Idadi ya Wanachama wa Kike"
            placeholder={"Ingiza mahudhurio ya wake"}
            onChangeFunc={() => {}}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Asilimiaya mahudhurio kwa mwezi"
            placeholder={"Ingiza asilimia ya mahudhurio"}
            onChangeFunc={() => {}}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Nyongeza ya Mkopo/Bei ya Mkopo"
            placeholder={"Ingiza nyongeza/bei ya mkopo"}
            onChangeFunc={() => {}}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Kiasi cha marejesho kilichopokelewa"
            placeholder={"Ingiza kiasi kilichopokelewa"}
            onChangeFunc={() => {}}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Kiwango cha mkopo cha juu kilichotolewa"
            placeholder={"Ingiza kiwango chajuu kilichotolewa"}
            onChangeFunc={() => {}}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Idadi ya Wanachama waliokopeshwa"
            placeholder={"Ingiza idadi"}
            onChangeFunc={() => {}}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Thamani ya Miradi ya Pamoja"
            placeholder={"Ingiza thamani ya miradi"}
            onChangeFunc={() => {}}
            isNumber={true}
          />
          <RadioComponent
            label={"Mlitembelewa na mtu/shirika/taasisi?"}
            hasDependentInput={true}
            dependentText={"Kama ndio andika jina lake"}
            dependentPlaceHolder={"Ingiza jina kamili"}
          />
          <RadioComponent
            label={"Kuna Mafunzo Yoyote Mliyopata Kipindi Hiki?"}
            hasDependentInput={true}
            dependentText={"Kama ndio nani alitoa?"}
            dependentPlaceHolder={"Ingiza taarifa kamili"}
            multiLine={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Kuna changamoto zozote?"
            placeholder={"Taja changamoto"}
            onChangeFunc={() => {}}
            multiLine={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Kuna Maoni Yako"
            placeholder={"Toa maoni"}
            onChangeFunc={() => {}}
            multiLine={true}
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

export default FormTaarifaMwezi;
