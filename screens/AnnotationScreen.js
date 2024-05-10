import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import VerticalSlider from 'react-native-vertical-slider-smartlife';
import PropTypes from 'prop-types';
import { auth, firestore, firebase } from '../firebase/firebase'
import { useNavigation } from '@react-navigation/native';
import { SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDoc, setDoc, doc, Timestamp, writeBatch } from "firebase/firestore";
import { app } from '../firebase/firebase';


const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const StressScale = ({onSaveResponse, fName}) => {
    const handleSaveResponse = () => {
        onSaveResponse(response);
        setResponse(0);
    };

    const [response, setResponse] = useState(0);

    const sliderHeight = 0.6 * screenHeight;

    const options = [
        { "id": 10, "text": "Worst distress, crisis line!" },
        { "id": 9, "text": "At a critical point!" },
        { "id": 8, "text": "High stress, struggling to manage tasks." },
        { "id": 7, "text": "Moderate to high stress, feeling overwhelmed." },
        { "id": 6, "text": "Noticeable stress, multiple manageable tasks." },
        { "id": 5, "text": "Moderate stress, facing challenges but managing." },
        { "id": 4, "text": "Slight stress, small deadline approaching" },
        { "id": 3, "text": "Calm, slight tension or unease." },
        { "id": 2, "text": "Minor stress, slightly nervous or excited." },
        { "id": 1, "text": "Fully relaxed, like on vacation." },
        { "id": 0, "text": "" },
    ];
    

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.questionText}>{fName}, on a scale of 1 to 10, how stressed are you feeling?</Text>
                {/* <Text style={styles.sliderValue}>{response}</Text> */}
                <View style={styles.sliderContainer}>
                    <VerticalSlider
                        value={response}
                        disabled={false}
                        min={0}
                        max={10}
                        onChange={(value) => setResponse(value)}
                        width={20}
                        height={sliderHeight}
                        step={1}
                        borderRadius={10}
                        minimumTrackTintColor={"#957BEE"}
                        maximumTrackTintColor={"gray"}
                    />
                    <View style={styles.sliderOptionContainer}>
                    {options.map((option) => (
                        <View
                            key={option.id}
                            style={[
                                styles.labelView,
                            ]}
                            onPress={() => handleOptionSelect(option)}
                        >
                            <Text style={[styles.optionText, 
                                {fontSize: SIZES.large, marginRight:20}, 
                                response === option.id? styles.selectedOptionText : null,
                                response !== 0 ? response !== option.id ? {opacity:0.3} : null : null]}>{option.id}</Text>
                            <Text style={[styles.optionText,
                                response === option.id? styles.selectedOptionText : null,
                                response !== 0 ? response !== option.id ? {opacity:0.3} : null : null]}>{option.text}</Text>
                        </View>
                    ))}
                    </View>
                </View>
            </View>

            

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
            <View style={styles.topSection}>
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

// check feelings for different options
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
            <View style={styles.topSection}>
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
            <View style={styles.topSection}>
                <Text style={styles.questionText}>Want to explain more about your annotation? Journal about it here.</Text>
                <Text style={styles.sliderValue}>{response}</Text>
                <TouchableOpacity style={styles.textBox}>
                
                </TouchableOpacity>
            </View>
            {/* <View style={styles.buttonContainer}>
                <Button title="Next" onPress={handleSaveResponse} color="#FFFFFF" />
            </View> */}

            <View style={styles.buttonSection}>
                <View style={styles.invalidButton}>
                    <Button title="Skip" onPress={handleSaveResponse} color="#FFFFFF" style={{width : "100%"}}/>
                    {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
                </View>
                <View style={[styles.invalidButton, response !== 0 ? styles.selectedOption : null]}>
                    <Button title="Next" onPress={handleSaveResponse} disabled={!response} color="#FFFFFF" style={{width : "100%"}}/>
                    {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
                </View>
            </View>

        </View>
    );
};

const ActivitySelect = ({ onSaveResponse, fName}) => {
    const options = [
        { "id": 1, "text": "I have performed some physical activity💪" },
        { "id": 2, "text": "I have moved from high temperature region to low temperature region🌡️" },
        { "id": 3, "text": "I have taken some kind of medication💊" },
        { "id": 4, "text": "I have had some food🍽️" },
        { "id": 5, "text": "I have had coffee☕" }
    ];

    const [selectedOptions, setSelectedOptions] = useState([]);
    const [moveAhead, setMoveAhead] = useState(false);

    const handleOptionSelect = (option) => {
        // Check if the option is already selected
        if (selectedOptions.includes(option.id)) {
            // If selected, remove it from the selectedOptions array
            setSelectedOptions(selectedOptions.filter((selectedId) => selectedId !== option.id));
        } else {
            // If not selected, add it to the selectedOptions array
            setSelectedOptions([...selectedOptions, option.id]);
        }
        setMoveAhead(selectedOptions.length > 0);
    };

    const handleSaveResponse = () => {
        onSaveResponse(selectedOptions);
        setSelectedOptions([]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.questionText}>Stay connected, {fName}! You're doing great🌟. Select the activities you've engaged in since your last annotation.</Text>
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
            </View>

            {/* <Text style={{color:"#FFFFFF"}}>{selectedOption ? selectedOption.id : null}</Text> */}

            <View style={[styles.invalidButton, moveAhead ? styles.selectedOption : null]}>
                <Button title="Next" onPress={handleSaveResponse} disabled={!moveAhead} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>
        </View>
    );
};

const AnnotationConfidence = ({onSaveResponse, fName}) => {
    const handleSaveResponse = () => {
        onSaveResponse(response);
        setResponse(0);
    };

    const options = [
        { "id": 5, "text": "100%, not even a pinch of doubt!", "subText": "🤩" },
        { "id": 4, "text": "Definitely Sure!", "subText": "😎" },
        { "id": 3, "text": "Sure", "subText": "🙂" },
        { "id": 2, "text": "Somewhat not sure", "subText": "😬" },
        { "id": 1, "text": "Not sure", "subText": "😳" },
        { "id": 0, "text": "", "subText": "" },
    ]

    const [response, setResponse] = useState(0);

    const sliderHeight = 0.6 * screenHeight;

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.questionText}>{fName}, how confident are you about the annotation you made?</Text>
                {/* <Text style={styles.sliderValue}>{response}</Text> */}
                <View style={styles.sliderContainer}>
                    <View style={[styles.sliderOptionContainer2, {width:'25%'}]}>
                    {options.map((option) => (
                        <View
                            key={option.id}
                            style={[
                                styles.labelView,
                            ]}
                            onPress={() => handleOptionSelect(option)}
                        >
                            <Text style={[styles.optionText, 
                                {fontSize: SIZES.large, marginRight:20}, 
                                response === option.id? styles.selectedOptionText : null,
                                response !== 0 ? response !== option.id ? {opacity:0.3} : null : null]}>{option.subText}</Text>
                        </View>
                    ))}
                    </View>
                    <VerticalSlider
                        value={response}
                        disabled={false}
                        min={0}
                        max={5}
                        onChange={(value) => setResponse(value)}
                        width={20}
                        height={sliderHeight}
                        step={1}
                        borderRadius={10}
                        minimumTrackTintColor={"#957BEE"}
                        maximumTrackTintColor={"#2A272A"}
                    />
                    <View style={[styles.sliderOptionContainer2, {width:"75%"}]}>
                    {options.map((option) => (
                        <View
                            key={option.id}
                            style={[
                                styles.labelView,
                            ]}
                            onPress={() => handleOptionSelect(option)}
                        >
                            <Text style={[styles.optionText,
                                response === option.id? styles.selectedOptionText : null,
                                response !== 0 ? response !== option.id ? {opacity:0.3} : null : null]}>{option.text}</Text>
                        </View>
                    ))}
                    </View>
                </View>
            </View>

            {/* <View style={styles.buttonContainer}>
                <Button title="Next" onPress={handleSaveResponse} color="#FFFFFF" />
            </View> */}

            <View style={styles.buttonSection}>
                <View style={[styles.invalidButton, response !== 0 ? styles.selectedOption : null]}>
                    <Button title="Next" onPress={handleSaveResponse} disabled={!response} color="#FFFFFF" style={{width : "100%"}}/>
                    {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
                </View>
            </View>

        </View>
    );
};

const EndAnnotation = ({onSaveResponse, fName}) => {
    const handleSaveResponse = () => {
        onSaveResponse(response);
        setResponse(0);
    };

    const [response, setResponse] = useState(0);

    return (
        <View style={styles.container}>
            <View style={{justifyContent:"center"}}>
                <Text style={styles.questionText}>Well done, {fName}💪🏼</Text>
                <Text style={styles.questionText}>You have earned a badge!</Text>
            </View>
            <View style={[styles.invalidButton, styles.selectedOption ]}>
                <Button title="Next" onPress={handleSaveResponse} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>
        </View>
    );
};

const AnnotationScreen = () => {
    const navigation = useNavigation();

    const auth = getAuth(app);
    const db = getFirestore(app);
    const userID = auth.currentUser?.uid;

    const [responses, setResponses] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [fName, setFName] = useState("");

    useEffect(() => {
        const userRef = doc(db, 'users', userID)

        async function fetchData() {
            const docSnap = await getDoc(userRef);
    
            if (docSnap.exists()) {
                data = docSnap.data(); // Get the document data
                if (data) { // Check if data exists (might be null or undefined)
                setFName(data.name);
                } else {
                console.log("Document data is empty.");
                }
            } else {
                console.log("No such document!");
            }
        }

        fetchData();

    }, [db, userID]);

    useEffect(() => {
        // Set up a listener for when the component unmounts to save responses if needed
        return () => {
          if (currentIndex === 6) {
            async function sendData() {
      
                const userRef = doc(db, "responses", userID);
              
                try {
                    setResponses({});
                  console.log(responses);
                  // Rest of your code to save responses
                  await setDoc(userRef, {
                    timestamp: Timestamp.now(), // Convert timestamp to string (adjust format if needed)
                    userID,
                    responses // Spread existing responses (question1, question2, etc.)
                  });
                  console.log('Responses saved successfully!');
                } catch (error) {
                  // ...
                }
            }
    
            sendData();
            navigation.navigate('HomePage'); // Navigate back to HomeScreen after completing questions
          }
        };
      }, [currentIndex, responses, navigation, db, userID, app]);
    
      const handleSaveResponse = (response) => {
        const updatedResponses = {
          ...responses, // Only necessary if modifying existing responses within the loop
          [`question${currentIndex + 1}`]: response,
        };
        setResponses(updatedResponses);
      
        if (currentIndex < 6) {
          setCurrentIndex(currentIndex + 1);
        } 
      };
      
    //   const saveResponsesToFirestore = async (responses, userID, app) => {
    //     const db = getFirestore(app); // Assuming you have access to the Firestore instance
      
    //     const userResponseRef = doc(db, 'responses', userID);
      
    //     try {
    //       console.log(responses);
    //       await setDoc(userResponseRef, {
    //         timestamp: Timestamp.now(), // Convert timestamp to string (adjust format if needed)
    //         userID,
    //         responses // Spread existing responses (question1, question2, etc.)
    //       });
    //       console.log('Responses saved successfully!');
    //       navigation.navigate('HomePage');
    //     } catch (error) {
    //       console.error('Error saving responses:', error);
    //       // Handle the error (e.g., display message)
    //     }
    //   };

      const Placeholder = () => {
        return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={styles.questionText}>Loading user data...</Text>
          </View>
        );
      };

      let componentToRender;

      if (!fName) {
        // Show placeholder while fName is not available
        componentToRender = <Placeholder />;
      } else {
        // Render actual components based on currentIndex
        // ... your existing logic using currentIndex ...
        if (currentIndex === 0) {
            componentToRender = <StressScale onSaveResponse={handleSaveResponse} fName={fName}/>;
        } else if (currentIndex === 1) {
            componentToRender = <ValenceArousal onSaveResponse={handleSaveResponse} />;
        } else if (currentIndex === 2) {
            componentToRender = <FeelingSelect onSaveResponse={handleSaveResponse}/>;
        } else if (currentIndex === 3) {
          componentToRender = <Journal onSaveResponse={handleSaveResponse}/>;
        } else if (currentIndex === 4){
          componentToRender = <ActivitySelect onSaveResponse={handleSaveResponse} fName={fName}/>;
        } else if (currentIndex === 5){
          componentToRender = <AnnotationConfidence onSaveResponse={handleSaveResponse} fName={fName}/>;
        } else {
          componentToRender = <EndAnnotation onSaveResponse={handleSaveResponse} fName={fName}/>;
        }
      }
  
      return (
          <SafeAreaView style={{ flex: 1, backgroundColor: "#000000" }}>
              {componentToRender}
          </SafeAreaView>
      );
    
};

export default AnnotationScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent:'space-between',
        alignItems: 'center',
        margin: 10,
        borderRadius: 40,
        marginBottom: 10,
        width: screenWidth - 20,
        backgroundColor:"#000000",
        shadowColor: "#000000",
    },
    buttonSection: {
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width:"100%",
        marginBottom: 30, // Adjust as needed for spacing between buttons and bottom
    },
    topSection: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20,
        width:"100%"
    },
    questionText: {
        fontSize: SIZES.xLarge,
        color: "#FFFFFF",
        width:"100%"
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
      label: {
        fontSize: 12,
        color: '#333',
        textAlign: 'center',
        position: 'absolute', // Required for absolute positioning
      },
      sliderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      labels: {
        marginLeft: 10,
      },
      labelContainer: {
        marginBottom: 3,
      },
    sliderOptionContainer: {
        flexDirection: 'column',
        width: "80%",
        marginBottom: 20,
        marginTop: 20,
        padding: 10,
        justifyContent:"space-around"
    },
    sliderOptionContainer2: {
        flexDirection: 'column',
        width: "80%",
        height: "100%",
        marginBottom: 20,
        marginTop: 20,
        padding: 10,
        justifyContent:"space-around",
    },
    labelView: {
        padding: 10,
        borderColor: 'rgba(255, 255, 255, 0.5)',
        flexDirection: 'row',
        alignItems: 'left',
        width: "100%",
    },
});