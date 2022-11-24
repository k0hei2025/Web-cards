import React, { FC, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { deckInfoState } from '../store/deckInfoState'
import { localIdState } from '../store/localIdState'

type deckType={
  id:string,
  title:string,
  daily_card_limit:number,
  // cardLength:number
}

const Decklist:FC<{navigation:any}> = ({navigation}) => {

    const [deckList , setDeckList] = useState<deckType[]>([])
    const setDeckToken = useSetRecoilState(deckInfoState);
    const getLocalId = useRecoilState(localIdState); 
    // initial call of decklist
    useEffect(()=>{



      console.log(getLocalId[0], 'getLocalId');
        const getDeckList = async()=>{
            const data = await fetch(`https://web-cards-52c0a-default-rtdb.firebaseio.com/addDeck/${getLocalId[0]}/deckList.json`);
            const resData = await data.json();
            // console.log(resData , 'resData');
            const temp:deckType[]= [];
            for (let i in resData){
              temp.push({
                id: i,
               title: resData[i].deck_name,
               // trunk-ignore(git-diff-check/error)
               daily_card_limit:resData[i].daily_card_limit,     
              })
            }
            setDeckList(temp)
            // console.log('temp' , temp)
            // return resData
        }
       const res =  getDeckList()

        deckList && console.log(deckList , 'data of decklist');
    },[]);



    const pushDeckHandler=(selectedDeck:string )=>{
      navigation.navigate('countDown')
      setDeckToken(selectedDeck)
      console.log(selectedDeck , 'deckId')
    }

    const deleteHandler=async(id:string)=>{
     let temp = deckList.filter((item)=>item.id !== id)
     console.log(temp , 'remain data');
     const data = await fetch(`https://web-cards-52c0a-default-rtdb.firebaseio.com/addDeck/${getLocalId[0]}/deckList/${id}.json`,{
      method:"DELETE"
     });
     setDeckList(temp) 
    }

  return (
    <View>
       <Text style={style.textWrapper}>{deckList ? <>Decks</> : <>Create new deck</>}</Text>
     {deckList && deckList.map((item)=>{
        return (
          <TouchableOpacity key={item.id} onPress={()=>pushDeckHandler(item)}>
            <View style={style.itemWrapper}>
            <Text style={{fontWeight:'bold', fontFamily:'IndieFlower_400Regular',fontSize:20}}>{item.title} : ({item.daily_card_limit})</Text>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('addCard',{deckId:item.id})}>
            <Image  style={{height:30,width:30}} source={require('../../assets/addIcon.png')} />
            </TouchableOpacity> 
            <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('settings',{deckInfo:item})}>
            <Image  style={{height:30,width:30}} source={require('../../assets/settings.png')} />
            </TouchableOpacity>
            <TouchableOpacity key={item.id} onPress={()=>deleteHandler(item.id)}>
            <Image  style={{height:30,width:30}} source={require('../../assets/trash-can.png')} />
            </TouchableOpacity> 
            </View>
            </View>
            <View  style={style.bottomLine} />
            </TouchableOpacity>           
        )
     })}
    </View>
  )
}

const style = StyleSheet.create({
  bottomLine:{
    borderBottomWidth:3,
    width:340,
    padding:5,
  },
  itemWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    textAlign:'left',

  },
  textWrapper:{
    fontFamily:'IndieFlower_400Regular',
    fontSize:46,
    fontWeight:'bold'
  },
})

export default Decklist