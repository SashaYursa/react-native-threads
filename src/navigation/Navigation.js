import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Profile from '../screens/Profile'
import Threads from '../screens/Threads'
import { Image, TextInput } from 'react-native'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import Users from '../screens/Users'
import Icon from 'react-native-vector-icons/Ionicons'
import styled from 'styled-components'
import Login from '../screens/Login'
import { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Register from '../screens/Register'

const Navigation = createBottomTabNavigator()

export default () => {
    const userIsAuth = useSelector(state=> state.user.isLogined);
    return userIsAuth 
    ? (
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
    : (
        <NavigationContainer>
            <Navigation.Navigator>
                <Navigation.Screen name='Login' options={{
                        headerTitle: 'Вхід',
                        headerTitleAlign: 'center',
                        tabBarIcon: ({focused})=>(focused ?<Icon name='log-in' size={28}/> : <Icon name='log-in-outline' color='purple' size={28}/>)
                }} component={Login}/>
                <Navigation.Screen name='SignUp' options={{
                        headerTitle: 'Реєстрація',
                        headerTitleAlign: 'center',
                        tabBarIcon: ({focused})=>(focused ?<Icon name='person-add' size={24}/> : <Icon name='person-add-outline' color='purple' size={24}/>)
                }} component={Register}/>
            </Navigation.Navigator>
        </NavigationContainer>
    )
}

const HeaderImage = styled.Image`
width: 40px;
height: 40px;
`