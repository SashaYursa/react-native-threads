import { View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import Thread from '../components/Thread/Thread';
import { loadThreads } from '../store/actions/threadsActions';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

const Threads = ({navigation}) => { 
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(loadThreads())
  }, [dispatch]);

  const moveToBranch = (thread) => {
    navigation.navigate('Branch', {thread});
  }

  const threads = useSelector(state=> state.threads.threads)
  const loading = useSelector(state=> state.threads.loading)
  return loading 
  ? (
    <View style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <ActivityIndicator size='large'/>
    </View>
  )
  : threads  
  ? (
    <ScrollView>
    <View style={{flex: 1, margin: 0, padding: 0, backgroundColor: "#fff"}}>
        {threads.map(thread=> (
        <TouchableOpacity key={thread.id} activeOpacity={1} onPress={()=>moveToBranch(thread)} style={{borderBottomWidth: 1, borderBottomColor: '#e6e3e3', flexDirection: 'column', marginTop: 10}}>
          <Thread moveToBranch={moveToBranch} thread={thread}/>
        </TouchableOpacity>
        ))}
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