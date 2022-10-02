import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Homepage from '../components/Homepage';


const RootContainer = () => {
  const Stack = createStackNavigator()
  return (
    <Stack.Navigator>
      <Stack.Screen
       name='/'
       component={Homepage}
       options={{headerShown:false}}
     />
    </Stack.Navigator>
  )
}

export default RootContainer