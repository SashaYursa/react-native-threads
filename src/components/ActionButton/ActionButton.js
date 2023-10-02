import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
const ActionButton = ({name, handleClick, size = 26}) => {
  return (
    <TouchableOpacity onPress={handleClick}><Icon size={size} name={name}/></TouchableOpacity>
  )
}

export default ActionButton