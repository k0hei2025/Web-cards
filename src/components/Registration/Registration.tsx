import React from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import {useForm , Controller} from 'react-hook-form'


const RegistrationScreen = ({navigation}) => {


    const {control , handleSubmit , formState:{errors}} = useForm({
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

    const errorMessage = (<Text style={{color:'red'}}>Credientials is incorrect</Text>)

    return (
    <View style={style.parentWrapper}>
      <Text style={style.headingWrapper}>Create Account</Text>
      <Text style={style.descriptionWrapper}>Activate your account and start the new and intresting way of remebering the things</Text>
      <View style={style.inputContainer}>
        <View style={style.nameWrapper}>
          {errors.first_name && errorMessage}
        <Controller 
                  control={control}
                  rules={{required:true}}
                  name='first_name'
                  render={({field:{onChange , onBlur , value}})=>(
                      <TextInput onBlur={onBlur} onChangeText={onChange} value={value} style={style.inputWrapper} textAlign='center' placeholder='first name'/>
                  )}  
                  />
                  {errors.last_name && errorMessage}
        <Controller 
                  control={control}
                  rules={{required:true}}
                  name='last_name'
                  render={({field:{onChange , onBlur , value}})=>(
                      <TextInput onBlur={onBlur} onChangeText={onChange} value={value} style={style.inputWrapper} textAlign='center' placeholder='last name'/>
                  )}  
                  />
        </View>
        {errors.email && errorMessage}
      <Controller 
                control={control}
                name='email'
                rules={{pattern:/^[\w.+\-]+@gmail\.com$/,required:true}}
                render={({field:{onChange , onBlur , value}})=>(
                    <TextInput onBlur={onBlur} onChangeText={onChange} value={value} style={style.inputWrapperEmail} textAlign='center' placeholder='email'/>
                )}  
                />
                {errors.user_name && errorMessage}
     <Controller 
                control={control}
                rules={{required:true}}
                name='user_name'
                render={({field:{onChange , onBlur , value}})=>(
                    <TextInput onBlur={onBlur} onChangeText={onChange} value={value} style={style.inputWrapperEmail}  textAlign='center' placeholder='user name'/>
                )}  
                />
           
      </View>  
                                                                 
      <TouchableOpacity style={style.buttonWrapper} onPress={handleSubmit(submitHandler)}>
     
        <Text>next</Text>
        <Image style={{width:20,height:20}} source={require('../../../assets/arrow.png')}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=>navigation.navigate('login')}>
      
        <Text>Go To Login</Text>
      </TouchableOpacity>
      
    </View>
  )
}

const style = StyleSheet.create({
  inputContainer:{
    marginTop:20
  },
    inputWrapper:{
        fontFamily:'IndieFlower_400Regular',
        width:'40%',
        borderStyle:'solid',
        borderColor:'#000000',
        borderWidth:1.5,
        margin:5,
        borderRadius:8,
        padding:6        
    },
    inputWrapperEmail:{
      fontFamily:'IndieFlower_400Regular',
      alignSelf:'center',
      width:'90%',
      borderStyle:'solid',
      borderColor:'#000000',
      borderWidth:1.5,
      margin:5,
      borderRadius:8,
      padding:6    
    },
    nameWrapper:{
      flexDirection:'row',
      justifyContent:'space-evenly',
    },
    parentWrapper:{
      flex:1,
     marginTop:'30%',
     width:'90%',
     margin:20

    },
    headingWrapper:{
      fontFamily:'IndieFlower_400Regular',
      fontSize:38
    },
    descriptionWrapper:{
      fontFamily:'IndieFlower_400Regular',
      fontSize:18,
      width:'95%',
      marginTop:10
    },
 
    buttonWrapper:{
      borderStyle:'solid',
      borderWidth:1,
      padding:5,
      borderColor:'#00000',
      marginTop:10,
     marginRight:20,
      width:'25%',
      flexDirection:'row',
      justifyContent:'space-evenly',
      alignSelf:'flex-end'
    }
})

export default RegistrationScreen