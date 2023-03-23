import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";

const TaskText = ({ text, role }) => {
  return (
    <View
      style={{
        width: "100%",
        paddingHorizontal: SIZES.large,
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: SIZES.font,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          marginLeft: SIZES.base,
          alignItems: "center",
        }}
      >
        <View
          style={{
            height: 5,
            width: 5,
            backgroundColor: COLORS.primary,
            borderRadius: 10,
          }}
        ></View>
        <Text
          style={{
            color: COLORS.primary,
            textTransform: "uppercase",
            fontSize: SIZES.large,
            marginLeft: SIZES.base - 3,
          }}
        >
          {text}
        </Text>
      </View>

      {/* {role == "Admin" || role == "Community Facilitator" ? (
        <TouchableOpacity>
          <Text
            style={{
              color: COLORS.secondary,
              textTransform: "uppercase",
              fontSize: SIZES.large,
              textDecorationLine: "underline",
              marginLeft: SIZES.base - 3,
            }}
          >
            ONA ZOTE
          </Text>
        </TouchableOpacity>
      ) : null} */}
    </View>
  );
};

export default TaskText;
