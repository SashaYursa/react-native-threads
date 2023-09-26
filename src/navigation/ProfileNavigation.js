import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native'
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import EditDescription from '../screens/UserEditWindow';
import UserEditWindow from '../screens/UserEditWindow';
import Icon from 'react-native-vector-icons/Ionicons'
import { useState } from 'react';

const Stack = createStackNavigator();
const ProfileNavigation = () => {
  const [isEdited, setIsEdited] = useState(false)
  return (
   <Stack.Navigator>
    <Stack.Screen name='Profile' options={{
        headerTitle: 'Профіль',
        headerTitleAlign: 'center',
        headerShown: true
    }} component={Profile} />
    <Stack.Screen name='UserEditValueWindow'  component={EditProfile}/>
    <Stack.Screen name='UserEditWindow' options={({navigation})=> {
       return {
        presentation: 'modal',
        title: 'Редагування',
        headerTitleAlign: 'center',
        headerLeft: () => {
          return (
            <Icon style={{marginLeft: 10}} size={30} onPress={()=>closeModal(navigation)} name="close-outline"/>
          )
        },
        headerRight: () => {
            return (
              <Text style={{marginRight: 10, fontWeight: 700, fontSize: 18,/* color: isEdited ? '#000' : 'gray'*/}} onPress={()=>{
               /*if(isEdited)*/ closeModal(navigation)
              }}>Готово</Text>
            )
        },
    }}} component={UserEditWindow} />
   </Stack.Navigator>
  )
}


const closeModal = (navigation) => {
  navigation.getParent().setOptions({tabBarStyle: {display: 'flex'}});
  navigation.goBack();
}

export default ProfileNavigation