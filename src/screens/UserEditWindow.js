import { View, Text, TouchableOpacity, Image, Switch, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { compareUsers, editUserData } from '../store/actions/UserActions';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { DEFAULT_IMAGE_URL, USER_IMAGE_URL } from '../constants';
import FormItem, { EditLabel } from '../components/UserEdit/FormItem';
import UserImage from '../components/UserEdit/UserImage';

const UserEditWindow = ({navigation, route}) => {
  const [imageIsLoading, setImageIsLoading] = useState(false);
  const userIsPrivate = useSelector(state => state.user.editedUser.is_private);
  const [switchValue, setSwitchValue] = useState(false);
  const [isEdited, setIsEdited] = useState(false);
  const user = useSelector(state=> state.user.editedUser);
  const originalUser = useSelector(state=> state.user.user);
  const dispatch = useDispatch();
  useEffect(() => {

    dispatch(editUserData("is_private", switchValue));
  }, [switchValue])
  useEffect(() => {
    dispatch(compareUsers(user, originalUser));
  }, [dispatch])
  const navigate = (title, editedData, data) => {
    navigation.navigate('UserEditValueWindow', {title, editedData, data});
  }
  return (
  <Body>
    <Container>
      <EditItemsContainer>
        <FormItem title="Логін" value={user.name} editedData="name" navigate={navigate} />
        <UserImage userImage={user.image}/>
      </EditItemsContainer>
      <FormItem title="Опис" value={user.description} editedData="description" navigate={navigate} />
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
const Container = styled.View`
border: 1px solid #c9c9c9;
border-radius: 12px;
display: flex;
flex-direction: column;
width: 80%;
padding: 10px;
`



export default UserEditWindow