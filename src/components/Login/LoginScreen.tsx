import React from 'react'
import { Controller, useForm } from 'react-hook-form'
import { StyleSheet, Text, TextInput, TouchableOpacity, View , Image } from 'react-native'
import { useSetRecoilState } from 'recoil';
import { localIdState } from '../../store/localIdState';


const LoginScreen = ({navigation}) => {

    const {control , handleSubmit , formState:{errors}} = useForm({
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
    setLocalId(resData.localId)
    if(resData.idToken){
        navigation.navigate('Home')
    }

  }
  const errorMessage = (<Text style={{color:'red'}}>Credientials is incorrect</Text>)


  return (
   <View style={style.parentWrapper}>
   <View style={style.shape}/>
   <View style={style.shape1}/>
    <Text style={style.headingTxt}>Login</Text>
    <Text style={style.descriptionTxt}>In order to see your decks</Text>
    
    {/* <View style={style.fieldWrapper}> */}
    {errors.email && errorMessage}
          <Controller 
                control={control}
                name='email' 
                rules={{pattern:/^[\w.+\-]+@gmail\.com$/,required:true}}
                render={({field:{onChange , value}})=>(
                    <View style={style.fieldWrapper}>
                    
                    <Image style={{width:30 , height:30}} source={require('../../../assets/email.png')}  />
                    <TextInput onChangeText={onChange} value={value} style={style.inputWrapper} textAlign='center' placeholder='email'/>
                    </View>
                )}  
                />
                 {errors.password && errorMessage}
     <Controller 
                control={control}
                name='password'
                rules={{required:true}}
                render={({field:{onChange , value}})=>(
                    <View style={style.fieldWrapper}    >
                      <Image style={{width:30 , height:30}}  source={require('../../../assets/lock.png')}  />
                    <TextInput secureTextEntry={true} onChangeText={onChange} value={value} style={style.inputWrapper}  textAlign='center' placeholder='password'/>
                    </View>
                )}  
                />
    {/* </View> */}
                <TouchableOpacity style={style.buttonWrapper} onPress={handleSubmit(submitHandler)}>
                    <Text style={style.buttonTxt}>Submit</Text>
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
        borderWidth:1.5,
        borderRadius:8,
        margin:2,
        width:'100%',
                
   
    },
    shape:{
    height:'20%',
    backgroundColor:'black',
    width:'40%',
    transform:[{rotateX:'0deg'},{rotateZ:'-15deg'},{translateY:-100},{translateX:170}]
    },
    shape1:{
        height:'30%',
        backgroundColor:'black',
        width:'50%',
        position:'absolute',
        bottom:'-20%',
        transform:[{rotateX:'0deg'},{rotateZ:'80deg'},{translateY:-180},{translateX:-10}]
        },
    fieldWrapper:{
     height:40,
     flexDirection:'row',
     width:'90%',
     margin:5,
     marginLeft:20,
     justifyContent:'space-between',
     marginTop:'5%'
    },
    parentWrapper:{
        width:'100%',
        marginTop:'30%',
        height:'80%',
        alignItems:'center'
    },

    buttonWrapper:{
        backgroundColor:'black',
        padding:3,
        marginTop:30,
        alignSelf:'flex-start',
        marginLeft:50,
        width:'30%'
        
    },
    buttonTxt:{
        color:'white',
        fontFamily:'IndieFlower_400Regular',
        fontWeight:'bold',
        marginLeft:10,
        fontSize:16
    },
    headingTxt:{
        fontSize:43,
        fontFamily:'IndieFlower_400Regular',
        fontWeight:'bold',
        alignSelf:'flex-start',
        marginLeft:25
    },
    descriptionTxt:{
        fontFamily:'IndieFlower_400Regular',
        fontSize:26,
        marginTop:10,
        marginBottom:20
    }
})

export default LoginScreen