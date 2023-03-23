import React from "react";
import { View } from "react-native";
import {
  Button,
  CustomInput,
  DropDownComponent,
  FormsHeader,
} from "../components";
import { SIZES, COLORS } from "../constants";
import { ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Icons from "react-native-vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";

const RegisterKikundi = () => {
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
          title={"Fomu ya Usajili wa Kikundi"}
          subTitle={"Fomu ya usajili wa kikundi"}
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
            label="Jina la Kikundi"
            placeholder={"Ingiza jina la kikundi"}
            onChangeFunc={() => {}}
          />

          <DropDownComponent
            label={"Jina la Katibu"}
            prompt={"Chagua Katibu"}
            options={["Zaidu Nyoni", "Daniel Mathew", "Gideon Samson"]}
          />

          <DropDownComponent
            label={"Jina la Kijiji cha Kikundi"}
            prompt={"Chagua Kijiji"}
            options={["Zemeradi", "Mkotonyi", "Mtemi"]}
          />

          <CustomInput
            icon={
              <Icon name="location-outline" size={25} color={COLORS.primary} />
            }
            label="Kata ya Kijiji"
            placeholder={"Ingiza kata ya kijiji"}
            onChangeFunc={() => {}}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Thamani ya Hisa ya Kikundi"
            placeholder={"Ingiza thamani ya hisa"}
            onChangeFunc={() => {}}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Namba ya usajili ya kikundi"
            placeholder={"Ingiza namba ya usajili ya kikundi"}
            onChangeFunc={() => {}}
            isNumber={true}
          />
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label="Idadi ya Wanachama wa Kikundi"
            placeholder={"Ingiza idadi ya wanachama"}
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

export default RegisterKikundi;
