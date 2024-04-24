import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/core'
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
// import RegistrationsInput from '../components/header/RegistrationsInputs';
import RegistrationsInput from './RegistrationsInput';

const RegistrationEmailScreen = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation()
  const handleMedicalContext = () =>{
    navigation.navigate("RegistrationMedicalContext")
  }
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <Text style={styles.headingText}>Hi Hardikya, welcome to the app.{"\n"}
      Let’s verify your e-mail address.
      </Text>
      <View style={styles.wholeContainer}>
        <RegistrationsInput
          placeholder={'Email'}
          onChangeText={setEmail}
          label="Email" 
        />
        <RegistrationsInput
          placeholder={'otp'}
          onChangeText={setOtp}
          error={passwordError}
          secureTextEntry
          label="OTP" 
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={handleMedicalContext}
            style={[styles.button]}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    // align
  },
  headingText: {
    fontSize: 20,
    color: 'white',
    paddingVertical: '10%',
    fontWeight: 'bold',
  },
  wholeContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonContainer: {
    width: '90%',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    marginTop: 375,
    marginBottom: 10,  
    // paddingTop: '20%',  
  },
  button: {
    backgroundColor: '#957BEE',
    width: '90%',
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
});

export default RegistrationEmailScreen