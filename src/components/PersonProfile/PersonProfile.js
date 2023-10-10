import { View, Text } from 'react-native'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react';
import ProfileInfo from '../ProfileInfo/ProfileInfo';
import styled from 'styled-components';
import { ActivityIndicator } from 'react-native-paper';
import { GRAY_TEXT } from '../../constants';
import { personSubscribe } from '../../store/actions/personActions';
import { useState } from 'react';

const PersonProfile = ({personData, personDataLoading, userId}) => {
    const [disableButton, setDisable] = useState(false); 
    useEffect(()=> {
        setDisable(personDataLoading)
    }, [personDataLoading])
  const dispatch = useDispatch();
  const handleSubscribe = () => {
    setDisable(true);
    dispatch(personSubscribe(personData.id));
  }
  return (
    <>
    {personDataLoading &&
    <Container>
        <ActivityIndicator/>
    </Container>        
    }
    <ProfileInfo user={personData} />
    <ActionsContainer>
        <ActionButton disabled={disableButton} onPress={handleSubscribe}>
          <ActionText style={personData?.isSubscribed ? {color: GRAY_TEXT} : {color: '#000'}}>{!personData?.isSubscribed ? 'Підписатися' : 'Відписатися'}</ActionText>
        </ActionButton>
        <ActionButton disabled={disableButton}>
          <ActionText>Поширити</ActionText>
        </ActionButton>
      </ActionsContainer>
    </>
  )
}
const Container = styled.View`
position: absolute;
flex-grow: 1;
width: 100%;
height: 100%;
padding-top: 40px;
`

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

export default PersonProfile