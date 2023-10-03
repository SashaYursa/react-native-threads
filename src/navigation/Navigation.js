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
import EditProfile from '../screens/EditProfile'
import { createStackNavigator } from '@react-navigation/stack'
import ProfileNavigation from './ProfileNavigation'
import UserEditWindow from '../screens/UserEditWindow'
import Branch from '../screens/Branch'
import AddThread from '../screens/AddThread'


const Navigation = createBottomTabNavigator()
const Stack = createStackNavigator()
export default () => {
    const userIsAuth = useSelector(state=> state.user.isLogined);
    return userIsAuth 
    ? (
        <NavigationContainer>
            <Navigation.Navigator options={{
                tabBarStyle: {display: 'flex'},
            }}>
                    <Navigation.Screen name='Threads' options={{
                        headerTitle: () => (<HeaderImage source={require('../../assets/logo.png')}/>),
                        headerTitleAlign: 'center',
                        tabBarIcon: ({focused})=>(focused ?<Icon name='reorder-three' size={28}/> : <Icon name='reorder-three' size={28}/>)
                    }} component={Threads}/>
                    <Navigation.Screen name='AddThread' options={{
                        headerTitle: "Новий тред",
                        presentation: 'modal',
                        tabBarIcon: ({focused}) => (focused ? <Icon name='create' size={28}/> : <Icon name='create-outline' size={28}/> )
                    }} component={AddThread}/>
                    <Navigation.Screen name='ProfileNavigation' options={{
                        headerTitle: 'Профіль',
                        headerShown: false,
                        title: 'Профіль',
                        tabBarIcon: ({focused})=>(focused ?<Icon name='person-circle' size={28}/> : <Icon name='person-circle-outline' size={28}/>)
                    }} component={ProfileNavigation}/>
                    <Navigation.Screen name='Користувачі' options={{
                        headerShown: false,
                        tabBarIcon: ({focused})=>(focused ?<Icon name='people' size={28}/> : <Icon name='people-outline' size={28}/>)
                    }} component={Users}/>
                    <Navigation.Screen name='Branch' options={({navigation})=> ({
                        headerTitle: 'Гілка',
                        tabBarStyle: {display: 'none'},
                        headerLeft: ()=> {
                            return (
                                <Icon style={{marginLeft: 10}} size={30} onPress={()=>{
                                    navigation.goBack()
                                }} name="arrow-back-outline"/>
                              )
                        },
                        tabBarButton: ()=> null,
                    })} component={Branch}/>
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