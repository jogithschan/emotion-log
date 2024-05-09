import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import PropTypes from 'prop-types';
import { auth, firestore, firebase } from '../firebase/firebase'
import { useNavigation } from '@react-navigation/native';
import { SIZES } from '../constants';

const screenWidth = Dimensions.get('window').width;

const StressScale = ({onSaveResponse}) => {
    const handleSaveResponse = () => {
        onSaveResponse(response);
        setResponse(0);
    };

    const [response, setResponse] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>Name, on a scale of 1 to 10, how stressed are you feeling?</Text>

            <Text style={styles.sliderValue}>{response}</Text>

            <Slider
            style={{ width: screenWidth - 60, marginTop: 10 }}
            minimumValue={0}
            maximumValue={10}
            step={1}
            value={response}
            onValueChange={(value) => setResponse(value)}
            // minimumTrackTintColor={getTrackColor(response)} // Color for the left side of the thumb
            // maximumTrackTintColor={getTrackColor(response)} // Color for the right side of the thumb
            thumbTintColor="#957BEE"
            />

            {/* <View style={styles.buttonContainer}>
                <Button title="Next" onPress={handleSaveResponse} color="#FFFFFF" />
            </View> */}

            <View style={[styles.invalidButton, response !== 0 ? styles.selectedOption : null]}>
                <Button title="Next" onPress={handleSaveResponse} disabled={!response} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>

        </View>
    );
};

const ValenceArousal = ({ onSaveResponse }) => {
    const options = [
        { id: 1, text: 'Low Arousal, Negative Valence', subtext: 'feeling sad, depressed, lethargic, or fatigued.' },
        { id: 2, text: 'High Arousal, Negative Valence', subtext: 'feeling upset, nervous, stressed, tense, disgust, anger or fear.' },
        { id: 3, text: 'High Arousal, Positive Valence', subtext: 'feeling alert, excited, happy or elated.' },
        { id: 4, text: 'Low Arousal, Positive Valence', subtext: 'feeling contented, serene, relaxed or calm.' },
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
            <Text style={styles.questionText}>Select the option that best describes how you're feeling now.</Text>

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
                        <Text style={[
                            styles.subText,
                            selectedOption ? selectedOption.id === option.id ? styles.selectedOptionText : null : null]}>{option.subtext}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* <Text style={{color:"#FFFFFF"}}>{selectedOption ? selectedOption.id : null}</Text> */}

            {/* <View style={styles.optionContainer}>
                <TouchableOpacity 
                    style={[styles.optionButton, styles.selectedOption, {borderWidth: 0}]}
                    onPress={() => handleSaveResponse}>
                    <Text style={[styles.optionText, styles.selectedOptionText]}>Next</Text>
                </TouchableOpacity>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> 
            </View> */}

            <View style={[styles.invalidButton, selectedOption !== 0 ? styles.selectedOption : null]}>
                <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>
        </View>
    );
};

const FeelingSelect = ({ onSaveResponse }) => {
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
            <Text style={styles.questionText}>What emotions are you feeling?</Text>

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
                <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOptions} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>
        </View>
    );
};

const Journal = ({onSaveResponse}) => {
    const handleSaveResponse = () => {
        onSaveResponse(response);
        setResponse("");
    };

    const [response, setResponse] = useState("");

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>Want to explain more about your annotation? Journal about it here.</Text>

            <Text style={styles.sliderValue}>{response}</Text>

            <TouchableOpacity style={styles.textBox}>
                
            </TouchableOpacity>
            {/* <View style={styles.buttonContainer}>
                <Button title="Next" onPress={handleSaveResponse} color="#FFFFFF" />
            </View> */}

            <View style={styles.invalidButton}>
                <Button title="Skip" onPress={handleSaveResponse} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>

            <View style={[styles.invalidButton, response !== 0 ? styles.selectedOption : null]}>
                <Button title="Next" onPress={handleSaveResponse} disabled={!response} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>

        </View>
    );
};

const ActivitySelect = ({ onSaveResponse }) => {
    const options = [
        { "id": 1, "text": "I have performed some physical activity💪" },
        { "id": 2, "text": "I have moved from high temperature region to low temperature region🌡️" },
        { "id": 3, "text": "I have taken some kind of medication💊" },
        { "id": 4, "text": "I have had some food🍽️" },
        { "id": 5, "text": "I have had coffee☕" }
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
            <Text style={styles.questionText}>Stay connected, username! You're doing great🌟. Select the activities you've engaged in since your last annotation.</Text>

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
                <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOptions} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>
        </View>
    );
};

const AnnotationConfidence = ({onSaveResponse}) => {
    const handleSaveResponse = () => {
        onSaveResponse(response);
        setResponse(0);
    };

    const [response, setResponse] = useState(0);

    return (
        <View style={styles.container}>
            <Text style={styles.questionText}>username, how confident are you about the annotation you made?</Text>

            <Text style={styles.sliderValue}>{response}</Text>

            <Slider
            style={{ width: screenWidth - 60, marginTop: 10 }}
            minimumValue={0}
            maximumValue={6}
            step={1}
            value={response}
            onValueChange={(value) => setResponse(value)}
            // minimumTrackTintColor={getTrackColor(response)} // Color for the left side of the thumb
            // maximumTrackTintColor={getTrackColor(response)} // Color for the right side of the thumb
            thumbTintColor="#957BEE"
            />

            {/* <View style={styles.buttonContainer}>
                <Button title="Next" onPress={handleSaveResponse} color="#FFFFFF" />
            </View> */}

            <View style={[styles.invalidButton, response !== 0 ? styles.selectedOption : null]}>
                <Button title="Next" onPress={handleSaveResponse} disabled={!response} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>

        </View>
    );
};

const EndAnnotation = ({onSaveResponse}) => {
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





const AnnotationScreen = () => {
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
          componentToRender = <StressScale onSaveResponse={handleSaveResponse} />;
      } else if (currentIndex === 1) {
          componentToRender = <ValenceArousal onSaveResponse={handleSaveResponse} />;
      } else if (currentIndex === 2) {
          componentToRender = <FeelingSelect onSaveResponse={handleSaveResponse}/>;
      } else if (currentIndex === 3) {
        componentToRender = <Journal onSaveResponse={handleSaveResponse}/>;
      } else if (currentIndex === 4){
        componentToRender = <ActivitySelect onSaveResponse={handleSaveResponse}/>;
      } else if (currentIndex === 5){
        componentToRender = <AnnotationConfidence onSaveResponse={handleSaveResponse}/>;
      } else {
        componentToRender = <EndAnnotation onSaveResponse={saveResponsesToFirestore}/>;
      }
  
      return (
          <View style={{ flex: 1, backgroundColor: "#000000" }}>
              {componentToRender}
          </View>
      );
    
};

export default AnnotationScreen;

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