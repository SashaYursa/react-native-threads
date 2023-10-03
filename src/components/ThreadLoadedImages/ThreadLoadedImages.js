import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/Ionicons'
const ThreadLoadedImages = ({images, deleteImage}) => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}
    showsHorizontalScrollIndicator={false}
    horizontal={true} 
    style={{}}> 
        <View style={{flexDirection: 'row', gap: 10, marginTop: 10, marginEnd: 75}}>
            {images.map((image, i) => (
            <ImageContainer key={image.uri + i}>
                <DeleteButton onPress={()=>deleteImage(image.uri)}><Icon size={20} color='#fff' name='close-circle-outline'/></DeleteButton>
                <Image  style={{borderRadius: 8, width: 300, height: 300}} source={{uri: image.uri}}/>
            </ImageContainer>
            ))}
        </View>
    </ScrollView>
  )
}

const ImageContainer = styled.View`
position: relative;
`
const DeleteButton = styled.TouchableOpacity`
position: absolute;
top: 10px;
right: 10px;
z-index: 2;
background-color: #000;
padding: 1px;
border-radius: 20px;
align-items: center;
justify-content: center;
padding-left: 2px;
`

export default ThreadLoadedImages