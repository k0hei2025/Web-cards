import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { useRecoilState } from 'recoil';
import { localIdState } from '../../store/localIdState';


const Settings:React.FC = ({navigation}) => {

    const {control , handleSubmit} = useForm();

const route = useRoute<RouteProp<{Settings:{deckInfo:any}}>>();
const deckData = route?.params?.deckInfo;

const [deckInfo , setDeckInfo] = useState();
const [userName , setUsername] = useState('');

const getLocalId = useRecoilState(localIdState);

useEffect(()=>{
  console.log(deckInfo , 'deckInfo');
},[deckInfo]);

useEffect(()=>{
   const fetchDeckDataHandler=async()=>{
    const response = await fetch(`https://web-cards-52c0a-default-rtdb.firebaseio.com/addDeck/${getLocalId[0]}/deckList/${deckData?.id}.json`);
    // console.log(deckData , 'deckData');
    const resData = await response.json();
    console.log(resData , 'resData');
    setDeckInfo(resData);
   }

   const fetchUserNameHandler=async()=>{
    const response = await fetch(`https://web-cards-52c0a-default-rtdb.firebaseio.com/addDeck/${getLocalId[0]}.json`);
    const resData = await response.json();
    console.log(resData,'resData2', resData.username , 'userName')
    // saving user name
    setUsername(resData.username);
   }

  
   fetchDeckDataHandler();
   fetchUserNameHandler();

},[])


  return (
    <View>
        <View>
        <Text>Settings</Text>
        <Image source={require('../../../assets/settings.png')} />
        </View>

        <Text>Daily Card Limit</Text>
        <Controller 
        control={control}
         name='daily_card_limit' 
         render={({field:{onChange,value}})=>(
            <TextInput onChangeText={onChange} value={value} placeholder={`${deckInfo && deckInfo?.daily_card_limit}`} />
         )}/>
        <Text>Change Deck Name</Text>
        <Controller
        control={control}
        name = 'deck_name'
        render={({field:{onChange,value}})=>(
            <TextInput onChangeText={onChange} value={value} placeholder={`${deckInfo && deckInfo?.deck_name}`} />
         )}/>
        
        <Text>Change Date Notation</Text>
        {/* <Controller /> */}
        <TouchableOpacity>
            <Text>Set as Default</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text>Apply</Text>
        </TouchableOpacity>
    </View>
  )
}

export default Settings