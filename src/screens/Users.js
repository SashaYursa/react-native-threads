import { View, Text, ScrollView, TextInput, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import styled from 'styled-components'
import Icon from 'react-native-vector-icons/Ionicons';
import { GRAY_TEXT } from '../constants';
import User from '../components/Users/User';
const users = [
  {id: 12, name: "Alex", subscribers: 143, isSubscribed: true, image: 'https://lh3.googleusercontent.com/ffSdVkK55wv9buGr9i4g1YCp1BpYo6u5ctpR3vcMdHGqLSvlRTQcz-m4IKtOriVFM3nSH0kyOnWKC5vx=w544-h544-l90-rj'},
  {id: 154, name: "Dasha", subscribers: 890, isSubscribed: false, image: 'https://lh3.googleusercontent.com/90oX4HFegm33qgQCCNXHeSrWa7HUuyWtnAF8bep_nGKWP-yGLS5vW1S2GWKx04RwZoHvnzYXTiRak0U=w544-h544-l90-rj'},
  {id: 16675, name: "_Jazhevika", subscribers: 54365, isSubscribed: false, image: 'https://lh3.googleusercontent.com/0HmJl4UyXLEK44n1EUA2NZxqf8dDVqnBs7FDBtShUy3v-yVz3ZePCfpIxuio-aXh13unRvnNvofqdQME=w544-h544-l90-rj'},
  {id: 17, name: "Yan", subscribers: 123123, isSubscribed: false, image: 'https://lh3.googleusercontent.com/ffSdVkK55wv9buGr9i4g1YCp1BpYo6u5ctpR3vcMdHGqLSvlRTQcz-m4IKtOriVFM3nSH0kyOnWKC5vx=w544-h544-l90-rj'},
  {id: 1212, name: "Anna", subscribers: 1423, isSubscribed: true, image: 'https://lh3.googleusercontent.com/0HmJl4UyXLEK44n1EUA2NZxqf8dDVqnBs7FDBtShUy3v-yVz3ZePCfpIxuio-aXh13unRvnNvofqdQME=w544-h544-l90-rj'},
]
const Users = () => {

  return (
  <Container>
    <ScrollView> 
      <SearchContainer>
        <SearchIconContainer>
          <Icon style={{paddingLeft: 5}} color={GRAY_TEXT} name='search' size={24}/>
        </SearchIconContainer>
        <SearchInput placeholder='Пошук'/>
      </SearchContainer>
      <UsersContainer>
        {users.map(user=>(<User key={user.id} user={user}/>))}
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