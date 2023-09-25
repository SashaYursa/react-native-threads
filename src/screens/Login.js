import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { ActivityIndicator, TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUser, loginUser, removeUser, setError } from '../store/actions/UserActions'
import LoginForm from '../components/Forms/LoginForm'
import { useIsFocused } from '@react-navigation/native'

const Login = () => {
    const isFocused = useIsFocused();
    const dispatch = useDispatch();
    const error = useSelector(state => state.user.error);
    const loading = useSelector(state => state.user.loading); 
    useEffect(()=>{
        const loginUser = async ()=> {
            const userId = await AsyncStorage.getItem('userId');
            if(userId !== null){
            dispatch(loadUser(userId));
            }
            else{
                dispatch(removeUser());
            }
        }
        loginUser();
    }, [isFocused])

    const handleLogin = (login, password) => {
        if(login.length > 0 && password.length > 0){
            dispatch(loginUser({login, password}));
        }
        else{
            dispatch(setError("Заповніть всі поля"))
        }
    }

  return loading 
  ? (<ActivityIndicator/>)
  :(
    <KeyboardAvoidingView>
        <LoginContainer>
            <Logo source={require('../../assets/logo.png')}/>
            {error && <Text style={{color: 'red', fontSize: 16}}>{error}</Text>}
            <LoginForm handleLogin={handleLogin}/>
        </LoginContainer>
    </KeyboardAvoidingView>
  )
}

const LoginContainer = styled.View`
padding-top: 40px;
height: 100%;
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: center;
background-color: #ebf8fa;
`
const Logo = styled.Image`
margin-bottom: 270px;
height: 100px;
width: 100px;
object-fit: contain;
border-radius: 60px;
overflow: hidden;
`

export default Login