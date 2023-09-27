import { View, Text, TouchableOpacity, Image, Switch, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { editUserData } from '../store/actions/UserActions';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { DEFAULT_IMAGE_URL, USER_IMAGE_URL } from '../constants';
import Icon from 'react-native-vector-icons/Ionicons'

const imgDir = FileSystem.documentDirectory + 'images/';
console.log(imgDir);
const UserEditWindow = ({navigation, route}) => {
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const userIsPrivate = useSelector(state => state.user.editedUser.is_private);
  const [switchValue, setSwitchValue] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const user = useSelector(state=> state.user.editedUser);
  console.log(user)
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(editUserData("is_private", switchValue));
  }, [switchValue])
  
  const deleteImage = () => {
    dispatch(editUserData('image', null));
  }
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
          <ImageButton deleteImage={deleteImage} userImage={user.image}>
            {user.image !== null
            ? <EditImage onLoadStart={e => {
                  setImageIsLoading(true)
                }}
                onLoadEnd={e =>setImageIsLoading(false)}
                 source={{uri: user.image}} />
            : <Icon style={{margin: 10}} size={30} name='camera-outline'/>
              }
          </ImageButton>
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


const ImageButton = ({children, userImage, deleteImage}) => {
  const { showActionSheetWithOptions } = useActionSheet();
  const dispatch = useDispatch();
  const pickImage = async () => {
    const res = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      allowsEditing: true,
      aspect: [200, 200]
    })
    .then(data=> {
      if(!data.canceled){
        saveImage(data.assets[0].uri)
      }
    })
    .catch(error => console.log(error));
  }
  const saveImage = async (uri) => {
    const filename = new Date().getTime() + '.jpg';
    const dest = imgDir + filename;
    await FileSystem.copyAsync({from: uri, to: dest})
  }
  const createImage = async () => {
    const res = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
      aspect: [200, 200]
    })
    .then(data=> {
      console.log(data)
    })
    .catch(e => alert(e))
  }


  const onPress = () => {
    const options = userImage === null ? ['Нове фото', 'Вибрати з галереї'] : ['Нове фото', 'Вибрати з галереї', 'Видалити фото'];
    const destructiveButtonIndex = 2;
    const cancelButtonIndex = 10;

    showActionSheetWithOptions({
      options,
      containerStyle: {borderTopLeftRadius: 12, borderTopEndRadius: 12},
      destructiveButtonIndex,
      cancelButtonIndex
    }, (selectedIndex) => {
      switch (selectedIndex) {
        case 0:
          createImage();
          break;
        case 1:
          pickImage();
          break;  
        case destructiveButtonIndex:
          deleteImage()
      }});
  }

  return (
    <EditImageButton activeOpacity={0.5} onPress={onPress}>
      {children}
    </EditImageButton>
  )
};


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
background-color: #eaeaea;
border-radius: 25px;
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