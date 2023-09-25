import { View, Text, TextInput } from 'react-native'
import React from 'react'
import styled from 'styled-components'

const EditProfile = () => {
  return (
    <Container>
        <EditInput placeholder="Логін" />
        <EditInput placeholder="Опис" />
    </Container>
  )
}

const Container = styled.View`
border: 1px solid #c9c9c9;
border-radius: 12px;
display: flex;
flex-direction: column;
`
const EditInput = styled.TextInput`

`

export default EditProfile