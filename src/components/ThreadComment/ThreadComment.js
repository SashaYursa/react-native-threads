import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { GRAY_TEXT, USER_IMAGE_URL } from '../../constants';
import Icon from 'react-native-vector-icons/Ionicons';
import ActionButtons from '../ActionButtons/ActionButtons';
import ActionButton from '../ActionButton/ActionButton';
import { useDispatch } from 'react-redux';
import { setCommentLike } from '../../store/actions/branchActions';
const ThreadComment = ({comment, hideReplies, haveReply, addReply, user}) => {
    //console.log(comment, '----comm')
    const [isLiked, setIsLiked] = useState(false)
    const dispatch = useDispatch();
    useEffect(()=> {
      setIsLiked(Boolean(comment.likes.find(like => like.user_id === user.id)))
    }, [comment.likes])
    //console.log(isLiked)
    const replyInfo = comment?.reply_info[0];
    const desiredDate = new Date(comment.created_at);
    const currentDate = new Date();
    const timeDifference = currentDate - desiredDate;
    const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));

    const handleLike = () => {
      console.log(comment.id, '-----> comment id')
      dispatch(setCommentLike(user.id, comment.id));
    }
    const userImage = comment.user_image ? {uri: USER_IMAGE_URL + comment.user_image} : require('../../../assets/default-user-image.png');
  
    return (
      <CommentContainer>
      <ImageContainer>
        <UserImage source={userImage}/>
        {haveReply &&
        <ThreadElement/>
        } 
        { (hideReplies && replyInfo.preview_images !== 0) &&(
          <PreviewImages>
          {replyInfo.preview_images?.map((image, i) =>{ 
          return(
              <Image key={i} style={{position: 'absolute', marginStart: 8.5, left: (8 * i), width: 15, backgroundColor: '#fff', height: 15, borderRadius: 7.5}} source={image.image ? {uri: USER_IMAGE_URL + image.image} : require('../../../assets/default-user-image.png')}/>
          )})}
          </PreviewImages>)
        }
  
      </ImageContainer>
      <CommentTextContainer>
        <UserInfoContainer>
        <UserName>{comment.user_name}</UserName>
        <CreatedAt>{hoursAgo} ч.</CreatedAt>
        <TouchableOpacity>
          <Icon size={18} name='ellipsis-horizontal'/>
        </TouchableOpacity>
        </UserInfoContainer>
        <Text>{comment.comment_data}</Text>
        <ActionButtons>
          <ActionButton size={28} name={isLiked ? 'heart' : 'heart-outline'} color={isLiked ? '#c92246' : '#000'} handleClick={handleLike} />
          {comment.reply_to === null &&
          <ActionButton name='chatbubble-outline' handleClick={()=>(addReply({name: comment.user_name, commentId: comment.id}))} />
          }
        </ActionButtons>
        <View style={{marginTop: 15, flexDirection: 'row'}}>
          {
          (haveReply && comment.reply_to === null) &&
          <Text style={{color: GRAY_TEXT, fontSize: 16}}>Відповіді {replyInfo.count_reply} · </Text>
          }
          <Text style={{color: GRAY_TEXT, fontSize: 16}}>{comment.likes_count} відмітки "Подобається"</Text>
        </View>
      </CommentTextContainer>
    </CommentContainer>
    )
  }
const CommentContainer = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 0 10px 10px 10px;
`
const ImageContainer = styled.View`
display: flex;
flex-direction: column;
align-items: center;
`
const PreviewImages = styled.View`
position: relative;
display: flex;
flex-direction: row;
justify-content: center;
align-self: flex-start;
margin-bottom: 15px;
`
const CommentTextContainer = styled.View`
flex-grow: 1;
margin-left: 10px;
justify-content: flex-start;
align-items: flex-start;
`
const ThreadElement = styled.View`
flex: 1;
border-left-width: 2px;
border-color: #c9c9c9;
margin: 5px 0;
`

const UserImage = styled.Image`
width: 40px;
height: 40px; 
border-radius: 20px;
`
const UserInfoContainer = styled.View`
display: flex;
flex-direction: row;
gap: 10px;
`
const UserName = styled.Text`
font-weight: 700;
font-size: 14px;
flex-grow: 1;
`
const CreatedAt = styled.Text`
font-size: 14px;
font-weight: 400;
color: ${GRAY_TEXT};
`


export default ThreadComment