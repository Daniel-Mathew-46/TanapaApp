import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  StyleSheet,
} from "react-native";
import React from "react";
import { COLORS, SIZES } from "../constants";
import { Table, Row } from "react-native-table-component";

const FormData = ({ route }) => {
  const data = route?.params?.data;
  const isNotTableData = route.params?.isNotTableData;
  const formText = route.params?.formText;
  let widthArr;
  const tableData = [];
  if (!isNotTableData) {
    if (formText === "Wakopaji na Marejesho")
      widthArr = [
        120, 120, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 280,
      ];
    else if (formText === "Leja ya Mfuko") {
      widthArr = [110, 110, 110, 110];
    } else widthArr = [];

    Object.keys(data?.formData).forEach((key) => {
      if (key !== "0") tableData.push(data.formData[key]);
    });
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <View
            style={{
              width: "100%",
              paddingTop: SIZES.base,
              paddingBottom: SIZES.font,
              backgroundColor: COLORS.primary,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            <View
              style={{
                paddingHorizontal: SIZES.medium,
                width: "100%",
              }}
            >
              <View>
                <Text
                  style={{
                    textAlign: "left",
                    color: COLORS.white,
                    fontSize: SIZES.extraLarge + 5,
                  }}
                >
                  {`Taarifa za Fomu`}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Render Card */}
        <View
          style={{
            width: "100%",
            paddingHorizontal: SIZES.medium,
            paddingTop: SIZES.extraLarge,
            paddingBottom: SIZES.font,
          }}
        >
          {isNotTableData ? (
            <View
              style={{
                paddingHorizontal: SIZES.font,
                paddingVertical: SIZES.font,
                backgroundColor: COLORS.darkWhite,
                borderRadius: 10,
                shadowColor: COLORS.gray,
                shadowOffset: {
                  width: 5,
                  height: 5,
                },
                shadowOpacity: 0.75,
                elevation: 9,
              }}
            >
              <Text
                style={{
                  fontSize: SIZES.medium,
                  marginTop: SIZES.small,
                }}
              >
                {"Fomu"}:{" "}
                <Text
                  style={{
                    fontWeight: "bold",
                    fontSize: SIZES.large,
                    color: COLORS.secondary,
                    marginBottom: SIZES.medium,
                  }}
                >
                  {data?.formName}
                </Text>
              </Text>
              {Object.keys(data?.formData).map((item, index) => {
                return (
                  <Text
                    key={index}
                    style={{
                      fontSize: SIZES.medium,
                      marginTop: SIZES.small,
                    }}
                  >
                    {item}:{" "}
                    <Text
                      style={{
                        fontSize: SIZES.medium,
                        color: COLORS.gray,
                        marginBottom: SIZES.medium,
                      }}
                    >
                      {data?.formData[item]}
                    </Text>
                  </Text>
                );
              })}
            </View>
          ) : (
            <ScrollView horizontal={true}>
              <View>
                <Text
                  style={{
                    fontSize: SIZES.medium,
                    marginBottom: SIZES.small,
                  }}
                >
                  {"Fomu"}:{" "}
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: SIZES.large,
                      color: COLORS.secondary,
                      marginBottom: SIZES.medium,
                    }}
                  >
                    {data?.formName}
                  </Text>
                </Text>
                <Table borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}>
                  <Row
                    data={data?.formData?.["0"]}
                    widthArr={widthArr}
                    style={{ height: 50, backgroundColor: "#537791" }}
                    textStyle={{ textAlign: "center", fontWeight: "bold" }}
                  />
                </Table>
                <ScrollView style={{ marginTop: -1 }}>
                  <Table
                    borderStyle={{ borderWidth: 1, borderColor: "#C1C0B9" }}
                  >
                    {tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={widthArr}
                        style={{ height: 40, backgroundColor: "#E7E6E1" }}
                        textStyle={{ textAlign: "center", fontWeight: "100" }}
                      />
                    ))}
                  </Table>
                </ScrollView>
              </View>
            </ScrollView>
          )}
        </View>
      </ScrollView>
      <StatusBar barStyle={"dark-content"} backgroundColor={COLORS.primary} />
    </SafeAreaView>
  );
};

export default FormData;
