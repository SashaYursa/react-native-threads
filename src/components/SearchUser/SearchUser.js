import { View, Text, Image, TouchableOpacity} from 'react-native'
import React from 'react'
import styled from 'styled-components'
import { GRAY_TEXT, USER_IMAGE_URL } from '../../constants'
import Icon from 'react-native-vector-icons/Ionicons'
import { useDispatch, useSelector } from 'react-redux'
import { handleSubscribe } from '../../store/actions/usersActions'
const SearchUser = ({user, navigation}) => {
    const subscribeInProgress = useSelector(state => state.users.subscribeInProgress);
    const userId = useSelector(state => state.user.user.id);
    const isSubscribed = user.isSubscribed
     ? {
        text: "Ви підпсані",
        style: {fontWeight: 700, color: GRAY_TEXT}
    }
    : {
        text: "Підписатися",
        style: {fontWeight: 700, color: '#000'}
    }
  const dispatch = useDispatch();
  const handleSubscribeButton = () => {
    dispatch(handleSubscribe(user.id));
  }
  const moveToUser = () => {
    navigation.navigate('Person', {id: user.id, name: user.name, description: user.description, image: user.image})
  }
  return (
    <UserItem onPress={moveToUser}>
      <ImageContainer>
      {user.image 
      ? <UserImage source={{uri: user.image}}/>
      : <Icon style={{margin: 'auto'}} size={25} name='person-outline'/>
      }
      </ImageContainer>
        <UserInfoContainer style={{borderBottomWidth: 1, borderBottomColor: '#e6e3e3'}}>
            <UserInfo>
                <UserName>{user.name}</UserName>
                <UserSubscribers>{user.subscribers} подпищиков</UserSubscribers>
            </UserInfo>
            <SubscribeButton disabled={subscribeInProgress ? true : false} onPress={handleSubscribeButton}><Text style={isSubscribed.style}>{isSubscribed.text}</Text></SubscribeButton>
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
const ImageContainer = styled.View`
display: flex;
align-items: center;
justify-content: center;
background-color: #eaeaea;
padding: 0;
border-radius: 20px;
height: 40px;
width: 40px;

align-self: center;
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

export default SearchUser