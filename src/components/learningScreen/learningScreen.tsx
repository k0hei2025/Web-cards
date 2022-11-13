// import React, { FC, useEffect, useState } from 'react'
// import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
// import { useRecoilState  } from 'recoil'
// import { deckInfoState } from '../../store/deckInfoState'
// import { localIdState } from '../../store/localIdState'

// const LearningScreen:FC = ({navigation}:any) => {

//   const getDeck:any = useRecoilState(deckInfoState)
//   const [cardList , setCardList] = useState<any>([]);
//   // const [currentCard , setCurrentCard] = useState({});
//   const [counter , setCounter] = useState(0);
//   const getUserId = useRecoilState(localIdState);
//   const AGAIN = 'Again<1min'

//   useEffect(()=>{
//   console.log('selected deck value at learningScreen' , getDeck[0]?.id);
//   const fetchDeckCards=async()=>{
//     const response = await fetch(`https://web-cards-52c0a-default-rtdb.firebaseio.com/addDeck/${getUserId[0]}/deckList/${getDeck[0].id}/cardList.json`);
//     const data = await response.json();
//     let tempCardList = []
//     for (let i in data){
//      tempCardList.push(data[i]) 
//     }
//     console.log(tempCardList , 'temp card list');
//     setCardList(tempCardList)
//   }

//   fetchDeckCards()
//   },[]);

//   useEffect(()=>{
//     // navigation.navigate('deckComplete')
    
//     console.log('cardList',cardList && cardList[counter]?.example , )
//   },[cardList])


//   const nextQuestionHandler=()=>{
//     // console.log(counter , cardList.length)
//     if(cardList.length - 1 === counter){
//       navigation.push('Home')
//     }else{
//       setCounter((counter)=>counter+1)
//     }

//   }

//   return (
//     <View style={style.parentContainer}>
//       <View style={style.cardContainer}>
//     <Text style={{fontFamily:'IndieFlower_400Regular' , fontSize:18}} >{getDeck[0]?.title}</Text>
//     <View style={style.border} />
// { cardList ? <>     
//       <Text style={style.cardHeading}>{cardList[counter]?.questionTagName}</Text>
 
//  <Text style={style.textSt}>{cardList[counter]?.explaination}</Text>
//  <View style={style.border} />
//  <Text style={style.textSt}>{cardList[counter]?.example}</Text> 
//       <View style={style.border} />
//       </> 
//  :<></>}
       
//        <View style={style.buttonWrapper}>
//         <TouchableOpacity onPress={()=>nextQuestionHandler()} style={style.buttonSt}>
//           <Text style={btnStyle('#277BC0').btnText}>Easy(2d)</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={()=>nextQuestionHandler()} style={style.buttonSt}>
//           <Text style={btnStyle('green').btnText}>Hard(10min)</Text>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={()=>nextQuestionHandler()} style={style.buttonSt}>
//           <Text style={btnStyle('red').btnText}>{AGAIN}</Text>
//         </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   )
// }

// const style = StyleSheet.create({
//   cardContainer:{
//    alignItems:'center',
//    width:'80%',
//    backgroundColor:'transparent',
//    height:'100%'
//   },
//   parentContainer:{
//     alignItems:'center',
//   width:'100%',
//   marginTop:70
//   },
//   border:{
//    borderStyle:'solid',
//    borderBottomColor:'black',
//    borderBottomWidth:1,
//    width:'100%'
//   },
//   cardHeading:{
//    fontSize:30,
//    fontFamily:'IndieFlower_400Regular',
//    fontWeight:'bold',
//   },
//   textSt:{
//    fontFamily:'IndieFlower_400Regular',
//    marginTop:20
//   },
//   borderLine:{
//     borderStyle:'solid',
//     borderWidth:1,
//     width:'100%',
//     borderColor:'black'
//   },
//   buttonWrapper:{
//   flexDirection:'row',
//   justifyContent:'space-between',
//   padding:10
//   },
//   buttonSt:{
//     borderStyle:'solid',
//     borderWidth:1,
//     borderColor:'black',
//     margin:4,
//     paddingLeft:4,
//     paddingRight:4
    
//   },

// })

// const btnStyle =(btnTextColor:string)=> StyleSheet.create({
//   btnText:{
//     color:btnTextColor,
//     fontFamily:'IndieFlower_400Regular'
//   }
// })

// export default LearningScreen   



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
  navigation.navigate('deckComplete')
  },[]);

  useEffect(()=>{
    // navigation.navigate('deckComplete')
    
    console.log('cardList',cardList && cardList[counter]?.example , )
  },[cardList])


  const nextQuestionHandler=()=>{
    // console.log(counter , cardList.length)
    if(cardList.length - 1 === counter){
      
    }else{
      setCounter((counter)=>counter+1)
    }

  }

  return (
    <View style={style.parentContainer}>
      <View style={style.cardContainer}>
    <Text style={{fontFamily:'IndieFlower_400Regular' , fontSize:18}} >{getDeck[0]?.title}</Text>
    <View style={style.border} />
{ cardList && <>     
      <Text style={style.cardHeading}>{cardList[counter]?.questionTagName}</Text>
 
 <Text style={style.textSt}>{cardList[counter]?.explaination}</Text>
 <View style={style.border} />
 <Text style={style.textSt}>{cardList[counter]?.example}</Text> 
      <View style={style.border} />
      </> 
 }
       
       <View style={style.buttonWrapper}>
        <TouchableOpacity onPress={()=>nextQuestionHandler()} style={style.buttonSt}>
          <Text style={btnStyle('#277BC0').btnText}>Easy(2d)</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>nextQuestionHandler()} style={style.buttonSt}>
          <Text style={btnStyle('green').btnText}>Hard(10min)</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>nextQuestionHandler()} style={style.buttonSt}>
          <Text style={btnStyle('red').btnText}>{AGAIN}</Text>
        </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const style = StyleSheet.create({
  cardContainer:{
   alignItems:'center',
   width:'20%',
   backgroundColor:'transparent',
   height:'100%'
  },
  parentContainer:{
    alignItems:'center',
  width:'100%',
  marginTop:10
  },
  border:{
   borderStyle:'solid',
   borderBottomColor:'black',
   borderBottomWidth:1,
   width:'100%'
  },
  cardHeading:{
   fontSize:30,
   fontFamily:'IndieFlower_400Regular',
   fontWeight:'bold',
  },
  textSt:{
   fontFamily:'IndieFlower_400Regular',
   marginTop:20
  },
  borderLine:{
    borderStyle:'solid',
    borderWidth:1,
    width:'100%',
    borderColor:'black'
  },
  buttonWrapper:{
  flexDirection:'row',
  justifyContent:'space-between',
  padding:10
  },
  buttonSt:{
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'black',
    margin:4,
    paddingLeft:4,
    paddingRight:4
    
  },

})

const btnStyle =(btnTextColor:string)=> StyleSheet.create({
  btnText:{
    color:btnTextColor,
    fontFamily:'IndieFlower_400Regular'
  }
})

export default LearningScreen   