import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRecoilState  } from 'recoil'
import { deckInfoState } from '../../store/deckInfoState'

const learningScreen:FC = ({navigation}) => {

  const getDeck = useRecoilState(deckInfoState)
  const [cardList , setCardList] = useState([]);
  const [currentCard , setCurrentCard] = useState({});
  const [counter , setCounter] = useState(0);
  const AGAIN = 'Again<1min'

  useEffect(()=>{
  console.log('selected deck value at learningScreen' , getDeck[0]?.id);
  const fetchDeckCards=async()=>{
    const response = await fetch(`https://web-cards-52c0a-default-rtdb.firebaseio.com/addDeck/${getDeck[0].id}/cardList.json`);
    const data = await response.json();
    let tempCardList = []
    for (let i in data){
     tempCardList.push(data[i]) 
    }
    console.log(tempCardList , 'temp card list');
    setCardList(tempCardList)
  }

  fetchDeckCards()
  },[]);

  useEffect(()=>{
    // navigation.navigate('deckComplete')
    
    console.log(cardList && cardList[counter]?.example , 'cardList')
  },[cardList])


  const nextQuestionHandler=()=>{
    console.log(counter , cardList.length)
    if(cardList.length === counter){
      navigation.push('deckComplete')
    }else{
      setCounter((counter)=>counter+1)
    }

  }

  return (
    <View style={style.parentContainer}>
      <View style={style.cardContainer}>
    <Text >{getDeck[0]?.title}</Text>
    <View style={style.borderLine} />

{ cardList && <>     
      <Text>{cardList[counter]?.questionTagName}</Text>
 <Text>{cardList[counter]?.explaination}</Text>
 <Text>{cardList[counter]?.example}</Text> </> 
 }
       
       <View style={style.buttonWrapper}>
        <TouchableOpacity>
          <Text>Easy(2d)</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text>Hard(10min)</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>nextQuestionHandler()}>
          <Text>{AGAIN}</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  cardContainer:{
   borderWidth:2,
   borderStyle:'solid',
   alignItems:'center',
   width:'50%',
   backgroundColor:'blue'
  },
  parentContainer:{
    alignItems:'center',
  backgroundColor:'red',
  width:'100%',

  },
  borderLine:{
    borderStyle:'solid',
    borderWidth:1,
    width:'100%',
    borderColor:'black'
  },
  buttonWrapper:{
  flexDirection:'row'
  }
})

export default learningScreen