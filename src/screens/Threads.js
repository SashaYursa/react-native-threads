import { View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native'
import React, { useEffect } from 'react'
import Thread from '../components/Thread/Thread';
import { loadThreads, setLoading } from '../store/actions/threadsActions';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { useState } from 'react';

const Threads = ({navigation}) => { 
  
  const threads = useSelector(state=> state.threads.threads)
  console.log(threads, '---->threads threads');
  const user = useSelector(state => state.user.user);
  const loading = useSelector(state=> state.threads.loading)
  const onRefresh = useCallback(() => {
    dispatch(setLoading(true));
    dispatch(loadThreads(user.id)); 
  }, []);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadThreads(user.id))
  }, [dispatch, navigation]);

  const moveToBranch = (thread) => {
    navigation.navigate('Branch', {thread, openComment: false});
  }

  
  return loading 
  ? (
    <View style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size='large'/>
    </View>
  )
  : threads  
  ? (
    <ScrollView
    refreshControl={
      <RefreshControl refreshing={loading} onRefresh={onRefresh}/>
    }
    >
    <View style={{flex: 1, margin: 0, padding: 0, backgroundColor: "#fff"}}>
        {threads.map((thread, i)=> {
          return (
        <TouchableOpacity key={i} activeOpacity={1} onPress={()=>moveToBranch(thread)} style={{borderBottomWidth: 1, borderBottomColor: '#e6e3e3', flexDirection: 'column', marginTop: 10}}>
          <Thread key={thread.id} navigation={navigation} displayReply={true} thread={thread}/>
        </TouchableOpacity>
        )})}
    </View>
    </ScrollView>
  )
  : (
    <View>
      <Text>No threads</Text>
    </View>
  )
}

export default Threads