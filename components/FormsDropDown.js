import { View, Text } from "react-native";
import React, { useState } from "react";
import { COLORS, SIZES } from "../constants";
import { Dropdown } from "react-native-element-dropdown";

const FormsDropDown = ({ labelText, options, value, setValue, isKatibu }) => {
  const optionsArray = options?.map((item, index) => {
    let key = Object.keys(item)[0];
    let label = item[key];
    let value = key;
    return { label, value };
  });

  const deductOptionsRemaining = (value, label) => {
    const remArrOptions = optionsArray.filter(
      (item, index) => item["value"] !== value
    );
    const remArrOptionsCleaned = remArrOptions?.map((item, index) => {
      let label = item["label"];
      let value = item["value"];
      return { [value]: label };
    });
    setValue(value, label, remArrOptionsCleaned);
  };
  return (
    <View>
      <Text style={{ fontSize: 18, marginBottom: SIZES.base }}>
        {labelText}
      </Text>
      <Dropdown
        style={{
          height: 50,
          borderColor: COLORS.primary,
          borderWidth: 1,
          borderRadius: 5,
          paddingHorizontal: 8,
          maxHeight: 100,
          marginBottom: SIZES.small,
        }}
        placeholderStyle={{
          fontSize: SIZES.font,
          marginLeft: SIZES.small,
        }}
        data={optionsArray}
        labelField="label"
        valueField="value"
        placeholder={"Chagua Mwanachama"}
        value={value}
        onChange={(item) => {
          deductOptionsRemaining(item.value, item.label);
        }}
      />
    </View>
  );
};

export default FormsDropDown;
