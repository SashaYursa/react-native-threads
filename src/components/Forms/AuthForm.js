import { View, Text } from 'react-native'
import React from 'react'
import styled from 'styled-components'
const AuthForm = ({children, handleAction, actionText, disabledButton}) => {
  return (
<AuthFormContainer>
      <AuthInputContainer>
        {children}
      </AuthInputContainer>
      <AuthButton style={disabledButton ? {backgroundColor: 'gray'}: {}  } disabled={disabledButton} onPress={()=>handleAction()}>
          <Text style={{color: '#fff'}}>
            {actionText}
          </Text>
      </AuthButton>
    </AuthFormContainer>
  )
}

const AuthFormContainer = styled.View`
flex-direction: column;
width: 100%;
padding-inline: 10px;
align-items: center;

`

const AuthInputContainer = styled.View`
margin-bottom: 10px;
display: flex;
flex-direction: column;
gap: 10px;
width: 100%;
padding: 0 10px;
`

const AuthButton = styled.TouchableOpacity`
 background-color: #2a5cf5;
 width: 95%;
 border-radius: 20px;
 padding: 15px 10px;
 text-align: center;
 align-items: center;
 margin-bottom: 10%;
`

export default AuthForm