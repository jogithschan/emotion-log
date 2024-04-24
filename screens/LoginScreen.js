import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { app } from '../firebase/firebase'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';

const LoginScreen = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigation = useNavigation();

  const auth = getAuth(app);

  const handleSignUp = () =>{
    navigation.navigate("Registration")
  }

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const uid = userCredential.user.uid;
      navigation.navigate('HomePage')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
    });
  }

  // const handleLogin = () => {
  //   navigation.navigate('HomePage')
  // }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      {/* <View style={styles.inputContainer}>
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
      </View> */}
      <SafeAreaView>
        <View style={styles.container}>
          <LinearGradient
            colors={['#000', 'transparent']}
            style={styles.background}
          />
          <View style={styles.header}>
              <Image 
              style = {{width: 50, height: 50, marginRight: 5, marginLeft: 5}}
              source={require('../assets/images/onboardingScreenPerson1.png')}
              />
              <Text style={styles.boldText}>
                I feel overwhelmed by the demands of work/school and find it hard to prioritize tasks effectively.
              </Text>
          </View>
          <View style={{
            justifyContent: 'center',
            marginTop: '50%',
            marginLeft: '2%',
            // width: '90%',
          }}>
            <Text style={styles.baseText}>
              Let's record together how you feel on day to day basis to better understand your psychological health.
            </Text>
          </View>
        </View>
      </SafeAreaView>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleSignUp}
          style={styles.button}
        >
          <Text style={styles.buttonText}>New to the app? Register now.</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, styles.buttonOutline]}
        >
          <Text style={styles.buttonOutlineText}>Already have an account? Log in.</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    backgroundColor: 'white',
    // padding: 20,
    marginTop: 120,
    paddingTop: 20,
    paddingBottom: 20,
    width: '95%',
    borderRadius: '10px',
    flexDirection: 'row',
  },
  boldText: {
    fontWeight: 'medium',
    flex: 1,
    marginRight: 20,
  },
  baseText: {
    fontWeight: 'bold',
    fontSize: '20px',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8368F1',
  },
  background: {
    position: 'absolute',
    left: -20,
    right: -20,
    top: -140,
    height: 300,
  },
  quoteTextContainer: {
    
  },
  // inputContainer: {
  //   width: '90%'
  // },
  // input: {
  //   backgroundColor: 'white',
  //   paddingHorizontal: 15,
  //   paddingVertical: 10,
  //   borderRadius: 10,
  //   marginTop: 5,
  // },
  buttonContainer: {
    width: '90%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // marginTop: 600,
    marginTop: 'auto',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#000000',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 10,
    borderColor: 'white',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#000',
    fontWeight: '700',
    fontSize: 16,
  },
})
