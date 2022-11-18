import { RouteProp, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { TextInput } from 'react-native-gesture-handler';
import { useRecoilState } from 'recoil';
import { localIdState } from '../../store/localIdState';


const Settings:React.FC = ({navigation}) => {

    const {control , handleSubmit} = useForm({
      defaultValues:{
        daily_card_limit:'',
        deck_name:'',
        username:''
      }
    });

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

const applyHandler=async(data)=>{
console.log(data , 'data');
  // updating deck_name and daily_card

  const response = await fetch(`https://web-cards-52c0a-default-rtdb.firebaseio.com/addDeck/${getLocalId[0]}/deckList/${deckData?.id}.json`,{
    method:'PATCH',
    body:JSON.stringify({
      daily_card_limit:data.daily_card_limit,
      deck_name:data.deck_name
    }),
    headers:{
      'Content-type':'application/json'
    }

  });

  const resData = await response.json();
  console.log(resData);

  const userNameResponse = await fetch(`https://web-cards-52c0a-default-rtdb.firebaseio.com/addDeck/${getLocalId[0]}.json`,{
    method:'PATCH',
    body:JSON.stringify({
      userName:data.username
    }),
    headers:{
      'Content-type':'application/json'
    }
  })
  const resUserName = userNameResponse.json();
  console.log(resUserName);

  navigation.navigate('Home')
}

  return (
    <View style={style.parentWrapper}>
        <View style={style.headingWrapper}>
        <Text style={style.headingTextWrapper}>Settings</Text>
        <Image source={require('../../../assets/settings.png')} />
        </View>

      <View style={style.inputWrapper}>
        <Text style={style.inputTextWrapper}>Daily Card Limit</Text>
        <Controller 
        control={control}
         name='daily_card_limit' 
         render={({field:{onChange,value}})=>(
            <TextInput style={style.inputFieldWrapper} onChangeText={onChange} value={value} placeholder={`${deckInfo && deckInfo?.daily_card_limit}`} />
         )}/>
        <Text style={style.inputTextWrapper}>Change Deck Name</Text>
        <Controller
        control={control}
        name = 'deck_name'
        render={({field:{onChange,value}})=>(
            <TextInput style={style.inputFieldWrapper} onChangeText={onChange} value={value} placeholder={`${deckInfo && deckInfo?.deck_name}`} />
         )}/>
        <Text style={style.inputTextWrapper}>Change Username</Text>
        <Controller
         control={control}
         name = 'username'
         render={({field:{onChange,value}})=>(
          <TextInput style={style.inputFieldWrapper} onChangeText={onChange} value={value} placeholder={`${userName && userName}`} />
         )}
        />
        </View>
        <View style={style.buttonWrapper}>
        <TouchableOpacity style={style.buttonSx} onPress={()=>navigation.navigate('Home')}>
            <Text style={{fontFamily:'IndieFlower_400Regular'}}>Set as Default</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.buttonSx} onPress={handleSubmit(applyHandler)}>
            <Text style={{fontFamily:'IndieFlower_400Regular'}}>Apply</Text>
        </TouchableOpacity>
        </View>
    </View>
  )
}

const style = StyleSheet.create({
  buttonWrapper:{
    flexDirection:'row',
    justifyContent:'space-between',
    width:'50%',
    marginTop:20
  },
  buttonSx:{
    borderStyle:'solid',
    borderColor:'#000000',
    borderWidth:1.5,
    borderRadius:8,
    padding:3
  },
  parentWrapper:{
    alignItems:'center',
    width:'100%',
  },
  headingWrapper:{
    flexDirection:'row',
    fontWeight:'bold',
    marginTop:'20%',
    alignItems:'center',
  },
  headingTextWrapper:{
    fontSize:48,
    fontFamily:'IndieFlower_400Regular'
  },
  inputWrapper:{
    marginTop:'10%',
    height:'40%',
  },
  inputTextWrapper:{
    fontFamily:'IndieFlower_400Regular',
    fontSize:28,
    alignSelf:'flex-start'
  },
  inputFieldWrapper:{
    fontFamily:'IndieFlower_400Regular',
    flex:1,
    padding:5,
     borderStyle:'solid',
    borderColor:'#000000',
    borderWidth:1.5,
    borderRadius:8,
},
})

export default Settings