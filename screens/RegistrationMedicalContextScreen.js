import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, firestore } from '../firebase/firebase'
import RegistrationsInput from './RegistrationsInput'
import Loader from '../components/header/Loader'
import MyComponent from '../components/header/progressBar'

// import { error } from 'console'

const RegistrationMedicalContextScreen = () => {
  const navigation = useNavigation()
  const handleMedicalContext = () =>{
    navigation.navigate("OnboardingScreen")
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding">
        <MyComponent/>
      <Text style={styles.headingText}>Thank you Hardikya, just one last step before we customize the application according to your needs.
      </Text>
      <View style={styles.inputContainer}>
        <Text style={[styles.label]}>Do you have any history of cardiovascular disease?</Text>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            // onPress={handleSignUp}
            style={[styles.buttonGender, styles.buttonGenderOutline]} >
            <Text style={styles.buttonOutlineText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonGender, styles.buttonGenderOutline]}>
            <Text style={styles.buttonOutlineText}>No</Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.label]}>Do you have any history clinical anxiety or depression?</Text>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            style={[styles.buttonGender, styles.buttonGenderOutline]}>
            <Text style={styles.buttonOutlineText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonGender, styles.buttonGenderOutline]}>
            <Text style={styles.buttonOutlineText}>No</Text>
          </TouchableOpacity>
        </View>

        <RegistrationsInput 
        label="Would you like to report any other disease?"
        ></RegistrationsInput>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={handleMedicalContext}
          >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default RegistrationMedicalContextScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  headingText: {
    fontSize: 20,
    color: 'white',
    // paddingVertical: '10%',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  inputContainer: {
    width: '90%',
    // borderRadius: 10,
    borderColor: '#0782F9',
    backgroundColor: '#000',
    paddingTop: 20,

  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 5,
    // paddingBottom: 10,
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
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
    // height: '20%',
  },
  buttonOutlineText: {
    color: 'grey',
    // fontWeight: '700',
    fontSize: 16,
  },
  label: {
    marginVertical: 5,
    fontSize: 16, 
    color: 'white',
  },
  footerContainer: {
    // padding: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingBottom: 30,
  },
  buttonGender:{
    backgroundColor: '#000',
    width: '45%',
    padding: 14,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonGenderOutline: {
    backgroundColor: '#000',
    marginTop: 5,
    borderColor: '#fff',
    borderWidth: 1,
  },
})



        {/* <TextInput
          placeholder="Full Name"
          value={fullName}
          onChangeText={text => setFullName(text)}
        //   onChangeText={() => {}}
          style={styles.input}
        />
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        //   onChangeText={() => {}}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={text => setPassword(text)}
        //   onChangeText={() => {}}
          style={styles.input}
          secureTextEntry
        />
        <TextInput
          placeholder="Confirm Password"
          value={confirmPassword}
          onChangeText={text => setConfirmPassword(text)}
        //   onChangeText={() => {}}
          style={styles.input}
          secureTextEntry
        /> */}