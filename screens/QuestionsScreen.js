import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import { auth, firestore, firebase } from '../firebase/firebase'
import { useNavigation } from '@react-navigation/native';

const QuestionCard = ({ question, onSaveResponse }) => {
  const [response, setResponse] = useState(0);

  const handleSaveResponse = () => {
    onSaveResponse(response); // Pass the response to the parent component
    setResponse(0); // Reset response after saving
  };

  return (
    <View style={{ margin: 20 }}>
      <Text style={{ fontSize: 18, marginBottom: 10 }}>{question}</Text>
      <Text style={{ fontSize: 16 }}>{`Selected Value: ${response}`}</Text>
      <Slider
        style={{ width: '80%', marginTop: 10 }}
        minimumValue={-3}
        maximumValue={3}
        step={1}
        value={response}
        onValueChange={(value) => setResponse(value)}
      />
      <Button title="Save Response" onPress={handleSaveResponse} />
    </View>
  );
};

const QuestionsScreen = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();

  const questionsArray = [
    'What is your favorite color?',
    'How often do you exercise?',
    'Rate your satisfaction with our service.',
    'What is your preferred mode of transportation?',
    'Do you enjoy outdoor activities?',
  ];

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
    updatedResponses[`question${currentIndex + 1}`] = {
      value: response,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      user: user.uid, // assuming user object contains uid
    };
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
      .add(responses)
      .then((docRef) => {
        console.log('Responses saved with ID: ', docRef.id);
      })
      .catch((error) => {
        console.error('Error saving responses:', error);
      });
  };

  return (
    <View>
      {currentIndex < questionsArray.length ? (
        <QuestionCard
          question={questionsArray[currentIndex]}
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
