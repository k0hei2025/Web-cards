import React, { FC } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from '../components/Homepage';
import AddDeck from '../components/AddDeck/AddDeck';
import AddCard from '../components/AddCard/AddCard';
import countDownScreen from '../components/countDownScreen/countDownScreen';
import learningScreen from '../components/learningScreen/learningScreen';
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
      component={countDownScreen}
      options={{headerShown:false}}
      />
      <Stack.Screen
      name='learningScreen'
      component={learningScreen}
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