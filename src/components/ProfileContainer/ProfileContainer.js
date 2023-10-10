import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React from 'react'
import styled from 'styled-components'

const ProfileContainer = ({children, refreshing, onRefresh}) => {
  return (
    <ProfileBody
    refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>
    }
    >
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