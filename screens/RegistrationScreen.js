import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, firestore } from '../firebase/firebase'
import RegistrationsInput from './RegistrationsInput'
import Loader from '../components/header/Loader'
// import { error } from 'console'

const LoginScreen = () => {
  const [inputs, setInputs] = React.useState({
    name: '',
    age: '',
    occupation: '',
    participantID: '',
  });
  const [errors, setErrors] = React.useState({});
  const validate = () => {
    Keyboard.dismiss();
    let valid = true;
    if (!inputs.name){
      handleError('Please input name', 'name');
    }
    if (!inputs.age){
      handleError('Please input age', 'age');
    }
    if (!inputs.occupation){
      handleError('Please input occupation', 'occupation');
    }
    if (!inputs.participantID){
      handleError('Please input participant ID', 'participantID');
    }else if(inputs.participantID.length < 2){
      handleError('Please input valid participant ID', 'participantID');
    }
    if(valid){
      register();
    }
  };

  const register = ()=>{

  }

  const handleOnChange = (text, input) => {
    setInputs(prevState => ({...prevState, [input]: text}))
  };
  const handleError = (errorMessage, input) => {
    setErrors(prevState=>({...prevState,[input]:errorMessage}));
  };
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [fullName, setFullName] = useState('')

  const navigation = useNavigation()
  const handleEmail = () =>{
    navigation.navigate("RegistrationEmail")
  }

  const handleSignUp = () => {
    // auth
    //   .createUserWithEmailAndPassword(email, password)
    //   .then(userCredentials => {
    //     const user = userCredentials.user;
    //     console.log('Registered with:', user.email);
    //   })
    //   .catch(error => alert(error.message))
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((response) => {
          const uid = response.user.uid
          const data = {
              id: uid,
              email,
              fullName,
          };
          const usersRef = firestore.collection('users')
          usersRef
              .doc(uid)
              .set(data)
              .then(() => {
                  navigation.replace('Home', {user: data})
              })
              .catch((error) => {
                  alert(error)
              });
      })
      .catch((error) => {
          alert(error)
  });
}

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.inputContainer}>
        <Loader/>
        <RegistrationsInput label="Name" 
        error={errors.name}
        onFocus={() => {
          handleError(null, 'name');
        }}
        onChangeText={text => handleOnChange(text, 'fullname')}
        ></RegistrationsInput>
        <RegistrationsInput 
        keyboardType="numeric" 
        label="Age"
        error={errors.age}
        onFocus={() => {
          handleError(null, 'age');
        }}
        onChangeText={text => handleOnChange(text, 'age')}
        ></RegistrationsInput>
        <Text style={[styles.label]}>Gender</Text>
        <View style={styles.footerContainer}>
          <TouchableOpacity
            // onPress={handleSignUp}
            style={[styles.buttonGender, styles.buttonGenderOutline]}
            
          >
            <Text style={styles.buttonOutlineText}>Male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            // onPress={handleLogin}
            style={[styles.buttonGender, styles.buttonGenderOutline]}
            // style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Female</Text>
          </TouchableOpacity>
        </View>
        <RegistrationsInput 
        label="Occupation"
        error={errors.occupation}
        onFocus={() => {
          handleError(null, 'occupation');
        }}
        onChangeText={text => handleOnChange(text, 'occupation')}
        ></RegistrationsInput>
        <RegistrationsInput 
        keyboardType="numeric" 
        label="Participant ID"
        error={errors.participantID}
        onFocus={() => {
          handleError(null, 'participantID');
        }}
        onChangeText={text => handleOnChange(text, 'participantID')}
        ></RegistrationsInput>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={handleEmail}
          style={[styles.button]}
        >
          <Text onPress={validate} style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
  inputContainer: {
    // width: '100%',
    // borderRadius: 10,
    borderColor: '#0782F9',
    backgroundColor: '#000',
    paddingTop: 60,
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 5,
    // width: '90%',
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
    fontSize: 14, 
    color: 'grey',
  },
  footerContainer: {
    // padding: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
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