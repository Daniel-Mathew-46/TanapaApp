import { View, Text } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import RadioForm from "react-native-simple-radio-button";

const AttendanceRadioComponent = ({ label, index, populateMahudhurio }) => {
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
          onPress={(value) => populateMahudhurio(value, index)}
          buttonColor={COLORS.gray}
          selectedButtonColor={COLORS.primary}
          selectedLabelColor={COLORS.primary}
          buttonSize={12}
          labelStyle={{ fontSize: 18 }}
        />
      </View>
    </View>
  );
};

export default AttendanceRadioComponent;
