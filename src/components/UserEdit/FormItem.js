import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import styled from 'styled-components'
const FormItem = ({title, value, editedData, navigate}) => {
  return (
    <EditElement activeOpacity={0.5} onPress={()=>navigate(title, editedData, value)}>
      <EditLabel>
        {title}
      </EditLabel>
      <EditInput>
        <EditText>{value}</EditText>
      </EditInput>
    </EditElement>
  )
}
const EditElement = styled.TouchableOpacity`
padding: 10px 0 5px;
flex-grow: 1;
`
const EditInput = styled.View`
border-bottom-color: #c9c9c9;
border-bottom-width: .5px;
padding: 5px 0;
`
const EditText = styled.Text`
font-size: 14px;
flex-wrap: wrap;
`
export const EditLabel = styled.Text`
font-size: 14px;
font-weight: 700;
color: #000;
`
export default FormItem