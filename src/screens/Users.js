import { View, Text, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/Ionicons';
import { GRAY_TEXT } from '../constants';
import { loadUsers } from '../store/actions/usersActions';
import { useDispatch, useSelector } from 'react-redux';
import { ActivityIndicator } from 'react-native-paper';
import SearchUser from '../components/SearchUser/SearchUser';

const Users = () => {
  const userId = useSelector(state => state.user.user.id);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadUsers(userId))
  }, [dispatch]);

  const users = useSelector(state=> state.users.users)
  const loading = useSelector(state=> state.users.loading)
  return loading 
  ? (<ActivityIndicator size={'large'}/>)
  : (
  <Container>
    <ScrollView> 
      <SearchContainer>
        <SearchIconContainer>
          <Icon style={{paddingLeft: 5}} color={GRAY_TEXT} name='search' size={24}/>
        </SearchIconContainer>
        <SearchInput placeholder='Пошук'/>
      </SearchContainer>
      <UsersContainer>
        {users.map(user=>(<SearchUser key={user.id} user={user}/>))}
      </UsersContainer>
    </ScrollView>
    </Container>
  )
}
const Container = styled.View`
flex-direction: column;
flex: 1;
padding-top: 30px;
background-color: #fff;
`

const SearchContainer = styled.View`
display: flex;
flex-direction: row;
padding: 10px;
align-items: center;
`
const SearchIconContainer = styled.View`
  background-color: #eaeaea;
  height: 100%;
  align-items: center;
  justify-content: center;
  height: 50px;
  border-radius: 12px 0 0 12px;
`
const SearchInput = styled.TextInput`
flex: 1;
height: 100%;
padding: 5px;
border-radius: 0 12px 12px 0;
border: 1px solid #eaeaea;
background-color: #eaeaea;
color: ${GRAY_TEXT};
font-size: 16px;
;
`
const UsersContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
`

export default Users