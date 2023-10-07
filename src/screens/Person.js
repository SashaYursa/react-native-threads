import { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import ProfileInfo from '../components/ProfileInfo/ProfileInfo';
import ProfileContainer from '../components/ProfileContainer/ProfileContainer';
import styled from 'styled-components';
import { loadPersonData, loadPersonThreads } from '../store/actions/personActions';
import Thread from '../components/Thread/Thread';
import { ActivityIndicator } from 'react-native-paper';
import { GRAY_TEXT } from '../constants';

const Person = ({ route }) => {
  const routeData = route.params;
  const dispatch = useDispatch();
  const personThreads = useSelector(state => state.person.personThreads);
  const personData = useSelector(state => state.person.personInfo.data);
  console.log(personData, '-----adata')
  const user = useSelector(state => state.user.user);
  const threads = personThreads.threads;
  useEffect(()=> {
    dispatch(loadPersonData(user.id, routeData));
    dispatch(loadPersonThreads(routeData.id));
  }, [route.params])
  console.log(personData, '---->data')
  const addLike = () => {
    console.log('add Like person window')
  }
  return (
<ProfileContainer>
      {personData && 
      <ProfileInfo user={personData}/>
      }
      <ActionsContainer>
        <ActionButton onPress={()=> {}}>
          <ActionText style={personData?.isSubscribed ? {color: GRAY_TEXT} : {color: '#000'}}>{!personData?.isSubscribed ? 'Підписатися' : 'Відписатися'}</ActionText>
        </ActionButton>
        <ActionButton>
          <ActionText>Поширити</ActionText>
        </ActionButton>
      </ActionsContainer>
      { !personThreads.loading
      ? (<View style={{flex: 1, backgroundColor: '#fff', flexDirection: 'column'}}>
        {threads.length
        ? threads.map(thread=>(
          <TouchableOpacity key={thread.id} activeOpacity={1} onPress={()=>moveToBranch(thread)} style={{borderBottomWidth: 1, borderBottomColor: '#e6e3e3', flexDirection: 'column', marginTop: 10}}>
            <Thread displayReply={true} thread={thread} addLike={addLike}/>
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

export default Person