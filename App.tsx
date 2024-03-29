import "react-native-gesture-handler";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';

import theme from './src/global/styles/theme';
import AppLoading from 'expo-app-loading';
import { Routes } from './src/routes/index';
import { StatusBar } from "react-native";
import { AuthProvider, useAuth } from './src/hooks/auth';
import { SignIn } from "./src/screens/SignIn";

export default function App() {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  });

  if (!fontsLoaded) {
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  )
}

