import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import { COLORS, SIZES } from "../constants";

const DropDownComponent = ({ label, prompt, options }) => {
  const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View>
      <Text style={{ fontSize: 18, marginBottom: SIZES.base }}>{label}</Text>
      <View
        style={{
          width: "100%",
          borderWidth: 1,
          borderColor: COLORS.primary,
          borderRadius: 5,
          marginBottom: SIZES.small,
        }}
      >
        <Picker
          selectedValue={selectedLanguage}
          onValueChange={(itemValue, itemIndex) =>
            setSelectedLanguage(itemValue)
          }
          prompt={prompt}
        >
          {options?.map((item, index) => (
            <Picker.Item key={index} label={item} value={item} />
          ))}
        </Picker>
      </View>
    </View>
  );
};

export default DropDownComponent;
