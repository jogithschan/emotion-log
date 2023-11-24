import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import { auth, firestore, firebase } from '../firebase/firebase'
import { useNavigation } from '@react-navigation/native';
import { SIZES } from '../constants';

const screenWidth = Dimensions.get('window').width;

const QuestionCard = ({ question, label1, label2, onSaveResponse }) => {
  const handleSaveResponse = () => {
    onSaveResponse(response); // Pass the response to the parent component
    setResponse(0); // Reset response after saving
  };

  const [response, setResponse] = useState(0);

  const getTrackColor = (value) => {
    return value > 0 ? 'green' : value == 0 ? 'blue' : 'red';
  };

  if(index == 4){ //handle question 5 with checkboxes
    return (
      <View style={styles.container}>
  
        <Text style={styles.questionText}>{question}</Text>
  
        <Text style={styles.sliderValue}>{response}</Text>
  
  
        <Slider
          style={{ width: screenWidth - 60, marginTop: 10 }}
          minimumValue={-3}
          maximumValue={3}
          step={1}
          value={response}
          onValueChange={(value) => setResponse(value)}
          // minimumTrackTintColor={getTrackColor(response)} // Color for the left side of the thumb
          // maximumTrackTintColor={getTrackColor(response)} // Color for the right side of the thumb
          maximumTrackTintColor='#9f9f9f'
          minimumTrackTintColor='#9f9f9f'
          thumbTintColor={getTrackColor(response)}
        />
  
        <View style={styles.sliderLabelsContainer}>
          <Text style={styles.labelText}>{label1}</Text>
          <Text style={styles.labelText}>{label2}</Text>
        </View>
  
        <View style={styles.buttonContainer}>
          <Button title="Save Response" onPress={handleSaveResponse} color="#841584" />
        </View>
  
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <Text style={styles.questionText}>{question}</Text>

      <Text style={styles.sliderValue}>{response}</Text>


      <Slider
        style={{ width: screenWidth - 60, marginTop: 10 }}
        minimumValue={-3}
        maximumValue={3}
        step={1}
        value={response}
        onValueChange={(value) => setResponse(value)}
        // minimumTrackTintColor={getTrackColor(response)} // Color for the left side of the thumb
        // maximumTrackTintColor={getTrackColor(response)} // Color for the right side of the thumb
        maximumTrackTintColor='#9f9f9f'
        minimumTrackTintColor='#9f9f9f'
        thumbTintColor={getTrackColor(response)}
      />

      <View style={styles.sliderLabelsContainer}>
        <Text style={styles.labelText}>{label1}</Text>
        <Text style={styles.labelText}>{label2}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button title="Save Response" onPress={handleSaveResponse} color="#841584" />
      </View>

    </View>
  );
};

const QuestionsScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();

  const questionsArray = [
    'My Emotion right before doing this survey was',
    'My Emotion right before doing this survey was',
    'My Attention level right before doing this survey could be rated as',
    'My Stress level right before doing this survey was',
    'My Emotion that I answered previously has not changed for recent ___ minutes',
    'Answering this survey disturbed my current activity',
    'How did your emotions change while you are answering the survey now?',
  ];

  const questionLabelsArray = [
    'Very Negative', 'Very Positive',
    'Very Calm', 'Very Excited',
    'Very Bored', 'Very Engaged',
    'Not Stressed at all', 'Very Stressed',
    'Entirely disagree', 'Entirely agree',
    'I felt more negative', 'I felt more positive'
  ]

  const [responses, setResponses] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // Set up a listener for when the component unmounts to save responses if needed
    return () => {
      if (currentIndex === questionsArray.length) {
        saveResponsesToFirestore(responses);
        navigation.navigate('Home'); // Navigate back to HomeScreen after completing questions
      }
    };
  }, [currentIndex, questionsArray.length, responses, navigation]);

  const handleSaveResponse = (response) => {
    const updatedResponses = { ...responses };
    updatedResponses[`question${currentIndex + 1}`] = response;
    setResponses(updatedResponses);

    if (currentIndex < questionsArray.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      saveResponsesToFirestore(updatedResponses);
      navigation.navigate('Home'); // Navigate back to HomeScreen after completing questions
    }
  };

  const saveResponsesToFirestore = (responses) => {
    firestore.collection('userResponses')
      .add({
        responses: responses,
        userID: user.uid,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        responseZero: responses['question1'],
      })
      .then((docRef) => {
        console.log('Responses saved with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error saving responses:', error);
      });
  };

  return (
    <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
      {currentIndex < questionsArray.length ? (
        <QuestionCard
          question={questionsArray[currentIndex]}
          label1={questionLabelsArray[currentIndex*2]}
          label2={questionLabelsArray[currentIndex*2 + 1]}
          index={currentIndex}
          onSaveResponse={handleSaveResponse}
        />
      ) : (
        <Text>All questions answered!</Text>
      )}
    </View>
  );
};

// QuestionsScreen.propTypes = {
//     route: PropTypes.shape({
//       params: PropTypes.shape({
//         user: PropTypes.object, // Define the user prop type
//       }),
//     }),
// };

export default QuestionsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 0,
    alignItems: 'left',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    margin: 10,
    borderRadius: 40,
    marginBottom: 10,
    width: screenWidth - 20,
    backgroundColor:"#FFF",
    shadowColor: "#FFF",
  },
  questionText: {
    fontSize: SIZES.large,
    // marginBottom: 5,
  },
  sliderValue: {
    fontSize: SIZES.large,
    marginTop: 20,
  },
  sliderLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginBottom: 10,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  },
});