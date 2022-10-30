import { NavigationProp } from '@react-navigation/native';
import React, { FC, useEffect, useState } from 'react'
import { View } from 'react-native';

const countDownScreen:FC = ({navigation}) => {

    let [countDown , setCountDown] = useState(3);

    useEffect(()=>{
      setTimeout(()=>{
        setCountDown(countDown=countDown-1)
      },1000)
    },[countDown]);


  return (

    <View>
        {countDown > 0 ? <> your deck will starts in {countDown} </> : navigation.navigate('learningScreen') }
    </View>
  )
}

export default countDownScreen