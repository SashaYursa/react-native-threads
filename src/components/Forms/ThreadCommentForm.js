import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { useRef } from 'react';
import { useEffect } from 'react';
const ThreadCommentForm = ({handleComment, threadAuthor, replyTo, removeReply, openComment}) => {
    const input = useRef();
    useEffect(()=> {
      if(input !== undefined && openComment){
        input.current.focus();
      }
    })
    const [comment, setComment] = useState('');
    const sendComment = () => {
      handleComment(comment, replyTo);
      removeReply();
      setComment('');
    }
    return (
      <View style={{flexDirection: 'col'}}>
        {replyTo !== null &&
        <ReplyToInfoContainer >
          <Icon size={20} name='arrow-forward-outline'/>
          <Text style={{flex: 1, fontSize: 16, color: "#000"}}>Відповідь користувачу: {replyTo.name}</Text>
          <TouchableOpacity onPress={removeReply} style={{padding: 2, backgroundColor: '#cccccc', borderRadius: 20}}><Icon size={25} style={{marginLeft: 2}} name='close-circle-outline'/></TouchableOpacity>
        </ReplyToInfoContainer>
        }
      <CommentInputContainer>
        <View style={{backgroundColor: '#cccccc', paddingHorizontal: 5, marginVertical: 10, alignSelf: 'stretch', justifyContent: 'center', borderTopStartRadius: 18, borderBottomLeftRadius: 18}}>
          <Image style={{width: 30, height: 30, borderRadius: 15}} source={{uri: threadAuthor.image}}/>
        </View>
        <CommentInput value={comment} ref={input} onChangeText={setComment} placeholder={`Коментар для ${threadAuthor.name}`}/>
        <CommentSend onPress={sendComment}>
          <Icon size={25} color='#fff' name='arrow-up-outline'/>
        </CommentSend>
      </CommentInputContainer>
      </View>
    )
  }

  
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
overflow: visible;
border-radius: 0 18px 18px 0;
width: 298px;
`
const ReplyToInfoContainer = styled.View`
display: flex;
flex-direction: row;
align-items: center;  
padding: 2px 10px;
gap : 10px;
border-bottom-width: 1px;
border-bottom-color: gray;
background-color: #f5f5f5;
`
const CommentInputContainer = styled.View`
flex-direction: row;
align-items: center;
margin: 0 10px;
`

export default ThreadCommentForm