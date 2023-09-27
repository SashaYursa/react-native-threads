import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { useActionSheet } from '@expo/react-native-action-sheet';
import { useDispatch } from 'react-redux';
import ImageActionSheet from './ImageActionSheet';
import { USER_IMAGE_URL } from '../../constants';
import styled from 'styled-components';
import { editUserData } from '../../store/actions/UserActions';
import Icon from 'react-native-vector-icons/Ionicons'

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
const imgDir = FileSystem.documentDirectory + 'images/';

const UserImage = ({userImage}) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const chooseImage = async () => {
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
  const createImage = async () => {
    const res = await ImagePicker.launchCameraAsync({
      quality: 1,
      allowsEditing: true,
      aspect: [200, 200]
    })
    .then(data=> {
      if(!data.canceled){
        saveImage(data.assets[0].uri);
      }
      
    })
    .catch(e => alert(e))
  }

  const saveImage = async (uri) => {
    const filename = new Date().getTime() + '.jpg';
    const dest = imgDir + filename;
    await FileSystem.deleteAsync(imgDir);
    await FileSystem.copyAsync({from: uri, to: dest})
    .then( ()=> {
       return FileSystem.readDirectoryAsync(imgDir)
    })
    .then(data=> dispatch(editUserData('image', dest)))
    .catch(error => console.log(error));
  }
  
  const deleteImage = () => {
    dispatch(editUserData('image', null));
  }
  return (
    <ImageActionSheet  chooseImage={chooseImage} createImage={createImage} deleteImage={deleteImage}>
      {userImage !== null || isLoading
        ? <UserImageItem onLoadStart={e => {
            setIsLoading(true)
          }}
          onLoadEnd={e =>setIsLoading(false)}
          source={{uri: userImage}} />
        : <Icon style={{margin: 10}} size={30} name='camera-outline'/>
        }
    </ImageActionSheet>
  )
};


const UserImageItem = styled.Image`
border-radius: 25px;
background-color: #eaeaea;
width: 50px;
height: 50px;
object-fit: cover;
`
export default UserImage