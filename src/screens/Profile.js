import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { lazy, useEffect } from 'react'
import { GRAY_TEXT, USER_IMAGE_URL } from '../constants'
import styled from 'styled-components'
import Thread from '../components/Thread/Thread'
import { useDispatch, useSelector } from 'react-redux'
import { removeUser } from '../store/actions/UserActions'
import { ActivityIndicator } from 'react-native-paper'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadUserThreads } from '../store/actions/userThreadsActions'
import ProfileInfo from '../components/ProfileInfo/ProfileInfo'
import ProfileContainer from '../components/ProfileContainer/ProfileContainer'

const Profile = ({ navigation }) => {
  const dispatch = useDispatch();
  const user = useSelector(state=> state.user.user)
  const loading = useSelector(state => state.user.loading)
  const threads = useSelector(state => state.userThreads.threads)
  const threadsLoading = useSelector(state => state.userThreads.loading)
  const logOut = async () => {
    await AsyncStorage.removeItem('userId');
    dispatch(removeUser())
  }
  const  onRefresh = () => {
    dispatch(loadUserThreads(user.id))
  }
  useEffect(()=> {
    dispatch(loadUserThreads(user.id))
  },[user.id])

  const moveToBranch = (thread) => {
    navigation.navigate('Branch', {thread});
  }
  const addLike = (threadId) => {
    console.log(threads)
  }
  return loading 
  ? ( <ActivityIndicator size={'large'}/> ) 
  : (
      <ProfileContainer refreshing={loading} onRefresh={onRefresh}>
      <ProfileInfo user={user}/>
      <ActionsContainer>
        <ActionButton onPress={()=> navigation.navigate('UserEditWindow')}>
          <ActionText>Редагувати профіль</ActionText>
        </ActionButton>
        <ActionButton>
          <ActionText>Поширити профіль</ActionText>
        </ActionButton>
        <ActionButton onPress={logOut}>
          <ActionText>Вийти</ActionText>
        </ActionButton>
      </ActionsContainer>
      { !threadsLoading 
      ? (<View style={{flex: 1, backgroundColor: '#fff', flexDirection: 'column'}}>
        {threads.length
        ? threads.map(thread=>(
          <TouchableOpacity key={thread.id} activeOpacity={1} onPress={()=>moveToBranch(thread)} style={{borderBottomWidth: 1, borderBottomColor: '#e6e3e3', flexDirection: 'column', marginTop: 10}}>
            <Thread displayReply={true} thread={thread} addLike={addLike} navigation={navigation}/>
          </TouchableOpacity>))
        : (<View style={{alignItems: 'center',flex: 1, backgroundColor: '#fff' }}><Text style={{fontSize: 32}}>No content here</Text></View>)
      }
      </View>)
      : (<View style={{flex: 1, backgroundColor: '#fff', marginTop: 30}}>
        <ActivityIndicator size={'small'}/>
      </View>)
      }
    </ProfileContainer>
  )
}

const ActionsContainer = styled.View`
display: flex;
flex-direction: row;
justify-content: space-between;
gap: 10px;
padding: 5px 10px;
border-bottom-width: 1px;
border-bottom-color: #e6e3e3;
padding-bottom: 10px;
`
const ActionButton = styled.TouchableOpacity`
border: 1px solid #eaeaea;
border-radius: 8px;
flex: 1;
align-items: center;
background-color: #fff;
padding: 6px 8px;
align-items: center;
justify-content: center;
`

const ActionText = styled.Text`
font-size: 14px;
font-weight: 700;
text-align: center;
`



export default Profile