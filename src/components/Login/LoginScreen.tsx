import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSetRecoilState } from 'recoil';
import { localIdState } from '../../store/localIdState';


const LoginScreen = () => {

    const {control , handleSubmit} = useForm({
        defaultValues:{
            email:'',
            password:''
         }
    });

    const setLocalId = useSetRecoilState(localIdState);



const submitHandler= async(data)=>{
    console.log(data, 'data');
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDQt5LiA7evwIQBI3BsU2AFyb46YX8OEbc`,{
      method:'POST',
      body:JSON.stringify({
          email:data.email,
          password:data.password,
          returnSecureToken: true,
      }),
      headers:{
          'Content-type':'application/json'
      }

      
    })
    const resData = await response.json();
    console.log(resData , 'resData');
    setLocalId(data.localId)
  }

  return (
   <View>
          <Controller 
                control={control}
                name='email'
                render={({field:{onChange , value}})=>(
                    <TextInput onChange={onChange} value={value} style={style.inputWrapper} textAlign='center' placeholder='email'/>
                )}  
                />
     <Controller 
                control={control}
                name='password'
                render={({field:{onChange , value}})=>(
                    <TextInput onChange={onChange} value={value} style={style.inputWrapper}  textAlign='center' placeholder='password'/>
                )}  
                />
                <TouchableOpacity onPress={handleSubmit(submitHandler)}>
                    <Text>Submit</Text>
                </TouchableOpacity>
   </View>
  )
}

const style = StyleSheet.create({
    inputWrapper:{
        fontFamily:'IndieFlower_400Regular',
        flex:1,
        borderStyle:'solid',
        borderColor:'#000000',
        borderWidth:1,
        margin:2,
        width:'100%'
    },

})

export default LoginScreen