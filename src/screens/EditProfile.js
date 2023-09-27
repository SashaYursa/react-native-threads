import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/Ionicons'
import { compareUsers, editUserData } from '../store/actions/UserActions'
import { useDispatch } from 'react-redux'
const EditProfile = ({route, navigation}) => {
  const [editedData, setEditedData] = useState(route.params.data);
  const dispatch = useDispatch();
  useEffect(()=>{
    navigation.setOptions({presentation: 'modal',
    title: `Редагування: ${route.params.title}`,
    headerLeft: () => {
      return (
          <Icon size={30} onPress={()=>navigation.goBack()} name="close-outline"/>
      )
    },
    headerRight: () => {
      return (
        <Text style={{marginRight: 10, fontWeight: 700, fontSize: 18, color:  '#000'}} onPress={()=>{
        dispatch(editUserData(route.params.editedData, editedData));
        
        navigation.navigate('UserEditWindow')
        }}>Готово</Text>
      )
    },})
  }, [editedData])
  return (
    <Container>
      <Title>{route.params.title}</Title>
      <Input
      value={editedData}
      onChangeText={text=>setEditedData(text)}
      multiline={true}
      numberOfLines={10}
      style={{ height:200, textAlignVertical: 'top',}}/>
    </Container>
  )
}
const Container = styled.View`
display:flex;
flex-direction: column;
align-self: center;
background-color: #fff;
margin-top: 10px;
border: 1px solid #c9c9c9;
border-radius: 12px;
width: 95%;
overflow: hidden;
`
const Title = styled.Text`
font-size: 16px;
font-weight: 700;
color: #000;
margin: 10px 0 0 10px;
`
const Input = styled.TextInput`
background-color: #fff;
padding: 10px;
padding-right: 20px;
`

export default EditProfile