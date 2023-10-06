import { useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import { useDispatch } from 'react-redux';
import ProfileInfo from '../components/ProfileInfo/ProfileInfo';
import ProfileContainer from '../components/ProfileContainer/ProfileContainer';
import styled from 'styled-components';

const Person = ({ route }) => {
  const userData = route.params;
  const dispatch = useDispatch();
  useEffect(()=> {
    console.log('changed')

  }, [route.params])
  console.log(userData)
  return (
<ProfileContainer>
      <ProfileInfo user={userData}/>
      <ActionsContainer>
        <ActionButton onPress={()=> {}}>
          <ActionText>Підписатися</ActionText>
        </ActionButton>
        <ActionButton>
          <ActionText>Поширити</ActionText>
        </ActionButton>
      </ActionsContainer>
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