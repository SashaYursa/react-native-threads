import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loadBranch } from '../store/actions/branchActions'
import Thread from '../components/Thread/Thread'
import { GRAY_TEXT, USER_IMAGE_URL } from '../constants'
import { ActivityIndicator } from 'react-native-paper'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/Ionicons'
import ActionButtons from '../components/ActionButtons/ActionButtons'

const Branch = ({route}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadBranch(route.params.thread));
  }, [route.params.thread])
  const thread = useSelector(state => state.branch.thread);
  const comments = useSelector(state => state.branch.comments);
  return thread?.author_id ?(
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <Thread thread={thread}/>
      {
        comments 
        ? comments.map(comment => (
          <ThreadComment key={comment.id} comment={comment}/>
        ))
        : <ActivityIndicator style={{marginTop: 10}} size='large' />
      }
    </View>
  )
  : (<View>
    <Text>False</Text>
  </View>)
}

const ThreadComment = ({comment}) => {
  console.log(comment.reply_info, '--> comment');
  const desiredDate = new Date(comment.created_at);
  const currentDate = new Date();
  const timeDifference = currentDate - desiredDate;
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  return (
    <CommentContainer>
    <UserImage source={{uri: USER_IMAGE_URL + comment.user_image}}/>
    <CommentTextContainer>
      <UserInfoContainer>
      <UserName>{comment.user_name}</UserName>
      <CreatedAt>{hoursAgo} ч.</CreatedAt>
      <TouchableOpacity>
        <Icon size={18} name='ellipsis-horizontal'/>
      </TouchableOpacity>
      </UserInfoContainer>
      <Text>{comment.comment_data}</Text>
      <ActionButtons/>
    </CommentTextContainer>
  </CommentContainer>
  )
}
const CommentContainer = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 10px;
`

const UserImage = styled.Image`
width: 40px;
height: 40px; 
border-radius: 20px;
`
const CommentTextContainer = styled.View`
flex-grow: 1;
margin-left: 10px;
justify-content: flex-start;
align-items: flex-start;

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

export default Branch