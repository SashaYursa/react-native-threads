import { View, Text, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/Ionicons'

import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import ThreadLoadedImages from '../ThreadLoadedImages/ThreadLoadedImages';
import { useDispatch, useSelector } from 'react-redux';
import { deleteThreadError, deleteThreadImage, setThreadError, setThreadImages } from '../../store/actions/addThreadActions';
const MAX_SELECTED = 5;
const imgDir = FileSystem.documentDirectory + 'threadImages/';

const ThreadAdditions = () => {
  const dispatch = useDispatch();
  const images = useSelector(state=> state.addThread.thread.images);
  const errors = useSelector(state => state.addThread.errors);
    const chooseImage = async () => {
        const res = await ImagePicker.launchImageLibraryAsync({
          quality: 1,
          aspect: [4, 3],
          selectionLimit: MAX_SELECTED,
          allowsMultipleSelection: true,
        })
        .then(data=> {
          if(!data.canceled){
            if((images.length + data.assets.length) > MAX_SELECTED){
              dispatch(setThreadError({type: 'imageError', value: `Макс. кількість зображень: ${MAX_SELECTED}`}))
            }
            dispatch(setThreadImages(data.assets));
            //saveImage(data.assets[0].uri)
          }
        })
        .catch(error => console.log(error));
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
    const deleteImage = (imageUri) => {
      if((images.length - 1) <= MAX_SELECTED){
        dispatch(deleteThreadError('imageError'));
      }
      dispatch(deleteThreadImage(imageUri));
    }

    return (
    <ImagesContainer>
      { images &&
      <ThreadLoadedImages deleteImage={deleteImage} images={images} />
      }
      <ImagesInput disabled={!!errors?.imageError} onPress={()=>chooseImage()}><Icon color={errors.imageError ? 'red' : '#000'} size={25} name='attach-outline'/></ImagesInput>
    </ImagesContainer>
  )
}
const ImagesContainer = styled.View`
display: flex;
flex-direction: column;
gap: 10px;
`
const ImagesInput = styled.TouchableOpacity`
margin-top: 10px;
`

export default ThreadAdditions