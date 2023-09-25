import { createStackNavigator } from '@react-navigation/stack';
import { View, Text } from 'react-native'
import Profile from '../screens/Profile';
import EditProfile from '../screens/EditProfile';
const Stack = createStackNavigator();
const ProfileNavigation = () => {
  return (
   <Stack.Navigator>
    <Stack.Screen name='Profile' options={{
        headerShown: false
    }} component={Profile} />
    <Stack.Screen name='EditProfile' options={{
        presentation: 'modal',
        title: 'Редагування'
    }} component={EditProfile} />
   </Stack.Navigator>
  )
}

export default ProfileNavigation