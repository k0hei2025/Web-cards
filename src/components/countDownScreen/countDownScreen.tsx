import { NavigationProp } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react'
import { Text, View } from 'react-native';
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

    <View>
        {countDown > 0 ? ( <Text> your {getDeck[0]?.title} deck will starts in {countDown} </Text> ) : <>   </> }
    </View>
  )
}

export default CountDownScreen