import { View, Text } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../constants";
import RadioForm from "react-native-simple-radio-button";
import CustomInput from "./CustomInput";
import Icon from "react-native-vector-icons/Ionicons";

const RadioComponent = ({
  label,
  hasDependentInput,
  dependentText,
  dependentPlaceHolder,
  onchangeText,
  multiLine,
  radioAnswer,
  setRadioAnswer,
}) => {
  var radioButtons = [
    {
      label: "Ndiyo",
      value: "Ndiyo",
    },
    {
      label: "Hapana",
      value: "Hapana",
    },
  ];

  return (
    <View style={{}}>
      <Text style={{ fontSize: 18 }}>{label}</Text>
      <View
        style={{
          width: "100%",
          paddingVertical: SIZES.small,
          paddingHorizontal: SIZES.base,
          paddingRight: SIZES.extraLarge + 5,
        }}
      >
        <RadioForm
          radio_props={radioButtons}
          initial={"Hapana"}
          onPress={(value) => setRadioAnswer(value)}
          buttonColor={COLORS.gray}
          selectedButtonColor={COLORS.primary}
          selectedLabelColor={COLORS.primary}
          buttonSize={12}
          labelStyle={{ fontSize: 18 }}
        />
        {hasDependentInput && radioAnswer == "Ndiyo" && (
          <CustomInput
            icon={
              <Icon name="md-pencil-sharp" size={25} color={COLORS.primary} />
            }
            label={dependentText}
            placeholder={dependentPlaceHolder}
            onChangeText={onchangeText}
            multiLine={multiLine}
          />
        )}
      </View>
    </View>
  );
};

export default RadioComponent;
