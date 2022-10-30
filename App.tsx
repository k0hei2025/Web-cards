import Navigation from './src/navigations/index';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { RecoilRoot } from 'recoil';

export default function App() {
  return (
    <RecoilRoot>
    <SafeAreaProvider>
      {/* <StView> */}

    <Navigation />
      {/* </StView> */}
      
    </SafeAreaProvider>
    </RecoilRoot>
   
  );

  

}

