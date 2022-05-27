import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer } from '@react-navigation/native'
import MainStack from './src/routes/MainStack';
import FlashMessage from 'react-native-flash-message'
import Fire from './src/helpers/config/Fire';




export default function App({ navigation }) {
  return (
    <>
      <NavigationContainer>
        <MainStack />
      </NavigationContainer>
      <FlashMessage position="top" />
    </>
  )
}