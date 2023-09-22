import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { GRAY_TEXT, USER_IMAGE_URL } from '../constants'
import styled from 'styled-components'
import Thread from '../components/Thread/Thread'
import { useDispatch, useSelector } from 'react-redux'
import { loadUser } from '../store/actions/UserActions'
const userData = {
  id: 1234,
  name: 'Alex',
  description: 'In this example, we import the primaryColor constant from the constants.js file and use it as the background color for the StyledButton component. The ${primaryColor} syntax allows you to interpolate the constant value into the styled components',
  image: 'https://th.bing.com/th/id/OIG.y3eGwbcLkQtDhkCEsLKu',
  subs: 100,
  followers: 97,
  threads: [
      {id: 2423, subscribed: true, author: {name: "Alex", image: 'https://th.bing.com/th/id/OIG.y3eGwbcLkQtDhkCEsLKu'}, time: "12 ч.", text: "Охоронець в тц підходить і називає мене ізюмінкою 🙂 чоловіки, от з кого треба брати приклад", likes: 293},
      {id: 3434, subscribed: true, author: {name: "Alex", image: 'https://th.bing.com/th/id/OIG.y3eGwbcLkQtDhkCEsLKu'}, time: "18 ч.", text: "Охоронець в тц підходить і називає мене ізюмінкою 🙂 чоловіки, от з кого треба брати приклад", likes: 223},
      {id: 7676, subscribed: true, author: {name: "Alex", image: 'https://th.bing.com/th/id/OIG.y3eGwbcLkQtDhkCEsLKu'}, time: "4 ч.", text: "Охоронець в тц підходить і називає мене ізюмінкою 🙂 чоловіки, от з кого треба брати приклад", likes: 19}
  ]
}
const Profile = () => {
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadUser(1))
  }, [dispatch]);

  const user = useSelector(state=> state.user.user)
  console.log(user);
  const threads = user.threads.map(thread => ({
    ...thread,
    author_name: user.name,
    author_image: user.image,
    isSubscribed: true,
  }));
  const loading = useSelector(state=> state.user.loading)
  return (
    <ScrollView>
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
      </ActionsContainer>
      <View>
        {threads.map(thread=> <Thread key={thread.id} thread={thread}/>)}
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