import React, { FC, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useSetRecoilState } from 'recoil'
import { deckInfoState } from '../store/deckInfoState'
import { localIdState } from '../store/localIdState'

type deckType={
  id:string,
  title:string
}

const Decklist:FC<{navigation:any}> = ({navigation}) => {

    const [deckList , setDeckList] = useState<deckType[]>([])

    const setDeckToken = useSetRecoilState(deckInfoState);
    const getLocalId = useSetRecoilState(localIdState);  

    // initial call of decklist
    useEffect(()=>{
        const getDeckList = async()=>{
            const data = await fetch(`https://web-cards-52c0a-default-rtdb.firebaseio.com/addDeck/${getLocalId[0]}/deckList.json`);
            const resData = await data.json();
            console.log(resData);
            const temp:deckType[]= [];
            for (let i in resData){
              temp.push({
                id: i,
               title: resData[i].deck_name
              })
            }
            setDeckList(temp)
            console.log('temp' , temp)
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

  return (
    <View>
       <Text style={style.textWrapper}>{deckList ? <>Decks</> : <>Create new deck</>}</Text>
     {deckList && deckList.map((item)=>{
        return (
          <TouchableOpacity key={item.id} onPress={()=>pushDeckHandler(item)}>
            <View style={style.itemWrapper}>
            <Text>{item.title}</Text>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('addCard',{deckId:item.id})}>
            <Image  style={{height:'30px',width:'30px'}} source={require('../../assets/addIcon.png')} />
            </TouchableOpacity> 
            <Image  style={{height:'30px',width:'30px'}} source={require('../../assets/settings.png')} />
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
    width:'300px',
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