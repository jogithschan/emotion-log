import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import { auth, firestore, firebase } from '../firebase/firebase'
import { useNavigation } from '@react-navigation/native';
import { SIZES } from '../constants';

const screenWidth = Dimensions.get('window').width;

const AnnotationMethods = ({onSaveResponse}) => {
    const handleSaveResponse = () => {
        onSaveResponse();
    };

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>username, this personal annotation tool offers multiple ways to capture your thoughts and feelings. You can choose amongst these methods that feel most natural to you.</Text>

            <View style={[styles.invalidButton, styles.selectedOption]}>
                <Button title="Next" onPress={handleSaveResponse} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>

        </View>
    );
};

const FrequencySelect = ({ onSaveResponse }) => {
    const options = [
        { "id": 1, "text": "1 time a day" },
        { "id": 2, "text": "2 times a day" },
        { "id": 3, "text": "3 times a day" },
        { "id": 4, "text": "4 times a day" },
        { "id": 5, "text": "Other" },
        { "id": 6, "text": "I'm not sure" }
    ];

    const [selectedOption, setSelectedOption] = useState(null);

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        // console.log(selectedOption);
    };

    const handleSaveResponse = () => {
        onSaveResponse(selectedOption.id);
        setSelectedOption(null);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>username, how many times in a day would you like to annotate data? Remember, the more you annotate the more control you have over your stress.</Text>

            <View style={styles.optionContainer}>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={[
                            styles.optionButton,
                            selectedOption ? selectedOption.id === option.id ? styles.selectedOption : null : null
                        ]}
                        onPress={() => handleOptionSelect(option)}
                    >
                        <Text style={[
                            styles.optionText,
                            selectedOption ? selectedOption.id === option.id ? styles.selectedOptionText : null : null]}>{option.text}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* <Text style={{color:"#FFFFFF"}}>{selectedOption ? selectedOption.id : null}</Text> */}

            <View style={[styles.invalidButton, selectedOption? styles.selectedOption : null]}>
                <Button title="Save and set my time!" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>
        </View>
    );
};

const AlarmSelect = ({ onSaveResponse }) => {
    const options = [
        { "id": 1, "text": "Nervous" },
        { "id": 2, "text": "Stressed" },
        { "id": 3, "text": "Tensed" },
        { "id": 4, "text": "Disgusted" },
        { "id": 5, "text": "Angry" },
        { "id": 6, "text": "Fearful" }
    ];

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleOptionSelect = (option) => {
        // Check if the option is already selected
        if (selectedOptions.includes(option.id)) {
            // If selected, remove it from the selectedOptions array
            setSelectedOptions(selectedOptions.filter((selectedId) => selectedId !== option.id));
        } else {
            // If not selected, add it to the selectedOptions array
            setSelectedOptions([...selectedOptions, option.id]);
        }
    };

    const handleSaveResponse = () => {
        onSaveResponse(selectedOptions);
        setSelectedOptions([]);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>username, what would be your preferred times to annotate your data?</Text>

            <View style={styles.optionContainer}>
                {options.map((option) => (
                    <TouchableOpacity
                        key={option.id}
                        style={[
                            styles.optionButton,
                            selectedOptions.includes(option.id) ? styles.selectedOption : null,
                        ]}
                        onPress={() => handleOptionSelect(option)}
                    >
                        <Text style={[
                            styles.optionText,
                            selectedOptions.includes(option.id) ? styles.selectedOptionText : null]}>{option.text}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* <Text style={{color:"#FFFFFF"}}>{selectedOption ? selectedOption.id : null}</Text> */}

            <View style={[styles.invalidButton, selectedOptions.length !== 0 ? styles.selectedOption : null]}>
                <Button title="Save and start my journey➡️" onPress={handleSaveResponse} disabled={!selectedOptions} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>
        </View>
    );
};

const EndSelection = ({onSaveResponse}) => {
    const handleSaveResponse = () => {
        onSaveResponse(response);
        setResponse(0);
    };

    const [response, setResponse] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>Well done, username💪🏼</Text>
            <Text style={styles.questionText}>You have earned a badge!</Text>

        </View>
    );
};





const TimetableScreen = () => {
    const user = auth.currentUser;
    const navigation = useNavigation();

    const [responses, setResponses] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Set up a listener for when the component unmounts to save responses if needed
        return () => {
          if (currentIndex === 20) {
            // saveResponsesToFirestore(responses);
            navigation.navigate('Home'); // Navigate back to HomeScreen after completing questions
          }
        };
      }, [currentIndex, 3, responses, navigation]);
    
      const handleSaveResponse = (response) => {
        const updatedResponses = { ...responses };
        updatedResponses[`question${currentIndex + 1}`] = response;
        setResponses(updatedResponses);
    
        if (currentIndex < 10) {
          setCurrentIndex(currentIndex + 1);
        } else {
        //   saveResponsesToFirestore(updatedResponses);
        //   navigation.navigate('Home'); // Navigate back to HomeScreen after completing questions
        }
      };

      const nextScreen = () => {
        if (currentIndex < 10) {
            setCurrentIndex(currentIndex + 1);
        } else {
        //   saveResponsesToFirestore(updatedResponses);
        //   navigation.navigate('Home'); // Navigate back to HomeScreen after completing questions
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

      let componentToRender;

      if (currentIndex === 0) {
          componentToRender = <AnnotationMethods onSaveResponse={nextScreen} />;
      } else if (currentIndex === 1) {
          componentToRender = <FrequencySelect onSaveResponse={handleSaveResponse} />;
      } else if (currentIndex === 2) {
          componentToRender = <AlarmSelect onSaveResponse={handleSaveResponse}/>;
      } else {
        componentToRender = <EndSelection onSaveResponse={saveResponsesToFirestore}/>;
      }
  
      return (
          <View style={{ flex: 1, backgroundColor: "#000000" }}>
              {componentToRender}
          </View>
      );
    
};

export default TimetableScreen;

const styles = StyleSheet.create({
    container: {
        flex: 0,
        alignItems: 'left',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 40,
        marginBottom: 10,
        width: screenWidth - 20,
        backgroundColor:"#000000",
        shadowColor: "#000000",
    },
    questionText: {
        fontSize: SIZES.xLarge,
        color: "#FFFFFF"
        // marginBottom: 5,
      },
    sliderValue: {
        fontSize: SIZES.large,
        marginTop: 20,
        color:"#FFFFFF"
      },
    buttonContainer: {
        width: '100%',
        marginTop: 20,
        backgroundColor: "#957BEE",
      },
    buttonContainerOption: {
        width: '100%',
        color: "#000000",
    },
    mainText:{
        fontSize: SIZES.medium,
        color: "#FFFFFF"
    },
    subText:{
        fontSize: SIZES.small,
        color: "#FFFFFF"
    },
    optionContainer: {
        flexDirection: 'column',
        width: "100%",
        marginBottom: 20,
        marginTop: 20,
        padding: 10,
    },
    optionButton: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        width: "100%",
    },
    textBox: {
        borderWidth: 1,
        borderRadius: 8,
        padding: 80,
        marginBottom: 10,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        alignItems: 'center',
        width: "100%",
        length: "20%",
    },
    invalidButton: {
        borderWidth: 0,
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(149, 123, 238, 0.5)',
        alignItems: 'center',
        width: "100%",
    },
    optionText: {
        fontSize: SIZES.large,
        color: 'rgba(255, 255, 255, 0.5)',
    },
    subText: {
        fontSize: SIZES.medium,
        color: 'rgba(255, 255, 255, 0.5)',
        textAlign: 'center'
    },
    selectedOption: {
        backgroundColor: '#957BEE',
    },
    selectedOptionText: {
        color: '#FFFFFF',
    },
    buttonContainer: {
        marginTop: 20,
    },
});