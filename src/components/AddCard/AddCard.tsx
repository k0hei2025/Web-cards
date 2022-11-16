import { Route, RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, ReactElement, useEffect } from 'react'
import { Controller, FieldValue, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useRecoilState } from 'recoil';
import { localIdState } from '../../store/localIdState';


type formData = {
    questionTagName:string,
    explaination:string,
    example:string
}

const AddCard:FC = ({navigation}) => {

    const getLocalId = useRecoilState(localIdState);
    const route = useRoute<RouteProp<{AddCard:{deckId:string}}>>();
    const deckId = route?.params?.deckId;

    // useEffect(()=>{console.log(route?.params?.deckId , 'route data')},[])

    


    const {control , handleSubmit} = useForm<formData>({
        defaultValues:{
        questionTagName:'',
        explaination:'',
        example:''
        }      
    });


    const submitHandler=async(data : formData)=>{
        console.log(data , 'data of add card form');
        // add card to specific deck 

        const response  = await fetch(`https://web-cards-52c0a-default-rtdb.firebaseio.com/addDeck/${getLocalId[0]}/deckList/${deckId}/cardList.json`,{
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-type':'application/json'
            }
        })
           
        const resData = await response.json()
        console.log(resData , 'data sended succesfully')
        navigation.navigate('Home')
    }

       if(deckId === ''){
    
       }
        return (
            <View style={style.parentContainer}>
               
                {deckId === '' ? 
                  <Text>Deck id is Empty or Invalid </Text> : 
                <View style={style.inputContainer}>
                     <Text style={style.heading}>Add Card</Text>
                  <Controller 
                control={control}
                name='questionTagName'
                render={({field:{onChange , value}})=>(
                    <TextInput onChangeText={onChange} value={value} style={style.inputWrapper} textAlign='center' placeholder='card title'/>
                )}  
                />
                   <Controller 
                control={control}
                name='explaination'
                render={({field:{onChange , value}})=>(
                    <TextInput onChangeText={onChange} value={value} textAlign='center' style={style.inputWrapper}  placeholder='Explaination'/>
                )}  
                />
                   <Controller 
                control={control}
                name='example'
                render={({field:{onChange , value}})=>(
                    <TextInput onChangeText={onChange} value={value} textAlign='center' style={style.inputWrapper}  placeholder='Example'/>
                )}  
                />
                <TouchableOpacity onPress={handleSubmit(submitHandler)}>
                <Text>Submit form</Text>
                </TouchableOpacity>
                    </View>
                }        
            </View>
          )
        }
        
        
        const style = StyleSheet.create({
            parentContainer:{
              width:'100%',
              height:'100%',
              alignItems:'center',
            
              
            },
            inputWrapper:{
                fontFamily:'IndieFlower_400Regular',
                flex:1,
                padding:12,
                width:'100%',
            },
            inputContainer:{
                alignItems:'center',
                marginTop:'20%',
                width:'100%',
                height:'20%'
            },
            heading:{
                fontFamily:'IndieFlower_400Regular',
                fontWeight:'bold',
                fontSize:26
            }
            
        })
        
       

  
export default AddCard;