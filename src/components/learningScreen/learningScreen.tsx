import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRecoilState  } from 'recoil'
import { deckInfoState } from '../../store/deckInfoState'

const LearningScreen:FC = ({navigation}:any) => {

  const getDeck:any = useRecoilState(deckInfoState)
  const [cardList , setCardList] = useState<any>([]);
  // const [currentCard , setCurrentCard] = useState({});
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
    
    console.log('cardList',cardList && cardList[counter]?.example , )
  },[cardList])


  const nextQuestionHandler=()=>{
    // console.log(counter , cardList.length)
    // if(cardList.length === counter){
      navigation.navigate('deckComplete')
    // }else{
    //   setCounter((counter)=>counter+1)
    // }

  }

  return (
    <View style={style.parentContainer}>
      <View style={style.cardContainer}>
    <Text style={{fontFamily:'IndieFlower_400Regular' , fontSize:18}} >{getDeck[0]?.title}</Text>
    <View style={style.borderLine} />

{ cardList && <>     
      <Text style={style.cardHeading}>{cardList[counter]?.questionTagName}</Text>
 
 <Text style={style.textSt}>{cardList[counter]?.explaination}</Text>
 <View style={style.border} />
 <Text style={style.textSt}>{cardList[counter]?.example}</Text> 
      <View style={style.border} />
      </> 
 }
       
       <View style={style.buttonWrapper}>
        <TouchableOpacity style={style.buttonSt}>
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
  border:{
   borderStyle:'solid',
   borderBottomColor:'black',
   borderBottomWidth:2,
   width:'100%'
  },
  cardHeading:{
   fontSize:26,
   fontFamily:'IndieFlower_400Regular',
   fontWeight:'bold'
  },
  textSt:{
   fontFamily:'IndieFlower_400Regular'
  },
  borderLine:{
    borderStyle:'solid',
    borderWidth:1,
    width:'100%',
    borderColor:'black'
  },
  buttonWrapper:{
  flexDirection:'row'
  },
  buttonSt:{
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'black',
    padding:'8px 16px'
  }
})

export default LearningScreen   