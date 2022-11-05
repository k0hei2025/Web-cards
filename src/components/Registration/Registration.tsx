import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {useForm , Controller} from 'react-hook-form'


const RegistrationScreen = () => {

    const {control , handleSubmit} = useForm({
        defaultValues:{
            first_name:'',
            last_name:'',
            email:'',
            user_name:''
            }      
    });

    const submitHandler=async(data)=>{
        console.log( data,'data of registration form ')
      const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQt5LiA7evwIQBI3BsU2AFyb46YX8OEbc`,{
        method:'post',
        body:JSON.stringify({
            email:data.email,
            password:'123456'
        }),
        headers:{
            'Content-Type':'application/json'
        }
      })
      const resData = await response.json();
      console.log(resData);
    //   console.log(resData , 'resData');
    }

    return (
    <View>
      <Text>Create Account</Text>
      <Text>Activate your account and start the new and intresting way of remebering the things</Text>
      <Controller 
                control={control}
                name='first_name'
                render={({field:{onChange , value}})=>(
                    <TextInput onChange={onChange} value={value} style={style.inputWrapper} textAlign='center' placeholder='first name'/>
                )}  
                />
      <Controller 
                control={control}
                name='last_name'
                render={({field:{onChange , value}})=>(
                    <TextInput onChange={onChange} value={value} style={style.inputWrapper} textAlign='center' placeholder='last name'/>
                )}  
                />
      <Controller 
                control={control}
                name='email'
                render={({field:{onChange , value}})=>(
                    <TextInput onChange={onChange} value={value} textAlign='center' placeholder='email'/>
                )}  
                />
     <Controller 
                control={control}
                name='user_name'
                render={({field:{onChange , value}})=>(
                    <TextInput onChange={onChange} value={value}  textAlign='center' placeholder='user name'/>
                )}  
                />
                                                                 
      <TouchableOpacity onPress={handleSubmit(submitHandler)}>
        <Text>next</Text>
      </TouchableOpacity>
    </View>
  )
}

const style = StyleSheet.create({
    inputWrapper:{
        fontFamily:'IndieFlower_400Regular',
        flex:1
    }
})

export default RegistrationScreen