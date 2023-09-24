import { View, Text, Image, TouchableOpacity, ScrollView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import Thread from '../components/Thread/Thread';
import { loadThreads, removeThreads } from '../store/actions/threadsActions';
import { ActivityIndicator, Button } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { THREAD_IMAGE_URL } from '../constants';
import Draggable from 'react-native-draggable';
import styled from 'styled-components';


const Threads = () => { 
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadThreads())
  }, [dispatch]);

  const threads = useSelector(state=> state.threads.threads)
  const loading = useSelector(state=> state.threads.loading)
  
  return loading 
  ? (
    <View style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size='large'/>
    </View>
  )
  : (
    <ScrollView>
    <View style={{flex: 1, margin: 0, padding: 0, backgroundColor: "#fff"}}>
        {threads.map(thread=> <Thread key={thread.id} thread={thread}/>)}
    </View>
    </ScrollView>
  )
}

export default Threads