import { View, Text, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react'
import RegisterForm from '../components/Forms/RegisterForm'
import styled from 'styled-components'
import useKeyboard from '../hooks/useKeyboard'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, removeUser, setError } from '../store/actions/UserActions'
import { useIsFocused } from '@react-navigation/native'

const Register = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(removeUser());
  }, [isFocused])

  const handleRegister = (login, password) => {
    
    if(login.length > 0 && password.length > 0){
      dispatch(registerUser({login, password}))
    }
    else{
      dispatch(setError("Заповніть всі поля"))
    }
  }
  const error = useSelector(state => state.user.error);

  return (
    <KeyboardAvoidingView
    behavior='heigth'>
    <RegisterContainer>
        <Logo source={require('../../assets/logo.png')}/>
        {error && <Text style={{color: 'red', fontSize: 16}}>{error}</Text>}
        <RegisterForm handleRegister={handleRegister}/>
    </RegisterContainer>
    </KeyboardAvoidingView>
  )
}
const RegisterContainer = styled.View`
padding-top: 40px;
height: 100%;
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: center;
background-color: #ebf8fa;
`
const Logo = styled.Image`
margin-bottom: 200px;
height: 100px;
width: 100px;
object-fit: contain;
border-radius: 60px;
overflow: hidden;
`
export default Register