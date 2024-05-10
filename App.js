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
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from "expo-constants"; // Optional
import { app } from './firebase/firebase'
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const Stack = createNativeStackNavigator();

export default function App() {

  // presist login
  // const auth = getAuth(app);
  // onAuthStateChanged(auth, (user) => {
  //   if (user) {
  //     // User is signed in, see docs for a list of available properties
  //     // https://firebase.google.com/docs/reference/js/auth.user
  //     const uid = user.uid;
  //     navigation.replace("HomePage", { uid });
  //     // ...
  //   } else {
  //     // User is signed out
  //     // ...
  //     navigation.replace("Login");
  //   }
  // });
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen options={{ headerShown: false }} name="HomePage" component={HomePage}/> 
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Annotation" component={AnnotationScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Timetable" component={TimetableScreen} />
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
