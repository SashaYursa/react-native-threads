import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/Ionicons'
import ThreadAdditions from '../components/ThreadAdditions/ThreadAdditions'
import { useDispatch, useSelector } from 'react-redux'
import { GRAY_TEXT } from '../constants'
import { deleteThreadError, setThreadError, setThreadText } from '../store/actions/addThreadActions'
const MAX_TEXT_LENGHT = 500;
const AddThread = () => {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.addThread.errors);
    const text = useSelector(state => state.addThread.thread.text);
    console.log(text);
    const [emptyErrors, setEmptyErrors] = useState(true);
    useEffect(()=> {
        console.log('changed')
        if(Object.keys(errors).length === 0){
            setEmptyErrors(true)
        }
        else{
            setEmptyErrors(false)
        }
    }, [errors])
    const changeText = (text) => {
        if(text.length > MAX_TEXT_LENGHT){
            dispatch(setThreadError({type: 'textError', value: `${text.length}/${MAX_TEXT_LENGHT}`}))
        }
        else if(errors?.textError){
            dispatch(deleteThreadError('textError'));
        }
        dispatch(setThreadText(text));
    }
  return (
    <View style={{flex: 1}}>
        <AddThreadContainer>
            <ImageContainer>
                <Image style={{width: 40, height: 40, borderRadius: 20, objectFit: 'contain'}} source={{uri: 'https://cdn.pixabay.com/photo/2023/09/21/06/10/football-8266065_1280.jpg'}}/>
            </ImageContainer>
            <DataContainer>
                <UserNameContainer>
                <UserName>Alex</UserName>     
                </UserNameContainer>
                <FormContainer>
                    <ThreadInput style={errors?.textError ? {color: 'red'} : {color: '#000'}} value={text} onChangeText={changeText} placeholder="Напишіть щось..."/>
                    <ErrorText>{errors?.textError}</ErrorText>
                    <ThreadAdditions />
                </FormContainer>
            </DataContainer>
        </AddThreadContainer>
        <AddThreadActions>
            <ErrorText>{errors?.imageError}</ErrorText>
            <ActionButton disabled={!emptyErrors}>
                <ActionButtonText style={ emptyErrors ? {color: '#0f55f7'} : {color: GRAY_TEXT} }>Опублікувати</ActionButtonText>
            </ActionButton>
        </AddThreadActions>
    </View>
  )
}
const AddThreadContainer = styled.View`
flex-grow: 1;
background-color: #fff;
display: flex;
flex-direction: row;
padding: 10px;
gap: 10px;
`
const AddThreadActions = styled.View`
flex-direction: row;
background-color: #fff;
justify-content: flex-end;
align-items: center;
justify-content: space-between;
padding: 0 10px;
`
const ErrorText = styled.Text`
font-size: 14px;
font-weight: 400;
color: red;
`
const ActionButton = styled.TouchableOpacity`
background-color: #fff;
padding: 10px;
justify-self: flex-end;
`
const ActionButtonText = styled.Text`
font-size: 18px; 
font-weight: 700,
`
const ImageContainer = styled.View`
`
const DataContainer = styled.View`
display: flex;
flex-direction: column;
flex-grow: 1;
`
const UserNameContainer = styled.View`
`
const FormContainer = styled.View`
display: flex;
flex-direction: column;
flex-grow: 1;
`
const ThreadInput = styled.TextInput`
background-color: #fff;
border: none;
color: #000;
font-size: 16px;
`
const UserName = styled.Text`
font-size: 16px;
color: #000;
font-weight: 700;
`
export default AddThread