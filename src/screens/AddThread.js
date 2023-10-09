import { View, Text, Image, TextInput, TouchableOpacity, Modal } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/Ionicons'
import ThreadAdditions from '../components/ThreadAdditions/ThreadAdditions'
import { useDispatch, useSelector } from 'react-redux'
import { GRAY_TEXT, USER_IMAGE_URL } from '../constants'
import { addThread, clearData, deleteThreadError, setAddThreadLoading, setThreadError, setThreadTextToStore  } from '../store/actions/addThreadActions'
import ModalInfoWindow from '../components/ModalInfoWindow/ModalInfoWindow'
import { ActivityIndicator } from 'react-native-paper'
const MAX_TEXT_LENGHT = 500;
const AddThread = ({navigation}) => {
    const dispatch = useDispatch();
    const errors = useSelector(state => state.addThread.errors);
    const user = useSelector(state => state.user.user);
    console.log(user)
    const newThread = useSelector(state => state.addThread.thread);
    const loading = useSelector(state => state.addThread.loading);
    const [threadText, setThreadText] = useState(newThread.text)
    const [emptyErrors, setEmptyErrors] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    console.log(loading, '->>>> loading');
    useEffect(()=> {
        if(Object.keys(errors).length === 0){
            setEmptyErrors(true)
        }
        else{
            setEmptyErrors(false)
        }
    }, [errors])
    useEffect(() => {
        const timeout = setTimeout(() => {
            dispatch(setThreadTextToStore(threadText));
        }, 2000)
        return ()=> {
            clearTimeout(timeout)
        }
    }, [threadText])
    const changeText = (text) => {
        if(text.length > MAX_TEXT_LENGHT){
            dispatch(setThreadError({type: 'textError', value: `${text.length}/${MAX_TEXT_LENGHT}`}))
        }
        else if(errors?.textError){
            dispatch(deleteThreadError('textError'));
        }
        setThreadText(text);
    }
    const handleAddThread = () => {
        if(emptyErrors){
            setModalIsOpen(true);
            dispatch(setAddThreadLoading(true));
            dispatch(addThread({authorId: user.id, data: newThread.text, images: newThread.images}))
        }
    }
    const moveToMain = () => {
        setModalIsOpen(false);
        dispatch(clearData());
        setThreadText('');
        navigation.navigate('Threads');
    }
    const addMoreThread = () => {
        dispatch(clearData());
        setThreadText('');
        setModalIsOpen(false);
    }
  return (
    <View style={{flex: 1, overflow: 'hidden'}}>
        <AddThreadContainer>
            <ImageContainer>
                <Image style={{width: 40, height: 40, borderRadius: 20, objectFit: 'contain', backgroundColor: 'gray'}} source={{uri: user.image}}/>
            </ImageContainer>
            <DataContainer>
                <UserNameContainer>
                <UserName>{user.name}</UserName>     
                </UserNameContainer>
                <FormContainer>
                    <ThreadInput multiline={true} style={errors?.textError ? {color: 'red'} : {color: '#000'}} value={threadText} onChangeText={changeText} placeholder="Напишіть щось..."/>
                    {errors?.textError &&
                    <ErrorText>{errors?.textError}</ErrorText>
                    }
                    <ThreadAdditions />
                </FormContainer>
            </DataContainer>
        </AddThreadContainer>
        <AddThreadActions>
            <ErrorText>{errors?.imageError}</ErrorText>
            <ErrorText>{errors?.loadError}</ErrorText>
            <ActionButton onPress={handleAddThread} disabled={!emptyErrors && newThread.text === ''}>
                <ActionButtonText style={ emptyErrors && newThread.text !== '' ? {color: '#0f55f7'} : {color: GRAY_TEXT} }>Опублікувати</ActionButtonText>
            </ActionButton>
        </AddThreadActions>
        <ModalInfoWindow open={modalIsOpen}>
            <ModalContainer>  
            {!loading
            ? <>
            <ModalText>Додано успішно</ModalText>
            <ActionModalButtons>
                <ActionModalButton onPress={moveToMain}>
                    <ActionModalText>На головну</ActionModalText>
                </ActionModalButton>
                <ActionModalButton onPress={addMoreThread}>
                    <ActionModalText>Додати ще один</ActionModalText>
                </ActionModalButton>
            </ActionModalButtons>
            </>
            :<ActivityIndicator/>
            }
            </ModalContainer>
        </ModalInfoWindow>
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

const ModalContainer = styled.View`
width: 300px;
border-radius: 12px;
padding: 10px;
background-color: #fff;
align-items: center;
justify-content: center;
`
const AddThreadActions = styled.View`
flex-direction: row;
background-color: #fff;
justify-content: flex-end;
align-items: center;
justify-content: space-between;
padding: 0 10px;
`
const ModalText = styled.Text`
font-size: 16px;
font-weight: 700;
color: #000;
align-self: center;
`
const ActionModalButtons = styled.View`
margin-top: 20px;
flex-direction: row;
gap: 10px;
`
const ActionModalButton = styled.TouchableOpacity`
border: 1px solid #eaeaea;
border-radius: 8px;
flex: 1;
align-items: center;
background-color: #fff;
padding: 6px 8px;
align-items: center;
justify-content: center;
`

const ActionModalText = styled.Text`
font-size: 14px;
font-weight: 700;
text-align: center;
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
font-weight: 700;
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
`
const ThreadInput = styled.TextInput`
background-color: #fff;
border: none;
color: #000;
font-size: 16px;
flex-grow: 1;
max-width: 320px;
`
const UserName = styled.Text`
font-size: 16px;
color: #000;
font-weight: 700;
`
export default AddThread