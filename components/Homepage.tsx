import React, {FC} from 'react'
import { Text } from 'react-native'
import styled from '@emotion/native'
import {useFonts , IndieFlower_400Regular} from '@expo-google-fonts/dev'


const Homepage:FC = () => {
    let [fontsLoaded] = useFonts({
        IndieFlower_400Regular,
      });
      if (!fontsLoaded) {
        return <Text>Error</Text>;
      }
      else{
        return (

            <StText>Homefhsdkfhdsjkfhsdkjfhdskjfhdskpage</StText>
        
          )
      }

}

const StText = styled.Text`
font-family:${IndieFlower_400Regular},
font-family:bold,
`;


export default Homepage