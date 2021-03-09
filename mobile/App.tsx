import React from 'react';
import * as Sentry from "sentry-expo";

import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';

import { Roboto_400Regular, Roboto_500Medium } from '@expo-google-fonts/roboto';
import { Ubuntu_700Bold, useFonts } from '@expo-google-fonts/ubuntu';

import Routes from './src/routes';

Sentry.init({
  dsn: "https://7697f090eb6842e6bcb8a2d140a3e55b@o497854.ingest.sentry.io/5574595",
  enableInExpoDevelopment: true,
  release: `ecoleta_mobile@${process.env.npm_package_version}`,
  debug: true,
});


export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_500Medium,
    Ubuntu_700Bold
  });

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <> 
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      <Routes />
    </>
  );
}
