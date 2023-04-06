import { View, Text } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { Dropdown } from "react-native-element-dropdown";

const DropDownComponent = ({ label, options, value, setValue, loading }) => {
  const optionsArray = options?.map((item) => ({ label: item, value: item }));

  return (
    <View>
      <Text style={{ fontSize: 18, marginBottom: SIZES.base }}>{label}</Text>
      {loading ? (
        <View
          style={{
            justifyContent: "center",
            width: "100%",
            alignItems: "center",
            borderWidth: 1,
            borderColor: COLORS.primary,
            borderRadius: 5,
            marginBottom: SIZES.small,
          }}
        >
          <Text
            style={{
              fontSize: SIZES.medium,
              color: COLORS.gray,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            ...tafadhali subiri
          </Text>
        </View>
      ) : (
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
            setValue(item.value);
          }}
        />
      )}
    </View>
  );
};

export default DropDownComponent;
