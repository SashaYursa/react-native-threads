import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useRef, useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCommentReply, addThreadComment, loadBranch, loadCommentReplies, setBranchLike } from '../store/actions/branchActions'
import Thread from '../components/Thread/Thread'
import { ActivityIndicator, TextInput } from 'react-native-paper'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/Ionicons'
import ThreadComment from '../components/ThreadComment/ThreadComment'
import ThreadCommentForm from '../components/Forms/ThreadCommentForm'


const Branch = ({route, navigation}) => {
  const openComment = route.params.openComment;

  const input = useRef();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadBranch(route.params.thread));
  }, [route.params.thread])
  const thread = useSelector(state => state.branch.thread);
  const comments = useSelector(state => state.branch.comments);
  const user = useSelector(state => state.user.user);

  const [replyTo, setReplyTo] = useState(null);
  
  const addComment = (comment, replyTo) => {
    console.log(comment, replyTo)
    if(replyTo !== null){
      dispatch(addCommentReply(comment, user.id, thread.id, replyTo.commentId));
    }
    else{
      dispatch(addThreadComment(comment, user.id, thread.id))
    }
  }
  const addReplyToComment = (replyTo) => {
    setReplyTo(replyTo);
  }

  const removeReplyToComment = () => {
    setReplyTo(null);
  }
  const addLike = (threadId) => {
      dispatch(setBranchLike(user.id, threadId));
  }

  const showReplies = (comment) => {
    dispatch(loadCommentReplies(comment.id))
  }

  return thread?.author_id 
  ? (
  <View style={{backgroundColor: '#fff', flex: 1, flexDirection: 'column'}}>
  <ScrollView>
    
      <Thread thread={thread} displayReply={false} navigation={navigation} addLike={addLike} />
      <CommentsContainer>
      { comments
        ? comments.map((comment, i) => {
          return (
          <CommentsBlock key={i} addReply={addReplyToComment} user={user} showReplies={showReplies} comments={comment}/>
        )})
        : <ActivityIndicator style={{marginTop: 10}} size='large' />
      }
      </CommentsContainer>
    </ScrollView>
    <ThreadCommentForm openComment={openComment} commentInput={input} handleComment={addComment} replyTo={replyTo} removeReply={removeReplyToComment} threadAuthor={{name: thread.author_name, image: user.image}}/>
    </View>
  )
  : (<View>
    <Text>False</Text>
  </View>)
}


const CommentsBlock = ({comments, showReplies, addReply, user}) => {
  //console.log(comments[0])
  return comments.length > 1
  ?(
    <View style={{marginTop: 10, borderBottomWidth: 1, borderColor: '#c9c9c9'}}>
    {
      comments.map((comment, index) => {
        return (
       <ThreadComment key={index} comment={comment} user={user} addReply={addReply} hideReplies={false} haveReply={(index + 1) === comments.length ? false : true }/>
      )})
    }
    </View>
  )
  : (
    <CommentButton style={{marginTop: 10}} activeOpacity={.5} onPress={()=>showReplies(comments[0])} >
      {
        <ThreadComment comment={comments[0]} addReply={addReply} user={user} hideReplies={true} haveReply={(comments[0].reply_info[0].count_reply > 0) ? true : false}/>
      }
    </CommentButton>
  )
}


const CommentsContainer = styled.View`
flex: 1;
`

const CommentButton = styled.TouchableOpacity`
border-bottom-width: 1px;
border-color: #c9c9c9;
`


export default Branch