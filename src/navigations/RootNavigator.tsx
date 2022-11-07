import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from '../components/Homepage';
import AddDeck from '../components/AddDeck/AddDeck';
import AddCard from '../components/AddCard/AddCard';
import CountDownScreen from '../components/countDownScreen/CountDownScreen';
import LearningScreen from '../components/learningScreen/LearningScreen';
import CompleteDeckScreen from '../components/completeDeckScreen/CompleteDeckScreen';
import RegistrationScreen from '../components/Registration/Registration';
import PasswordSetScreen from '../components/passwordSetScreen/PasswordSetScreen';
import LoginScreen from '../components/Login/LoginScreen';

const RootContainer:FC = () => {
  type RootStackParamList = {
    Home:undefined,
    addDeck:undefined,
    addCard:undefined,
    countDown:undefined,
    learningScreen:undefined,
    deckComplete:undefined,
    registration:undefined,
    passwordSetScreen:undefined,
    login:undefined
  }
  const Stack = createStackNavigator<RootStackParamList>()
  return (
    <Stack.Navigator initialRouteName='registration'>
      <Stack.Screen
       name='Home'
       component={Homepage}
       options={{headerShown:false}}
     />
     <Stack.Screen
      name='addDeck'
      component={AddDeck}
      options={{headerShown:false}}
    
      />
      <Stack.Screen
      name='registration'
      component={RegistrationScreen}
      options={{headerShown:false}}
      />
      <Stack.Screen 
       name='passwordSetScreen'
       component={PasswordSetScreen} 
       options={{headerShown:false}}
      />
      <Stack.Screen
      name='addCard'
      component={AddCard}
      options={{headerShown:false}}
      />
      <Stack.Screen
      name='countDown'
      component={CountDownScreen}
      options={{headerShown:false}}
      />
      <Stack.Screen
      name='learningScreen'
      component={LearningScreen}
      options={{headerShown:false}}
      />
      <Stack.Screen
       name='deckComplete'
        component={CompleteDeckScreen} 
        options={{headerShown:false}}     
         />
      <Stack.Screen 
      name='login'
       component={LoginScreen}
        options={{headerShown:false}}
         />
      </Stack.Navigator>
  )
}

export default RootContainer