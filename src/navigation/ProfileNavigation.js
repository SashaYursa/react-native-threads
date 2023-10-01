import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native'
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
import UserEditWindow from '../screens/UserEditWindow';
import Icon from 'react-native-vector-icons/Ionicons'
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import { useDispatch, useSelector } from 'react-redux';
import SaveUser from '../screens/SaveUser';

const Stack = createStackNavigator();
const ProfileNavigation = () => {
  const isEdit = useSelector(state=> state.user.userIsEdited)
  const editedUser = useSelector(state => state.user.editedUser)
  const user = useSelector(state => state.user.user)
  const dispatch = useDispatch();
  return (
    <ActionSheetProvider>
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
              <Text style={{marginRight: 10, fontWeight: 700, fontSize: 18, color: isEdit ? '#000' : 'gray'}} onPress={()=>{
                if(isEdit){
                navigation.navigate('UploadWindow');
               } 
              }}>Готово</Text>
            )
        },
    }}} component={UserEditWindow} />
    <Stack.Screen name='UploadWindow' options={{
    }} component={SaveUser}/>
   </Stack.Navigator>
   </ActionSheetProvider>
  )
}


const closeModal = (navigation) => {
  navigation.getParent().setOptions({tabBarStyle: {display: 'flex'}});
  navigation.goBack();
}

export default ProfileNavigation