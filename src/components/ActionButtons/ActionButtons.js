import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
const ActionButtons = () => {
  return (
    <View style={{flexDirection: 'row', gap: 20, marginTop: 10}}>
        <TouchableOpacity><Icon size={28} name='heart-outline'/></TouchableOpacity>
        <TouchableOpacity><Icon size={26} name='chatbubble-outline'/></TouchableOpacity>
        <TouchableOpacity><Icon size={26} name='git-compare-outline'/></TouchableOpacity>
        <TouchableOpacity><Icon size={26} name='paper-plane-outline'/></TouchableOpacity>
    </View>
  )
}

export default ActionButtons