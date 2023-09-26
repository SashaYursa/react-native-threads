import { View, Text, TouchableOpacity, Image, Switch } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components';
import { useSelector } from 'react-redux';
const UserEditWindow = ({navigation, route}) => {
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const user = useSelector(state=> state.user.editedUser);
  console.log(user.name);
  return (
    <Body>
    <Container>
      <EditItemsContainer>
          <EditElement activeOpacity={0.5} onPress={()=>navigation.navigate('UserEditValueWindow', {title: 'Логін', editedData: 'name', data: user.name})}>
            <EditLabel>
              Логін
            </EditLabel>
            <EditInput>
            <EditText>{user.name}</EditText>
            </EditInput>
          </EditElement>
          <EditImageButton activeOpacity={0.5}>
            <EditImage onLoadStart={e => {
                  setImageIsLoading(true)
                }}
                onLoadEnd={e =>setImageIsLoading(false)}
                 source={{uri: 'https://picsum.photos/200/300'}} />
          </EditImageButton>
        </EditItemsContainer>
        <EditElement activeOpacity={0.5} onPress={()=>navigation.navigate('UserEditValueWindow', {title: 'Опис', editedData: 'description', data: user.description})}>
          <EditLabel>
            Опис
          </EditLabel>
          <EditInput>
          <EditText>{user.description}</EditText>
          </EditInput>
        </EditElement>
        <EditItemsContainer>
        <EditLabel>Закритий профіль</EditLabel>
        <Switch
        trackColor={{false: '#c9c9c9', true: '#000'}}
        thumbColor={'#fff'}
        ios_backgroundColor="#c9c9c9"
        onValueChange={setSwitchValue}
        value={switchValue}
      />
        </EditItemsContainer>
    </Container>
    </Body>
  )
}

const Body = styled.View`
align-items: center;
justify-content: center;
flex-grow: 1;
background-color: #fff;
`
const EditItemsContainer = styled.View`
display: flex;
flex-direction: row;
flex-grow: 1;
gap: 10px;
align-items: center;
justify-content: space-between;
`
const EditImageButton = styled.TouchableOpacity`
align-self: center;
justify-self: center;
`
const EditImage = styled.Image`
border-radius: 25px;
background-color: #eaeaea;
width: 50px;
height: 50px;
object-fit: cover;
`
const EditLabel = styled.Text`
font-size: 14px;
font-weight: 700;
color: #000;
`
const Container = styled.View`
border: 1px solid #c9c9c9;
border-radius: 12px;
display: flex;
flex-direction: column;
width: 80%;
padding: 10px;
`
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

export default UserEditWindow