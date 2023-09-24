import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { lazy, useEffect } from 'react'
import { GRAY_TEXT, USER_IMAGE_URL } from '../constants'
import styled from 'styled-components'
import Thread from '../components/Thread/Thread'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser, removeUser } from '../store/actions/UserActions'
import { ActivityIndicator } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Profile = () => {
  const dispatch = useDispatch();
  const logOut = async () => {
    await AsyncStorage.removeItem('userId');
    console.log(await AsyncStorage.getItem('userId'))
    console.log('logout')
    dispatch(removeUser())

  }
  const user = useSelector(state=> state.user.user)
  console.log(user);
  let threads = user.threads;
  if(user.threads.length > 1){
    threads = user.threads.map(thread => ({
      ...thread,
      author_name: user.name,
      author_image: user.image,
      isSubscribed: true,
    }));
  }else if(user.threads.length === 1){
    threads = [{
      ...threads[0],
      author_name: user.name,
      author_image: user.image,
      isSubscribed: true,
    }]
  }
  const loading = useSelector(state => state.user.loading)
  
  return loading 
  ? ( <ActivityIndicator size={'large'}/> ) 
  : (
    <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
    <Container>
      <UserInfoContainer>
      <UserInfo>
        <Name>{user.name}</Name>
        <Description>{user.description}</Description>
        <Subscribers>{user.subs} 10 подписчиков</Subscribers>
      </UserInfo> 
      <ImageContainer>
        <UserImage source={{uri: (USER_IMAGE_URL + user.image)}} />
      </ImageContainer>
      </UserInfoContainer>
      <ActionsContainer>
        <ActionButton>
          <ActionText>Редагувати профіль</ActionText>
        </ActionButton>
        <ActionButton>
          <ActionText>Поширити профіль</ActionText>
        </ActionButton>
        <ActionButton onPress={logOut}>
          <ActionText>Вийти</ActionText>
        </ActionButton>
      </ActionsContainer>
      <View style={{flex: 1, backgroundColor: '#fff', flexDirection: 'column'}}>
        {threads.length > 0 
        ? threads.map(thread=> <Thread key={thread.id} thread={thread}/>)
        : (<View style={{alignItems: 'center',flex: 1, backgroundColor: '#fff' }}><Text style={{fontSize: 32}}>No content here</Text></View>)
      }
      </View>
    </Container>
    </ScrollView>
  )
}

const Container = styled.View`
flex: 1;
margin: 0;
padding: 0;
background: #fff;
`
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
background-color: #000;
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



const ActionsContainer = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
gap: 10px;
padding: 5px 10px;
border-bottom-width: 1px;
border-bottom-color: #e6e3e3;
padding-bottom: 10px;
`
const ActionButton = styled.TouchableOpacity`
border: 1px solid #eaeaea;
border-radius: 8px;
flex: 1;
align-items: center;
background-color: #fff;
padding: 6px 8px;
`

const ActionText = styled.Text`
font-size: 14px;
font-weight: 700;
`



export default Profile