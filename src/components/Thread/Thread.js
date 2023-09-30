import { View, Text, Image, TouchableOpacity, ScrollView, Button } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { useState } from 'react'
import {   GRAY_TEXT, THREAD_IMAGE_URL, USER_IMAGE_URL } from '../../constants'
import ImageView from 'react-native-image-viewing';
import ActionButtons from '../ActionButtons/ActionButtons';
import styled from 'styled-components';
import { Dimensions } from "react-native";
import { useRef } from 'react';

const width = Dimensions.get('window').width;
const Thread = ({thread}) => {
    const [imageOpened, setimageOpened] = useState(false);
    const currentDate = new Date();
    const images = thread.images.map(image=> ({uri: THREAD_IMAGE_URL + image.image_name}))
    const desiredDate = new Date(thread.created_at);
    const timeDifference = currentDate - desiredDate;
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
    console.log(thread.comments.preview_images)
    const openImage = () => {
         setimageOpened(true);
    }
    if(imageOpened) return(<ImageView
        images={images}
        imageIndex={0}
        visible={imageOpened}
        onRequestClose={() => setimageOpened(false)}
      />)
    return (
        <Container>
            <RowContainer style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start', justifyContent: 'space-between'}}>
                <LeftItemsContainer>
                <View style={{position: 'relative'}}>
                    <Image style={{width: 45, height: 45, borderRadius: 50, objectFit: 'cover'}} source={{uri: USER_IMAGE_URL + thread.author_image}}/>   
                    {!thread?.isSubscribed &&
                    <TouchableOpacity style={{backgroundColor: 'white', paddingLeft: 1.7, borderRadius: 50, position: 'absolute', top: 30, right: -5}}>
                        <Icon size={22} style={{}} name='add-circle'/>
                    </TouchableOpacity>
                    }         
                </View>
                {thread.comments.comments_count > 0 &&
                <>
                <ThreadElement/>
                <PreviewImages>
                    {thread.comments.preview_images.map((image, i) => (
                        <Image style={{position: 'absolute',marginHorizontal: 13, left: (8 * i), width: 15, height: 15, borderRadius: 7.5}} source={{uri: `${USER_IMAGE_URL + image.image}`}}/>
                    ))}
                </PreviewImages>
                </>
                }
                </LeftItemsContainer>
                <RightItemsContainer>
                    <NameContainer>
                        <Text style={{flex: 1, fontWeight: 700, fontSize: 16}}>{thread.author_name}</Text>
                        <Text style={{color: GRAY_TEXT}}>{hoursAgo} ч.</Text>
                        <TouchableOpacity>
                            <Icon size={18} name='ellipsis-horizontal'/>
                        </TouchableOpacity>
                    </NameContainer>
                <Text style={{fontSize: 16, flexShrink: 1 }}>{thread.data}</Text>
            {thread.images &&
            <ScrollView showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={true} 
                        style={{overflow: 'visible', paddingLeft: 60, left: -65, width}}> 
                <View style={{flexDirection: 'row', gap: 10, marginTop: 10, marginEnd: 70}}>
                    {thread.images.map(image => <ThreadImage key={image.id} openImage={openImage} image={image}/>)}
                </View>
            </ScrollView>
            }
            <ActionButtons/>
            <View style={{marginTop: 15, flexDirection: 'row'}}>
                {
                thread.comments.comments_count > 0 &&
                <Text style={{color: GRAY_TEXT, fontSize: 16}}>Відповіді {thread.comments.comments_count} · </Text>
                }
                <Text style={{color: GRAY_TEXT, fontSize: 16}}>{thread.likes_count} отметок "Нравится"</Text>
            </View>
            </RightItemsContainer>
            </RowContainer>
        </Container>
  )
}

const Container = styled.View`
border-bottom-width: 1px;
border-color: #c9c9c9;
`
const RowContainer = styled.View`
flex-direction: row;
`

const LeftItemsContainer = styled.View`
display: flex;
flex-direction: column;
`
const ThreadElement = styled.View`
flex: 1;
border-left-width: 2px;
border-color: #c9c9c9;
margin: 10px 0 10px 23px;
`
const PreviewImages = styled.View`
position: relative;
display: flex;
flex-direction: row;
margin-bottom: 25px;
justify-content: center;
`

const RightItemsContainer = styled.View`
display: flex;
flex-direction: column;
padding: 10px;
flex: 1;
overflow: visible;
`
const NameContainer = styled.View`
flex-direction: row;
align-items: flex-start;
justify-content: space-between;
gap: 10px;
`

const ThreadImage = ({image, openImage}) => {
    return (
        <TouchableOpacity onPress={openImage} activeOpacity={1}>
            <Image style={{borderRadius: 8, width: 300, height: 300}} source={{uri: THREAD_IMAGE_URL + image.image_name}}/>
        </TouchableOpacity>
    )
}

export default Thread