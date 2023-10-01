import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addThreadComment, loadBranch, loadCommentReplies } from '../store/actions/branchActions'
import Thread from '../components/Thread/Thread'
import { GRAY_TEXT, USER_IMAGE_URL } from '../constants'
import { ActivityIndicator, TextInput } from 'react-native-paper'
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
  //console.log(comments, '------comments')
  const user = useSelector(state => state.user.user);
  const addComment = (comment) => {
    dispatch(addThreadComment(comment, user.id, thread.id))
  }

  const showReplies = (comment) => {
    //console.log(comment)
    dispatch(loadCommentReplies(comment.id))
  }

  return thread?.author_id 
  ? (
  <View style={{backgroundColor: '#fff', flex: 1, flexDirection: 'column'}}>
  <ScrollView>
    
      <Thread thread={thread}/>
      <CommentsContainer>
      { comments
        ? comments.map((comment, i) => {
          return (
          <CommentsBlock key={i} showReplies={showReplies} comments={comment}/>
        )})
        : <ActivityIndicator style={{marginTop: 10}} size='large' />
      }
      </CommentsContainer>
    </ScrollView>
    <ThreadCommentInput handleComment={addComment} threadAuthor={{name: thread.author_name, image: user.image}}/>
    </View>
  )
  : (<View>
    <Text>False</Text>
  </View>)
}
const ThreadCommentInput = ({handleComment, threadAuthor}) => {
  const [comment, setComment] = useState('');
  const sendComment = () => {
    handleComment(comment);
    setComment('');
  }
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', marginHorizontal: 10}}>
      <View style={{backgroundColor: '#cccccc', paddingHorizontal: 5, marginVertical: 10, alignSelf: 'stretch', justifyContent: 'center', borderTopStartRadius: 18, borderBottomLeftRadius: 18}}>
        <Image style={{width: 30, height: 30, borderRadius: 15}} source={{uri: threadAuthor.image}}/>
      </View>
      <CommentInput value={comment} onChangeText={setComment} placeholder={`Коментар для ${threadAuthor.name}`}/>
      <CommentSend onPress={sendComment}>
        <Icon size={25} color='#fff' name='arrow-up-outline'/>
      </CommentSend>
    </View>
  )
}

const CommentsBlock = ({comments, showReplies}) => {
  //console.log(comments[0])
  return comments.length > 1
  ?(
    <View style={{marginTop: 10, borderBottomWidth: 1, borderColor: '#c9c9c9'}}>
    {
      comments.map((comment, index) => {
        return (
       <ThreadComment key={index} comment={comment} hideReplies={false} haveReply={(index + 1) === comments.length ? false : true }/>
      )})
    }
    </View>
  )
  : (
    <CommentButton style={{marginTop: 10}} activeOpacity={.5} onPress={()=>showReplies(comments[0])} >
      {
        <ThreadComment comment={comments[0]} hideReplies={true} haveReply={(comments[0].reply_info[0].count_reply > 0) ? true : false}/>
      }
    </CommentButton>
  )
}

const ThreadComment = ({comment, hideReplies, haveReply}) => {
  //console.log(comment, '----comm')
  const replyInfo = comment?.reply_info[0];
  console.log(replyInfo)
  const desiredDate = new Date(comment.created_at);
  const currentDate = new Date();
  const timeDifference = currentDate - desiredDate;
  const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));
  return (
    <CommentContainer>
    <ImageContainer>
      <UserImage source={{uri: USER_IMAGE_URL + comment.user_image}}/>
      {haveReply &&
      <ThreadElement/>
      } 
      { (hideReplies && replyInfo.preview_images !== 0) &&(
        <PreviewImages>
        {replyInfo.preview_images?.map((image, i) =>{ 
        return(
            <Image key={i} style={{position: 'absolute', marginStart: 8.5, left: (8 * i), width: 15, height: 15, borderRadius: 7.5}} source={{uri: `${USER_IMAGE_URL + image.image}`}}/>
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
      <ActionButtons/>
      <View style={{marginTop: 15, flexDirection: 'row'}}>
        {
        haveReply &&
        <Text style={{color: GRAY_TEXT, fontSize: 16}}>Відповіді {replyInfo.count_reply} · </Text>
        }
        <Text style={{color: GRAY_TEXT, fontSize: 16}}>{comment.likes_count} відмітки "Подобається"</Text>
      </View>
    </CommentTextContainer>
  </CommentContainer>
  )
}
const CommentsContainer = styled.View`
flex: 1;
`
const CommentSend = styled.TouchableOpacity`
padding: 5px;
border-radius: 20px;
margin-left: 5px;
background-color: #5CA0F2;
`
const CommentInput = styled.TextInput`
background-color: #cccccc;
font-size: 14px;
padding: 5px;
flex-grow: 1;
color: #000;
margin: 10px 0;
border-radius: 0 18px 18px 0;
`
const CommentContainer = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
padding: 0 10px 10px 10px;
`
const CommentButton = styled.TouchableOpacity`
border-bottom-width: 1px;
border-color: #c9c9c9;
`
const PreviewImages = styled.View`
position: relative;
display: flex;
flex-direction: row;
justify-content: center;
align-self: flex-start;
margin-bottom: 15px;
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
const ImageContainer = styled.View`
display: flex;
flex-direction: column;
align-items: center;
`
const ThreadElement = styled.View`
flex: 1;
border-left-width: 2px;
border-color: #c9c9c9;
margin: 5px 0;
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