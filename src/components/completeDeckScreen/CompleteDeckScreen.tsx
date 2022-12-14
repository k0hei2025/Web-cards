import React,{useEffect} from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'

const CompleteDeckScreen = ({navigation}) => {

  useEffect(()=>{
   setTimeout(()=>{
    navigation.navigate('Home');
   },2000)
  },[])


  return (
    <View>
      <View>
        <Text style={style.headingWrapper}>Congratulations that's all for today</Text>
        <Image  style={{height:30,width:30}} source={require('../../../assets/smile.png')} />
        </View>
        <Text style={style.textSt} >Also complete your other decks</Text>
    </View>
  )
}

const style = StyleSheet.create({
  headingWrapper:{
    fontSize:32,
    fontFamily:'IndieFlower_400Regular',
    fontWeight:'bold'
  },
  textSt:{
    fontSize:20,
    fontFamily:'IndieFlower_400Regular',
  }
}) 

export default CompleteDeckScreen