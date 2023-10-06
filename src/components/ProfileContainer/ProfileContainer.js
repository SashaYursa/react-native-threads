import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import styled from 'styled-components'

const ProfileContainer = ({children}) => {
  return (
    <ProfileBody>
        <Container>
            {children}
        </Container>
    </ProfileBody>
  )
}
const ProfileBody = styled.ScrollView`
flex-grow: 1;
background-color: #fff;
`
const Container = styled.View`
flex: 1;
margin: 0;
padding: 0;
background: #fff;
`
export default ProfileContainer