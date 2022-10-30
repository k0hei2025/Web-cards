import { NavigationContainer } from '@react-navigation/native'
import React from 'react'
import RootNavigator from './RootNavigator'

const Index=()=> {
  return (
    <NavigationContainer>
      {/* <View> */}
    <RootNavigator/>
    {/* </View> */}
    </NavigationContainer>
  )
}

// const style = StyleSheet.create({
//   parentContainer:{
//       fontFamily:'IndieFlower_400Regular'
//   }
// })



export default Index