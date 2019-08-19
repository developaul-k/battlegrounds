import React, { useEffect } from "react";
import { StatusBar } from "react-native";
import { Asset } from "expo-asset";
import Navigator from "./navigation/Navigator";

export default function App() {
  const preload = async () => {
    try {
      await Asset.loadAsync([
        require("./assets/splash-battle.png")
      ]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    preload();
  }, []);

  return (
    <>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <Navigator />
    </>
  );
}
