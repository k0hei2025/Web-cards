import React, { FC, useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'


const Decklist:FC = () => {

    const [deckList , setDeckList] = useState([])

    // initial call of decklist
    useEffect(()=>{
        const getDeckList = async()=>{
            const data = await fetch('https://web-cards-52c0a-default-rtdb.firebaseio.com/addDeck.json');
            const resData = await data.json();
            console.log(resData);
            const temp = [];
            for (let i in resData){
              temp.push(resData[i].deck_name)
            }
            setDeckList(temp)
            console.log('temp' , temp)
            // return resData
        }
       const res =  getDeckList()
   
    //    console.log(temp , 'temp')
        // console.log(getDeckList() , 'deckllIst')
        deckList && console.log(deckList , 'data of decklist');
    },[]);


  return (
    <View>
     {deckList && deckList.map((i)=>{
        return (
            <View style={style.bottomLine}>
            <Text>{i}</Text>
            </View>
        )
     })}
    </View>
  )
}

const style = StyleSheet.create({
  bottomLine:{
    borderBottomWidth:3,
    width:'300px',
    padding:5
  }
})

export default Decklist