import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from '../components/Homepage';
import AddDeck from '../components/AddDeck/AddDeck';
import AddCard from '../components/AddCard/AddCard';
import CountDownScreen from '../components/countDownScreen/CountDownScreen';
import LearningScreen from '../components/learningScreen/LearningScreen';
import CompleteDeckScreen from '../components/completeDeckScreen/CompleteDeckScreen';

const RootContainer:FC = () => {
  type RootStackParamList = {
    Home:undefined,
    addDeck:undefined,
    addCard:undefined,
    countDown:undefined,
    learningScreen:undefined,
    deckComplete:undefined
  }
  const Stack = createStackNavigator<RootStackParamList>()
  return (
    <Stack.Navigator initialRouteName='Home'>
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
      </Stack.Navigator>
  )
}

export default RootContainer