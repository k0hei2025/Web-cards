import { RouteProp, useRoute } from '@react-navigation/native';
import React from 'react'
import { Controller , useForm } from 'react-hook-form'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {useSetRecoilState} from 'recoil'
import { localIdState } from '../../store/localIdState';

const PasswordSetScreen = ({navigation}) => {

    const setLocalId = useSetRecoilState(localIdState);
const {control , handleSubmit , formState:{errors}} = useForm({
    defaultValues:{
        password:'',
        confirmPassword:''
    }
});
const route = useRoute();

const registrationData = route?.params?.data
const errorMsg = (<Text style={{color:'red'}}>Password is not strong at least 8 characters is needed</Text>)

const submitHandler=async(data)=>{
  console.log(data , registrationData ,  'password data');
  if(data.password === data.confirmPassword){
    const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDQt5LiA7evwIQBI3BsU2AFyb46YX8OEbc`,{
        method:'post',
        body:JSON.stringify({
            email:registrationData.email,
            password:data.password,
            returnSecureToken:true
        }),
        headers:{
            'Content-Type':'application/json'
        }
      })
      const resData = await response.json();
      console.log(resData);
  
const resposneData = await fetch(`https://web-cards-52c0a-default-rtdb.firebaseio.com/addDeck/${resData.localId}.json`,
                        {
                            method:'PUT',
                            body: JSON.stringify({
                                username:registrationData.user_name
                            }),
                        } )
                        console.log(resposneData, 'resPonseData')
                        // saving local Id
                        setLocalId(resData?.localId); 
                        navigation.navigate('Home')
}
  }
  

  return (
     <View style={style.parentWrapper}>
       
        <View style={style.fieldWrapper}>

        <Text style={style.headingWrapper}>Create Password</Text>

        <Text style={style.descriptionWrapper}>Last Step to go </Text>

            {errors.password && errorMsg}
        <Controller 
                  control={control}
                  name='password'
                  rules={{minLength:8}}
                  render={({field:{onChange , value}})=>(
                      <TextInput secureTextEntry={true} onChangeText={onChange} value={value} style={style.inputWrapper} textAlign='center' placeholder='password'/>
                  )}  
                  />
            {errors.confirmPassword && errorMsg}
        <Controller 
                    control={control}
                    name='confirmPassword'
                    rules={{minLength:8}}
                    render={({field:{onChange , value}})=>(
                        <TextInput secureTextEntry={true} onChangeText={onChange} value={value} style={style.inputWrapper} textAlign='center' placeholder='confirm password'/>
                    )}  
                    />
        </View>
        <TouchableOpacity style={style.buttonWrapper} onPress={handleSubmit(submitHandler)}> 
            <Text style={{color:'white'}}>Submit</Text>
        </TouchableOpacity>
     </View>
  )
}

const style = StyleSheet.create({
    inputWrapper:{
        fontFamily:'IndieFlower_400Regular',
        borderStyle:'solid',
        borderColor:'#000000',
        borderWidth:1,
        margin:2,
        width:'100%',
        padding:8,
        marginTop:10
    },
    parentWrapper:{
        flex:1,
        fontFamily:'IndieFlower_400Regular',
        alignItems:'center',
        textAlign:'center',
      },
      fieldWrapper:{
       height:'40%',
       width:'80%',
       marginTop:'20%'
      },
    headingWrapper:{
        fontFamily:'IndieFlower_400Regular',
        fontSize:32
      },
      descriptionWrapper:{
        fontFamily:'IndieFlower_400Regular',
        fontSize:28,
        width:300
      },
      buttonWrapper:{
        padding:8,
        backgroundColor:'black',
        width:'50%',
        alignItems:'center'
      }
})

export default PasswordSetScreen