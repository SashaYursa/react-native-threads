import { View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import styled from 'styled-components'
import { GRAY_TEXT, USER_IMAGE_URL } from '../../constants'
const User = ({user}) => {
    const isSubscribed = user.isSubscribed
     ? {
        text: "Ви підпсані",
        style: {fontWeight: 700, color: GRAY_TEXT}
    }
    : {
        text: "Підписатися",
        style: {fontWeight: 700, color: '#000'}
    }

  return (
    <UserItem>
        <UserImage source={{uri: USER_IMAGE_URL + user.image}}/>
        <UserInfoContainer style={{borderBottomWidth: 1, borderBottomColor: '#e6e3e3'}}>
            <UserInfo>
                <UserName>{user.name}</UserName>
                <UserSubscribers>{user.subscribers}5 подпищиков</UserSubscribers>
            </UserInfo>
            <SubscribeButton><Text style={isSubscribed.style}>{isSubscribed.text}</Text></SubscribeButton>
        </UserInfoContainer>
  </UserItem>
  )
}

const UserItem = styled.TouchableOpacity`
display: flex;
flex-direction: row;
margin: 10px 0 0 10px;

`
const UserImage = styled.Image`
width: 40px;
height: 40px;
border-radius: 20px;
`

const UserInfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding-right: 10px;
  border-bottom: 1px solid #e6e3e3;
  flex: 1;
  margin-left: 10px;
  padding-bottom: 5px;
`
const UserInfo = styled.View`
flex-direction: column;
gap: 5px;
flex: 1;
`
const UserName = styled.Text`
font-size: 18px;
font-weight: 700;
`
const UserSubscribers = styled.Text`
  font-size: 16px;
  color: ${GRAY_TEXT};
`
const SubscribeButton = styled.TouchableOpacity`
border: 1px solid #e6e3e3;
padding: 3px 10px;
align-self: flex-start;
border-radius: 6px;
`

export default User