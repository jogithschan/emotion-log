import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, firestore } from '../firebase/firebase'
import RegistrationsInput from './RegistrationsInput'
import Loader from '../components/header/Loader'
import MyComponent from '../components/header/progressBar'

// import { error } from 'console'

const OnboardingScreen = () => {
  const navigation = useNavigation()
  const handleOnboardingScreen = () =>{
    navigation.navigate("OnboardingScreenAbout")
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">
      <Text style={styles.headingText}>Let's go!🔥{"\n"}{"\n"}
        Before jumping to data annotation, let's explore why you are here. {"\n"}{"\n"}
        Are you ready?
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={handleOnboardingScreen}
          >
          <Text style={styles.buttonText}>Hell yes, let's go</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  headingText: {
    fontSize: 26,
    color: 'white',
    paddingTop: '60%',
    display: "flex",
    alignItems: "center",
    fontWeight: 'bold',
    textAlign: 'left',
  },
  buttonContainer: {
    width: '90%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 'auto',
    marginBottom: 40,    
  },
  button: {
    backgroundColor: '#957BEE',
    width: '100%',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    // height: '20%',
  },
})
