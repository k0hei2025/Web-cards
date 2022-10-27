import React, {FC} from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import styled from '@emotion/native'
import {useFonts , IndieFlower_400Regular} from '@expo-google-fonts/dev'
import Decklist from './Decklist'
import {NavigatorScreenParams  } from '@react-navigation/native'


type RootStackParamList = {
  navigation:any
}
const Homepage:FC<RootStackParamList> =({navigation})=> {
  
      let [fontsLoaded , error ] = useFonts({
        IndieFlower_400Regular
      })
  
        return (
             <View style={style.parentWrapper}>
            <Text style={style.textWrapper}>Create new Deck</Text>
             <Decklist navigation={navigation} />
            <TouchableOpacity  onPress={()=>navigation.navigate('addDeck')}>
              <Text style={style.StButton}>Add Deck</Text>
            </TouchableOpacity>
            </View>
          )
      }

const style  = StyleSheet.create({
  parentWrapper:{
   height:'100%',
   flex:1,
   textAlign:'center',
   margin:40,
   alignItems:'center'
  },
  textWrapper:{
    fontFamily:'IndieFlower_400Regular',
    fontSize:46,
    fontWeight:'bold'
  },
  StButton:{
    fontFamily:'IndieFlower_400Regular',
    fontSize:18
  }
})


export default Homepage