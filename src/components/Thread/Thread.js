import { View, Text, Image, TouchableOpacity, ScrollView, Button } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import React, { useState, memo } from 'react'
import {   GRAY_TEXT, THREAD_IMAGE_URL, USER_IMAGE_URL } from '../../constants'
import ImageView from 'react-native-image-viewing';
import ActionButtons from '../ActionButtons/ActionButtons';
import styled from 'styled-components';
import { Dimensions } from "react-native";
import { useRef } from 'react';
import ActionButton from '../ActionButton/ActionButton';
import { useDispatch, useSelector } from 'react-redux';
import { setLike } from '../../store/actions/threadsActions';
import { useEffect } from 'react';
import { personSubscribe } from '../../store/actions/personActions';

const width = Dimensions.get('window').width;
const Thread = memo(({thread, displayReply, navigation, addLike}) => {
        const [imageOpened, setimageOpened] = useState(false);
        const [openedImageIndex, setOpenedImageIndex] = useState(0)
        const currentDate = new Date();
        const user = useSelector(state=> state.user.user);
        const [isLiked, setIsLiked] = useState(false) 
        useEffect(()=> {
            setIsLiked(Boolean(thread.likes.find(like => like.user_id === user.id)))
        }, [thread.likes])
        const dispatch = useDispatch();
        const images = thread.images.map(image=> ({uri: THREAD_IMAGE_URL + image.image_name}))
        const [subscribed, setSubscribed] = useState(thread.isSubscribed);
        const desiredDate = new Date(thread.created_at);
        const timeDifference = currentDate - desiredDate;
        const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
        const addComment = () => {
            navigation.navigate('Branch', {thread, openComment: true});
        }
        const subscribeToAuthor = () => {
            if(!subscribed){
                dispatch(personSubscribe(thread.author_id));
                setSubscribed(3)
            }
        }
        const repostThread = () => {
            console.log('repostThread')
        }
        const sendThread = () => {
            console.log('sendThread')
        }
        
        const openImage = (imageId) => {
            setOpenedImageIndex(imageId);
            setimageOpened(true);
        }
        const userImage =  thread.author_image ? {uri: USER_IMAGE_URL +  thread.author_image} : require('../../../assets/default-user-image.png');
        return (
            <Container>
                <RowContainer style={{ flexDirection: 'row', gap: 10, alignItems: 'flex-start', justifyContent: 'space-between'}}>
                    <LeftItemsContainer>
                    <TouchableOpacity onPress={subscribeToAuthor} style={{position: 'relative'}}>
                        <Image style={{width: 45, height: 45, borderRadius: 50, objectFit: 'cover'}} source={userImage}/>   
                        {!subscribed &&
                        <View style={{backgroundColor: 'white', paddingLeft: 1.7, borderRadius: 50, position: 'absolute', top: 30, right: -5}}>
                            <Icon size={22} style={{}} name='add-circle'/>
                        </View>
                        }   
                        {subscribed === 3 &&
                        <View style={{backgroundColor: 'white', paddingLeft: 1.7, borderRadius: 50, position: 'absolute', top: 30, right: -5}}>
                            <Icon size={22} style={{}} name='checkmark-outline'/>
                        </View>
                        }      
                    </TouchableOpacity>
                    {(thread.comments.comments_count > 0 && displayReply) &&
                    <>
                    <ThreadElement/>
                    <PreviewImages>
                        {thread.comments.preview_images.map((image, i) => (
                            <Image key={i} style={{position: 'absolute',marginHorizontal: 13, left: (8 * i), width: 15, height: 15, borderRadius: 7.5, backgroundColor: '#fff'}} source={image.image ? {uri: `${USER_IMAGE_URL + image.image}`} : require('../../../assets/default-user-image.png')}/>
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
                            style={{overflow: 'visible', paddingLeft: 70, left: -75, width}}> 
                    <View style={{flexDirection: 'row', gap: 10, marginTop: 10, marginEnd: 75}}>
                        {thread.images.map((image, i) => <ThreadImage key={image.image_name + i} index={i} openImage={openImage} image={image}/>)}
                    </View>
                </ScrollView>
                }
                <ActionButtons>
                    <ActionButton size={28} name={isLiked ? 'heart' : 'heart-outline'} color={isLiked ? '#c92246' : '#000'} handleClick={()=> addLike(thread.id)} />
                    <ActionButton name='chatbubble-outline' handleClick={addComment} />
                    <ActionButton name='git-compare-outline' handleClick={repostThread} />
                    <ActionButton name='paper-plane-outline' handleClick={sendThread} />
                </ActionButtons>
                <View style={{marginTop: 15, flexDirection: 'row'}}>
                    {
                    thread.comments.comments_count > 0 &&
                    <Text style={{color: GRAY_TEXT, fontSize: 16}}>Відповіді {thread.comments.comments_count} · </Text>
                    }
                    <Text style={{color: GRAY_TEXT, fontSize: 16}}>{thread.likes_count} відмітки "Подобається"</Text>
                </View>
                </RightItemsContainer>
                </RowContainer>
                <ImageView
                    images={images}
                    imageIndex={openedImageIndex}
                    visible={imageOpened}
                    onRequestClose={() => setimageOpened(false)}
                />
            </Container>
      )
    }
)

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
margin-left: 10px;
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
margin-bottom: 27px;
justify-content: center;
`

const RightItemsContainer = styled.View`
display: flex;
flex-direction: column;
padding: 0 10px 10px ;
flex: 1;
overflow: visible;
`
const NameContainer = styled.View`
flex-direction: row;
align-items: flex-start;
justify-content: space-between;
gap: 10px;
`

const ThreadImage = ({image, openImage, index}) => {
    return (
        <TouchableOpacity onPress={() => openImage(index)} activeOpacity={1}>
            <Image
             style={{backgroundColor: '#dedede', borderRadius: 8, width: 300, height: 300}} source={{uri: THREAD_IMAGE_URL + image.image_name}}
             />
             </TouchableOpacity>
    )
}

export default Thread