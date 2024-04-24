import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegistrationScreen from './screens/RegistrationScreen'
import QuestionsScreen from './screens/QuestionsScreen'
import { COLORS, icons, images, SIZES } from './constants'
import { ScreenHeaderBtn } from './components/header/ScreenHeaderBtn'
import { auth, firestore } from './firebase/firebase'
import RegistrationEmailScreen from './screens/RegistrationEmailScreen';
import RegistrationMedicalContextScreen from './screens/RegistrationMedicalContextScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import OnboardingScreenAbout from './screens/OnboardingScreenAbout';
import OnboardingScreenAbout1 from './screens/OnboardingScreenAbout1';
import OnboardingScreenAbout2 from './screens/OnboardingScreenAbout2';
import OnboardingScreenAbout3 from './screens/OnboardingScreenAbout3';

const Stack = createNativeStackNavigator();

const routeLogin = () =>{
  navigation.replace("Login")
}

export default function App() {

  // presist login
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />  
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen name="Questions" component={QuestionsScreen} />
        <Stack.Screen name="RegistrationEmail" component={RegistrationEmailScreen} />
        <Stack.Screen name="RegistrationMedicalContext" component={RegistrationMedicalContextScreen} />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
        <Stack.Screen name="OnboardingScreenAbout" component={OnboardingScreenAbout} />
        <Stack.Screen name="OnboardingScreenAbout1" component={OnboardingScreenAbout1} />
        <Stack.Screen name="OnboardingScreenAbout2" component={OnboardingScreenAbout2} />
        <Stack.Screen name="OnboardingScreenAbout3" component={OnboardingScreenAbout3} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
