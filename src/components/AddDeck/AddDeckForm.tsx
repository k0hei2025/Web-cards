import React, { FC } from 'react'
import { StyleSheet, Text, TextInput, Touchable, TouchableOpacity, View } from 'react-native'
import {useFonts , IndieFlower_400Regular} from '@expo-google-fonts/dev'
import { useForm , SubmitErrorHandler, Controller} from 'react-hook-form'
import {useRecoilState} from 'recoil'
import { localIdState } from '../../store/localIdState'

type formData = {
    deck_name:"";
     daily_card_limit:"";
}

const AddDeckForm:FC = ({navigation}) => {

    const getLocalId = useRecoilState(localIdState);
    const {register , control, handleSubmit} = useForm({
        defaultValues:{
            deck_name:'',
            daily_card_limit:0
        }
    });

    const submitHandler=async(data: unknown )=>{
     console.log(data , getLocalId[0] , 'data of submti');

     const sendData = await fetch(`https://web-cards-52c0a-default-rtdb.firebaseio.com/addDeck/${getLocalId[0]}/deckList.json`,{
        method:'POST',
        body:JSON.stringify(data),
        headers:{
            'Content-type':'application/json'
        }
     })
     const resSendData = await sendData.json()
     console.log(resSendData , 'response');
     navigation.navigate('Home')
    }

  return (
       <View style={style.parentWrapper}>
     <Controller control={control}
     name='deck_name'
      render={({ field: { onChange, onBlur, value } }) => (
      <TextInput onChangeText={onChange} value={value} style={style.inputWrapper} textAlign='center' placeholder='Deck Name'/>
      )} />
         <Controller control={control}
     name='daily_card_limit'
      render={({ field: { onChange, onBlur, value } }) => (
      <TextInput onChangeText={onChange} value={value} style={style.inputWrapper} textAlign='center' placeholder='daily card limit'/>
      )} />
        <TouchableOpacity>
            <Text style={style.buttonWrapper} onPress={handleSubmit(submitHandler)}>Submit</Text>
        </TouchableOpacity>
        </View>
  )
}

const style = StyleSheet.create({
    inputWrapper:{
        fontFamily:'IndieFlower_400Regular',
        flex:1,
        padding:12,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'black',
        width:'100%',
        margin:5,
        height:'100%'
    },
    inputContainer:{
        alignItems:'center',
        marginTop:'20%',
        width:'100%',
        height:'20%'
    },
    parentWrapper:{
     width:'100%',
     height:'80%'
    },
    buttonWrapper:{
        padding:5,
        borderStyle:'solid',
        borderWidth:1,
        borderColor:'black',
        width:'20%',
        marginTop:5,
        alignSelf:'flex-end',
        fontFamily:'IndieFlower_400Regular',
        fontWeight:'bold'
    }
    
})

export default AddDeckForm