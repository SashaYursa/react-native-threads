import { View, Text } from 'react-native'
import React from 'react'
import styled from 'styled-components'
import { GRAY_TEXT, USER_IMAGE_URL } from '../../constants'
const ProfileInfo = ({user}) => {
  console.log(user.image, 'image')
  const userImage = user.image ? {uri: USER_IMAGE_URL + user.image} : require('../../../assets/default-user-image.png');
  return (
    <UserInfoContainer>
      <UserInfo>
        <Name>{user.name}</Name>
        <Description>{user.description}</Description>
        <Subscribers>{user?.subs} підписників</Subscribers>
      </UserInfo> 
      <ImageContainer>
        <UserImage source={userImage} />
      </ImageContainer>
    </UserInfoContainer>
  )
}

const UserInfoContainer = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 10px;
`

const UserInfo = styled.View`
flex: 1;
justify-content: start;
display: flex;
flex-direction: column;
gap: 5px;
`
const ImageContainer = styled.TouchableOpacity`
  display: flex;
  align-items: center;
  justify-content: center;
  align-items: center;
  justify-content: start;
`
const UserImage = styled.Image`
width: 70px;
height: 70px;
border-radius: 45px;
background-color: #fff;
`
const Name = styled.Text`
font-size: 26px;
font-weight: 700;
`
const Description = styled.Text`
font-size: 16px;
font-weight: 400;
`

const Subscribers = styled.Text`
  font-size: 16px;
  color: ${GRAY_TEXT};
`

export default ProfileInfo