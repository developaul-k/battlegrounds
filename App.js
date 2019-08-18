import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import { Asset } from 'expo-asset';
import TabNavigation from './navigation/TabNavigation';

export default function App() {
  const preload = async () => {
    try {
      await Asset.loadAsync([require('./assets/splash-battle.png')]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabNavigation />
    </SafeAreaView>
  );
}
