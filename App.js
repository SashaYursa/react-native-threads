import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { load } from './src/loadApp';
import { useEffect, useState, useCallback } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import styled from 'styled-components';
import Navigation from './src/navigation/Navigation';
import { Provider } from 'react-redux';
import store from './src/store';

export default function App() {
  const [isLoading, setLoading] = useState(true);
  SplashScreen.preventAutoHideAsync()
  .catch(console.warn);
  useEffect(()=>{
    const l = async () => {
      await load(SplashScreen);
      setLoading(false);
    }
    l();
  }, [])
  const onLayoutRootView = useCallback(async () => {
    if (isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);
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