import { Route, RouteProp, useRoute } from '@react-navigation/native';
import React, { FC, ReactElement, useEffect } from 'react'
import { Controller, FieldValue, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';


type formData = {
    questionTagName:string,
    explaination:string,
    example:string
}

const AddCard:FC = () => {


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

        const response  = await fetch(`https://web-cards-52c0a-default-rtdb.firebaseio.com/addDeck/${deckId}/cardList.json`,{
            method:'POST',
            body:JSON.stringify(data),
            headers:{
                'Content-type':'application/json'
            }
        })
           
        const resData = await response.json()
        console.log(resData , 'data sended succesfully')

       }

       if(deckId === ''){
    
       }
        return (
            <View style={style.parentContainer}>
                {deckId === '' ? 
                  <Text>Deck id is Empty or Invalid </Text> : 
                <>
                  <Controller 
                control={control}
                name='questionTagName'
                render={({field:{onChange , value}})=>(
                    <TextInput onChange={onChange} value={value} style={style.inputWrapper} textAlign='center' placeholder='card title'/>
                )}  
                />
                   <Controller 
                control={control}
                name='explaination'
                render={({field:{onChange , value}})=>(
                    <TextInput onChange={onChange} value={value} textAlign='center' style={style.inputWrapper}  placeholder='Explaination'/>
                )}  
                />
                   <Controller 
                control={control}
                name='example'
                render={({field:{onChange , value}})=>(
                    <TextInput onChange={onChange} value={value} textAlign='center' style={style.inputWrapper}  placeholder='Example'/>
                )}  
                />
                <TouchableOpacity onPress={handleSubmit(submitHandler)}>
                <Text>Submit form</Text>
                </TouchableOpacity>
                    </>
                }        
            </View>
          )
        }
        
        
        const style = StyleSheet.create({
            parentContainer:{
              width:'100%',
              alignItems:'center'
            },
            inputWrapper:{
                fontFamily:'IndieFlower_400Regular',
                flex:1
            }
            
        })
        
       

  
export default AddCard;