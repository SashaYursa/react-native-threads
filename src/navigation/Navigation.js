import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from '../screens/Profile'
import Threads from '../screens/Threads'
import { Image, TextInput } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import Users from '../screens/Users'
import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components'

const Navigation = createBottomTabNavigator()

export default () => {
    return(
        <NavigationContainer>
            <Navigation.Navigator>
                    <Navigation.Screen name='Threads' options={{
                        headerTitle: () => (<HeaderImage source={require('../../assets/logo.png')}/>),
                        headerTitleAlign: 'center',
                        tabBarIcon: ({focused})=>(focused ?<Icon name='reorder-three' size={28}/> : <Icon name='reorder-three' color='purple' size={28}/>)
                    }} component={Threads}/>
                    <Navigation.Screen name='Профіль' options={{
                        tabBarIcon: ({focused})=>(focused ?<Icon name='person-circle' size={28}/> : <Icon name='person-circle-outline' color='purple' size={28}/>)
                    }} component={Profile}/>
                <Navigation.Screen name='Користувачі' options={{
                    headerShown: false,
                    tabBarIcon: ({focused})=>(focused ?<Icon name='people' size={28}/> : <Icon name='people-outline' color='purple' size={28}/>)
                    }} component={Users}/>
            </Navigation.Navigator>
        </NavigationContainer>
    )
}

const HeaderImage = styled.Image`
width: 40px;
height: 40px;
`