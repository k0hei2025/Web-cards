import React, { FC } from 'react'
import { StyleSheet, Text, TextInput, View } from 'react-native'
import AddDeckForm from './AddDeckForm'

const AddComponent:FC = ({navigation}) => {
  return (
    <View style={style.parentContainer}>
      <Text>Add Deck</Text>
     <AddDeckForm navigation={navigation}/>
    </View>
  )
}

const style = StyleSheet.create({
  parentContainer:{
    height:'30%',
    padding:'10%',
    fontFamily:'IndieFlower_400Regular',
    textAlign:'center',
    alignItems:'center'
  },

})

export default AddComponent