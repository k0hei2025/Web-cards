import React from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {useForm , Controller} from 'react-hook-form'
import {useFonts , IndieFlower_400Regular} from '@expo-google-fonts/dev'


const RegistrationScreen = ({navigation}) => {

  let [fontsLoaded , error ] = useFonts({
    IndieFlower_400Regular
  })


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
      
      navigation.navigate('passwordSetScreen',{data:data})
    //   console.log(resData , 'resData');
    }

    return (
    <View style={style.parentWrapper}>
      <Text style={style.headingWrapper}>Create Account</Text>
      <Text style={style.descriptionWrapper}>Activate your account and start the new and intresting way of remebering the things</Text>
      <View style={style.nameWrapper}>
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
                    <TextInput onChange={onChange} value={value} style={style.inputWrapper} textAlign='center' placeholder='email'/>
                )}  
                />
     <Controller 
                control={control}
                name='user_name'
                render={({field:{onChange , value}})=>(
                    <TextInput onChange={onChange} value={value} style={style.inputWrapper}  textAlign='center' placeholder='user name'/>
                )}  
                />
      </View>  
                                                                 
      <TouchableOpacity onPress={handleSubmit(submitHandler)}>
        <Text style={style.buttonWrapper}>next</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('login')}>
        <Text>Go To Login</Text>
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

    parentWrapper:{
      flex:1,
      fontFamily:'IndieFlower_400Regular',
      alignItems:'center'
    },
    headingWrapper:{
      fontFamily:'IndieFlower_400Regular',
      fontSize:28
    },
    descriptionWrapper:{
      fontFamily:'IndieFlower_400Regular',
      fontSize:18,
      width:300
    },
    nameWrapper:{
      justifyContent:'space-between'
    },
    buttonWrapper:{
      borderStyle:'solid',
      borderWidth:1,
      width:70,
      padding:2,
      borderColor:'#00000',
      position:'absolute',
      marginTop:10,
      left:60
    }
})

export default RegistrationScreen