import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import RootNavigator from './RootNavigator'

const Index=()=> {
  return (
    <NavigationContainer>
    <RootNavigator/>
    </NavigationContainer>
  )
}

export default Index