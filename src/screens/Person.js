import { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import ProfileContainer from '../components/ProfileContainer/ProfileContainer';
import { loadPersonData, loadPersonThreads, setPersonThreadLike } from '../store/actions/personActions';
import Thread from '../components/Thread/Thread';
import { ActivityIndicator } from 'react-native-paper';
import PersonProfile from '../components/PersonProfile/PersonProfile';
import { useMemo } from 'react';

const Person = ({ route, navigation }) => {
  const routeData = route.params;
  const dispatch = useDispatch();
  const personThreads = useSelector(state => state.person.personThreads);
  const personData = useSelector(state => state.person.personInfo.data);
  const personDataLoading = useSelector(state => state.person.personInfo.loading);
  const showThread = personData.is_private === 0 || (personData.isSubscribed && personData.is_private === 1)
  const user = useSelector(state => state.user.user);
  const onRefresh = () => {
    dispatch(loadPersonData(user.id, routeData));
    dispatch(loadPersonThreads(routeData.id));
  }
  useEffect(()=> {
    dispatch(loadPersonData(user.id, routeData));
    dispatch(loadPersonThreads(routeData.id));
  }, [route.params])
  const addLike = useMemo(()=>(threadId) => {
    dispatch(setPersonThreadLike(user.id, threadId));
  }, [])
  const moveToBranch = (thread) => {
    navigation.navigate('Branch', {thread});
  }
  const threads = useMemo(()=>(!personThreads.threads.length ? <Text style={{fontSize: 18, alignSelf: 'center'}}>Треди відсутні</Text> : personThreads?.threads?.map(thread=>(
    <TouchableOpacity key={thread.id} activeOpacity={1} onPress={()=>moveToBranch(thread)} style={{borderBottomWidth: 1, borderBottomColor: '#e6e3e3', flexDirection: 'column', marginTop: 10}}>
      <Thread displayReply={true} thread={thread} addLike={addLike} navigation={navigation}/>
    </TouchableOpacity>))), [personThreads]);
  return (
<ProfileContainer refreshing={personThreads.loading} onRefresh={onRefresh}>
      <PersonProfile personData={personData} personDataLoading={personDataLoading} userId={user.id}/>
      {!personThreads.loading
      ? showThread 
        ? <View style={{flex: 1, backgroundColor: '#fff', flexDirection: 'column'}}>
            {threads}
          </View>
        : <View style={{alignItems: 'center',flex: 1, backgroundColor: '#fff' }}><Text style={{fontSize: 28}}>Акаунт закритий</Text></View>
      : <View style={{flex: 1, backgroundColor: '#fff', marginTop: 30}}>
          <ActivityIndicator size={'small'}/>
        </View>
      }

      </ProfileContainer>
  )
}


export default Person