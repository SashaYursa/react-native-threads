import { View, Text } from 'react-native'
import React from 'react'
import styled from 'styled-components'

const FormInput = ({value, setValue, placeholder, secure}) => {
  return (
    <LoginInput secureTextEntry={secure} value={value} onChangeText={e => setValue(e)} placeholder={placeholder}/>
  )
}

const LoginInput = styled.TextInput`
flex-grow: 1;
background-color: #fff;
padding: 15px 15px;
font-size: 16px;
border: 1px solid #c9c9c9;
border-radius: 12px;
`

export default FormInput