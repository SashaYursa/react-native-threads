import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { TextInput } from 'react-native-paper'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUser, loginUser } from '../store/actions/UserActions'

const Login = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const error = useSelector(state => state.user.error);
    const loading = useSelector(state => state.user.loading);
    console.log(error)
    useEffect(()=>{
        const loginUser = async ()=> {
            const userId = await AsyncStorage.getItem('userId');
            if(userId !== null){
            dispatch(loadUser(userId));
            }
        }
        loginUser();
    }, [])

    const handleLogin = () => {
        if(login.length > 0 && password.length > 0){
            dispatch(loginUser({login, password}));
        }
    }

  return loading 
  ? (<View><Text>Loading</Text></View>)
  :(
    <View>
        <LoginContainer>
            <Logo source={require('../../assets/logo.png')}/>
            {error && <Text style={{color: 'red', fontSize: 16}}>Логін або пароль не дійсний</Text>}
            <LoginForm>
                <LoginInput value={login} onChangeText={e => setLogin(e)} placeholder='Логін'/>
                <LoginInput value={password} onChangeText={e => setPassword(e)} placeholder='Пароль'/>
            </LoginForm>
            <LoginButton onPress={handleLogin}>
                <Text style={{color: '#fff'}}>
                    Увійти
                </Text>
            </LoginButton>
        </LoginContainer>
      
    </View>
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
margin-bottom: auto;
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