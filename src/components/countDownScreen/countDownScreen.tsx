import { NavigationProp } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { useRecoilState, useRecoilValue } from 'recoil';
import {deckInfoState} from '../../store/deckInfoState'

const CountDownScreen:FC = ({navigation}) => {

    let [countDown , setCountDown] = useState(3);
    const getDeck = useRecoilState(deckInfoState);
    useEffect(()=>{
      setTimeout(()=>{
        setCountDown(countDown=countDown-1)
      },1000)
      if(countDown === 0){
         navigation.navigate('learningScreen')
      }
    },[countDown]);


  return (

    <View style={style.parentWrapper}>
        {countDown > 0 ? ( <Text style={style.StText}> your {getDeck[0]?.title} deck  starts in </Text> ) : <>   </> }
        <View style={style.countDownWrapper}>
          <Text style={{fontFamily:'IndieFlower_400Regular' , fontSize:60 }}> {countDown}</Text>
        </View>
    </View>
  )
}

const style = StyleSheet.create({
  parentWrapper:{
   width:'100%',
   justifyContent:'center',
   alignItems:'center'
  },
  countDownWrapper:{
    borderRadius:50,
    height:100,
    width:100,
    borderStyle:'solid',
    borderColor:'black',
    justifyContent:'center',
    textAlign:'center',
    borderWidth:2
  },
  StText:{
    fontFamily:'IndieFlower_400Regular',
    fontSize:35,
    fontWeight:'bold'
  }
})

export default CountDownScreen