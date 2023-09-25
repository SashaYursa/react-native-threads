import { View, Text, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import FormInput from '../FormInput/FormInput'
import AuthForm from './AuthForm'
import { useDispatch, useSelector } from 'react-redux'
import { checkUserName, setError } from '../../store/actions/UserActions'
import Icon from 'react-native-vector-icons/Ionicons'
import useDebounce from '../../hooks/useDebounce'
const RegisterForm = ({handleRegister}) => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [buttonDisable, setButtonDisable] = useState(false);
  const dispatch = useDispatch();
  const isLoginEmpty = useSelector(state => state.user.isEmptyLogin);
  const debouncedLoginValue = useDebounce(login, 1000, setButtonDisable);
  const setCheckedLogin = (newLogin) => {
    setLogin(newLogin);
  }
  useEffect(()=> {
    dispatch(checkUserName(debouncedLoginValue))
  }, [debouncedLoginValue])
  const handleRegisterMiddleware = () => {
    if(password === passwordConfirm){
      handleRegister(login, password);
    }
    else if(!isLoginEmpty){
      dispatch(setError('Логін зайнято'));
    }
    else{
      dispatch(setError('Паролі не співпадають'));
    }
  }
  return (
  <AuthForm handleAction={handleRegisterMiddleware} actionText='Реєстрація' disabledButton={buttonDisable}>
    <InputContainer>
      <FormInput value={login} setValue={setCheckedLogin} placeholder="Логін" secure={false}/>
      <LoginIndicator>
        {isLoginEmpty && login !== ''
        ? <Icon size={40} color='#0ffc03' name='checkmark-outline'/>
        : <Icon size={40} color='#fc0f03' name='close-outline'/>
        }
      </LoginIndicator>
    </InputContainer>
      <FormInput value={password} setValue={setPassword} placeholder="Пароль" secure={true}/>
    <InputContainer>
      <FormInput value={passwordConfirm} setValue={setPasswordConfirm} placeholder="Повторення паролю" secure={true}/>
      <LoginIndicator>
        {password === passwordConfirm
        ? <Icon size={40} color='#0ffc03' name='checkmark-outline'/>
        : <Icon size={40} color='#fc0f03' name='close-outline'/>
        }
      </LoginIndicator>
    </InputContainer>
  </AuthForm>
  )
}

const InputContainer = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
align-items: center;
gap: 5px;
`
const LoginIndicator = styled.View`
flex-grow: .1;
background-color: #fff;
justify-content: center;
align-self: center;
padding: 8px;
align-items: center;
border: 1px solid #c9c9c9;
border-radius: 12px;
`

export default RegisterForm