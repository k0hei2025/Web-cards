import React, { FC, useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import AddSvgIcon from '../assets/SvgImages/AddSvgIcon';
import AddIcon from '../assets/addIcon.png'

type deckType={
  id:string,
  title:string
}

const Decklist:FC<{navigation:any}> = ({navigation}) => {

    const [deckList , setDeckList] = useState<deckType[]>([])

    // initial call of decklist
    useEffect(()=>{
        const getDeckList = async()=>{
            const data = await fetch('https://web-cards-52c0a-default-rtdb.firebaseio.com/addDeck.json');
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
   
    //    console.log(temp , 'temp')
        // console.log(getDeckList() , 'deckllIst')
        deckList && console.log(deckList , 'data of decklist');
    },[]);


  return (
    <View>
     {deckList && deckList.map((item)=>{
        return (
          <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('countDown')}>
            <View style={style.itemWrapper}>
            <Text>{item.title}</Text>
            <View style={{flexDirection:'row'}}>
            <TouchableOpacity key={item.id} onPress={()=>navigation.navigate('addCard',{deckId:item.id})}>
            <Image  style={{height:'30px',width:'30px'}} source={require('../assets/addIcon.png')} />
            </TouchableOpacity> 
            <Image  style={{height:'30px',width:'30px'}} source={require('../assets/settings.png')} />
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

  }
})

export default Decklist