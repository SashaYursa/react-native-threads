import { load } from './src/loadApp';
import { useEffect, useState} from 'react';
import * as SplashScreen from 'expo-splash-screen';
import Navigation from './src/navigation/Navigation';
import { Provider } from 'react-redux';
import store from './src/store';

import axios from 'axios';
export default function App() {
  const [isLoading, setLoading] = useState(true);
  SplashScreen.preventAutoHideAsync();
  useEffect(()=>{
    const l = async () => {
      await load(SplashScreen);
      setLoading(false);
      //const res = 
      await axios.post(`https://app.nativenotify.com/api/indie/notification`, {
      subID: '123',
      appId: 13309,
      appToken: '9Sr3Pqbh3qfiyZsUNbVSTt',
      title: 'yourid is',
      message: '123'
      })
      .catch(err => {
        console.log(err)
      })
    }
    l();
    

  }, []);

  return isLoading
  ? (
    null
  )
  :(
    <Provider store={store}>
      <Navigation/>
    </Provider>
  )
}