import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants';


const FormFilling = ({navigation:{navigate}}) => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: SIZES.font
    }}>
      <Text style={{
        textAlign: 'center',
        color: COLORS.gray,
        fontSize: SIZES.medium
      }}>Unakwenda kujaza fomu za wiki! Hakikisha unajaza taarifa sahihi na kwa umakini!
        Kumbuka ukishakusanya fomu za wiki husika huwezi kubadilisha tena.
      </Text>
      <TouchableOpacity style={{
        backgroundColor: "transparent",
        marginTop: SIZES.font,
      }}
       onPress={() => navigate("MAHUDHURIO")}
      >
        <Text style={{ color: COLORS.primary, fontSize: SIZES.large}}>{`Anza kujaza >>`}</Text>
      </TouchableOpacity>
    </View>
  )
}

export default FormFilling