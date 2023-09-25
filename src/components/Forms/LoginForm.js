import { View, Text } from 'react-native'
import React, { useState } from 'react'
import styled from 'styled-components'
import FormInput from '../FormInput/FormInput';
import AuthForm from './AuthForm';

const LoginForm = ({handleLogin}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthForm handleAction={()=>handleLogin(login, password)} actionText='Увійти'>
      <FormInput value={login} setValue={setLogin} placeholder="Логін" secure={false}/>
      <FormInput value={password} setValue={setPassword} placeholder="Пароль" secure={true}/>
    </AuthForm>
  )
}
export default LoginForm