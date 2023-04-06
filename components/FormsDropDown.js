import { View, Text } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { Dropdown } from "react-native-element-dropdown";

const FormsDropDown = ({ labelText, options, value, setValue }) => {
  const optionsArray = options?.map((item) => {
    let key = Object.keys(item)[0];
    let label = item[key];
    let value = key;
    return { label, value };
  });
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
        placeholder={"chagua Katibu"}
        value={value}
        onChange={(item) => {
          setValue(item.value, item.label);
        }}
      />
    </View>
  );
};

export default FormsDropDown;
