import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styled from 'styled-components'
import { TextInput } from 'react-native-paper'

const Login = () => {
  return (
    <View>
        <LoginContainer>
            <Logo source={require('../../assets/logo.png')}/>
            <LoginForm>
                <LoginInput placeholder='Логін'/>
                <LoginInput placeholder='Пароль'/>
            </LoginForm>
            <LoginButton>
                <Text style={{color: '#fff'}}>
                    Увійти
                </Text>
            </LoginButton>
        </LoginContainer>
      
    </View>
  )
}

const LoginContainer = styled.View`
padding-top: 30px;
height: 100%;
display: flex;
flex-direction: column;
justify-content: flex-end;
align-items: center;
background-color: #ebf8fa;
`
const Logo = styled.Image`
margin-bottom: 30%;
height: 100px;
width: 100px;
object-fit: contain;
border-radius: 60px;
overflow: hidden;
`

const LoginInput = styled.TextInput`
width: 100%;
background-color: #fff;
padding: 15px 15px;
font-size: 16px;
border: 1px solid #c9c9c9;
border-radius: 12px;

`
const LoginForm = styled.View`
margin-bottom: 10px;
display: flex;
flex-direction: column;
gap: 10px;
width: 100%;
padding: 0 10px;
`

const LoginButton = styled.TouchableOpacity`
 background-color: #2a5cf5;
 width: 95%;
 border-radius: 20px;
 padding: 15px 10px;
 text-align: center;
 align-items: center;
 margin-bottom: 10%;
`



export default Login