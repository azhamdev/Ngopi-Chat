import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Home from '../../screens/Home/Home'
import Login from '../../screens/Login/Login'
import Register from '../../screens/Register/Register'
import GetStarted from '../../GetStarted';
import UploadFoto from '../../screens/Upload';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from '../../screens/Profile';
import BottomNavigator from '../../components/BottomNavigator';
import Chat from '../../screens/Chat';
import SplashScreen from '../../screens/Splash';
import MessagesPage from '../../screens/Messages';
const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
        <Tab.Navigator tabBar={props => <BottomNavigator {...props} />}>
            <Tab.Screen name='Home' component={Home} options={{ headerShown: false }} />
            <Tab.Screen name='Messages' component={MessagesPage} options={{ headerShown: false }} />
            <Tab.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
        </Tab.Navigator>
    )
}

export default function MainStack() {
    return (
        <Stack.Navigator initialRouteName='Splash'>
            <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
            <Stack.Screen name="GetStarted" component={GetStarted} options={{ headerShown: false }} />
            <Stack.Screen name="Upload Foto" component={UploadFoto} options={{ headerShown: false }} />
            <Stack.Screen name="MainApp" component={MainApp} options={{ headerShown: false }} />
            <Stack.Screen name="Chat" component={Chat} options={{ headerShown: false }} />
            <Stack.Screen name="Messages" component={MessagesPage} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}