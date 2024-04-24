import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, firestore } from '../firebase/firebase'
import RegistrationsInput from './RegistrationsInput'
import Loader from '../components/header/Loader'
import MyComponent from '../components/header/progressBar'

// import { error } from 'console'

const OnboardingScreenAbout1 = () => {
  const navigation = useNavigation()
  const handleOnboardingScreen = () =>{
    navigation.navigate("OnboardingScreenAbout2")
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">
      <Text style={styles.headingText}>An <Text style={styles.innerText}>annotation</Text> is just like adding a sticky note of your emotions making it easy for the machine to understand.{"\n"}{"\n"}
      This app let's you <Text style={styles.innerText}>annotate your emotions</Text> and stress at your <Text style={styles.innerText}>convenience.</Text>
      </Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={handleOnboardingScreen}
          >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default OnboardingScreenAbout1

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
    paddingTop: '55%',
    display: "flex",
    alignItems: "center",
    fontWeight: 'bold',
    textAlign: 'left',
    paddingLeft: 12.5,
  },
  innerText: {
    color: '#957BEE'
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
