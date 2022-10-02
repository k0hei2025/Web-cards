import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Navigation from './navigations/index';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import styled from '@emotion/native'

export default function App() {
  return (
 
    <SafeAreaProvider>
      {/* <StView> */}
    <Navigation />
      {/* </StView> */}
    </SafeAreaProvider>
   
  );
}

