import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react'
import { Controller , useForm } from 'react-hook-form'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const PasswordSetScreen = () => {

const {control , handleSubmit} = useForm({
    defaultValues:{
        password:'',
        confirmPassword:''
    }
});
const route = useRoute();

const registrationData = route?.params?.data

const submitHandler=async(data)=>{
  console.log(data , registrationData ,  'password data');
  const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQt5LiA7evwIQBI3BsU2AFyb46YX8OEbc`,{
        method:'post',
        body:JSON.stringify({
            email:registrationData.email,
            password:'123456'
        }),
        headers:{
            'Content-Type':'application/json'
        }
      })
      const resData = await response.json();
      console.log(resData);
  
const resposneData = await fetch('https://web-cards-52c0a-default-rtdb.firebaseio.com/addDeck?${resData.localId}.json',
                        {
                            method:'POST',
                            body: JSON.stringify({
                                userName:registrationData.user_name,
                                
                            })
                        } )
}

  return (
     <View style={style.parentWrapper}>
        <Text style={style.headingWrapper}>Create Password</Text>

        <Text style={style.descriptionWrapper}>Last Step to go </Text>
        <View>
        <Controller 
                  control={control}
                  name='password'
                  render={({field:{onChange , value}})=>(
                      <TextInput onChange={onChange} value={value} style={style.inputWrapper} textAlign='center' placeholder='password'/>
                  )}  
                  />
                    
        <Controller 
                    control={control}
                    name='confirmPassword'
                    render={({field:{onChange , value}})=>(
                        <TextInput onChange={onChange} value={value} style={style.inputWrapper} textAlign='center' placeholder='confirm password'/>
                    )}  
                    />
        </View>
        <TouchableOpacity onPress={handleSubmit(submitHandler)}> 
            <Text>GO</Text>
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
        alignItems:'center',
        textAlign:'center'
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
})

export default PasswordSetScreen