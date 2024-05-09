import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import RegistrationScreen from './screens/RegistrationScreen'
import QuestionsScreen from './screens/QuestionsScreen'
import AnnotationScreen from './screens/AnnotationScreen'
import OnboardingScreen from './screens/OnboardingScreen'
import TimetableScreen from './screens/TimetableScreen'
import HomePage from './screens/HomePage'
import { COLORS, icons, images, SIZES } from './constants'
import { ScreenHeaderBtn } from './components/header/ScreenHeaderBtn'
import { auth, firestore } from './firebase/firebase'


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
        <Stack.Screen options={{ headerShown: false }} name="Annotation" component={AnnotationScreen} />
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Timetable" component={TimetableScreen} />
        <Stack.Screen options={{ headerShown: false }} name="HomePage" component={HomePage}/>
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
