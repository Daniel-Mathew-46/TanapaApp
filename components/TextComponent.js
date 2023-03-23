import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const TextComponent = ({text}) => {
  return (
    <View style={{
        marginVertical: 5,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        alignItems: 'center'
    }}>
        <TouchableOpacity>
            <Text style={{ color: COLORS.gray, fontSize: 14, fontWeight: 'bold'}}>{text}</Text>
        </TouchableOpacity>
    </View>
  )
}

export default TextComponent