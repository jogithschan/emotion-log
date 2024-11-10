import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import VerticalSlider from 'react-native-vertical-slider-smartlife';
import PropTypes from 'prop-types';
import { auth, firestore, firebase } from '../firebase/firebase'
import { useNavigation } from '@react-navigation/native';
import { SIZES, images} from '../constants';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const Onboarding1 = ({onSaveResponse}) => {
    const handleSaveResponse = () => {
        onSaveResponse();
    };

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.questionText}>Let’s go!🔥
                    Before jumping to data annotation, let’s explore why you are here.
                    Are you ready?
                </Text>
            </View>

            <View style={[styles.invalidButton, styles.selectedOption]}>
                <Button title="Yes, let's go!" onPress={handleSaveResponse} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>

        </View>
    );
};

const Onboarding2 = ({onSaveResponse}) => {
    const handleSaveResponse = () => {
        onSaveResponse();
    };

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.questionText}>An annotation is just like adding a sticky note of your emotions making it easy for the machine to understand.</Text>
                <Text style={styles.questionText}>This app let's you annotate your emotions and stress at your convenience.</Text>
                <Text style={styles.questionText}>Let’s now understand, how you can annotate your data.</Text>
            </View>

            <View style={[styles.invalidButton, styles.selectedOption]}>
                <Button title="Next" onPress={handleSaveResponse} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>

        </View>
    );
};

// combine onboarding3 and onboarding4
const Onboarding3 = ({onSaveResponse}) => {
    const handleSaveResponse = () => {
        onSaveResponse();
    };

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.questionText}>To annotate your emotion data, you have to select one of the emotion quadrants.
                    Let’s understand  what these quadrants are.
                
                    The quadrants are divided on the basis of arousal and valence.</Text>
            </View>

            <View style={[styles.invalidButton, styles.selectedOption]}>
                <Button title="Next" onPress={handleSaveResponse} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>

        </View>
    );
};

const Onboarding4 = ({onSaveResponse}) => {
    const handleSaveResponse = () => {
        onSaveResponse();
    };


    let valence = images.Valence;
    let arousal = images.Arousal;

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.questionText}>Arousal refers to the intensity of emotion, ranging from calm to excited.</Text>
                <Image
                    source={arousal} // Make sure 'imageUri' has the correct image file name
                    resizeMode="resize"
                    style={styles.image}
                />
                <Text style={styles.questionText}>Valence refers to the emotion being negative or positive.</Text>
                <Image
                    source={valence} // Make sure 'imageUri' has the correct image file name
                    resizeMode="resize"
                    style={styles.image}
                />
            </View>

            <View style={[styles.invalidButton, styles.selectedOption]}>
                <Button title="Next" onPress={handleSaveResponse} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>

        </View>
    );
};

const Onboarding5 = ({onSaveResponse}) => {
    const handleSaveResponse = () => {
        onSaveResponse();
    };


    let vaScale = images.VaScale;

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.questionText}>Based on arousal and valence, we get our four emotion quadrants. At any instance, your emotions will fall into one of these.</Text>
                <Image
                    source={vaScale} // Make sure 'imageUri' has the correct image file name
                    resizeMode="resize"
                    style={styles.image}
                />
            </View>

            <View style={[styles.invalidButton, styles.selectedOption]}>
                <Button title="Understood, let's move ahead" onPress={handleSaveResponse} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>

        </View>
    );
};

const Onboarding6 = ({ onSaveResponse }) => {
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
                <Text style={styles.questionText}>At every annotation, you will have to fill in the quadrant you are in. Just tap on the quadrant.</Text>
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
                <Button title="Got it!" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>
        </View>
    );
};

const Onboarding7 = ({onSaveResponse}) => {
    const handleSaveResponse = () => {
        onSaveResponse();
    };


    let vaScale = images.VaScale;

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Text style={styles.questionText}>Cool, you have understood step one. Now let’s understand how to use the stress meter.</Text>
            </View>

            <View style={[styles.invalidButton, styles.selectedOption]}>
                <Button title="Next" onPress={handleSaveResponse} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>

        </View>
    );
};

const Onboarding8 = ({onSaveResponse}) => {
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
                <Text style={styles.questionText}>On a scale of 10, just hover the stress level through this meter.</Text>
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
                <Button title="Got it, let's move ahead!" onPress={handleSaveResponse} disabled={!response} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>

        </View>
    );
};

const Onboarding9 = ({onSaveResponse}) => {
    const handleSaveResponse = () => {
        onSaveResponse();
    };


    let celebrate = images.Celebrate;

    return (
        <View style={styles.container}>
            <View style={styles.topSection}>
                <Image
                    source={celebrate} // Make sure 'imageUri' has the correct image file name
                    resizeMode="resize"
                    style={styles.image}
                />
                <Text style={styles.questionText}>That's perfect, username! Let's move to the next step!</Text>
            </View>

            <View style={[styles.invalidButton, styles.selectedOption]}>
                <Button title="Next" onPress={handleSaveResponse} color="#FFFFFF" style={{width : "100%"}}/>
                {/* <Button title="Next" onPress={handleSaveResponse} disabled={!selectedOption} color="#FFFFFF" /> */}
            </View>

        </View>
    );
};





const OnboardingScreen = () => {
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
        if (currentIndex < 9) {
            setCurrentIndex(currentIndex + 1);
        } else {
        //   saveResponsesToFirestore(updatedResponses);
          navigation.navigate('Login'); // Navigate back to HomeScreen after completing questions
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

      switch(currentIndex) {
        case 0:
            componentToRender = <Onboarding1 onSaveResponse={nextScreen} />;
            break;
        case 1:
            componentToRender = <Onboarding2 onSaveResponse={nextScreen} />;
            break;
        case 2:
            componentToRender = <Onboarding3 onSaveResponse={nextScreen} />;
            break;
        case 3:
            componentToRender = <Onboarding4 onSaveResponse={nextScreen} />;
            break;
        case 4:
            componentToRender = <Onboarding5 onSaveResponse={nextScreen} />;
            break;
        case 5:
            componentToRender = <Onboarding5 onSaveResponse={nextScreen} />;
            break;
        case 6:
            componentToRender = <Onboarding6 onSaveResponse={nextScreen} />;
            break;
        case 7:
            componentToRender = <Onboarding7 onSaveResponse={nextScreen} />;
            break;
        case 8:
            componentToRender = <Onboarding8 onSaveResponse={nextScreen} />;
            break;
        case 9:
            componentToRender = <Onboarding9 onSaveResponse={nextScreen} />;
            break;
      }

    //   if (currentIndex === 0) {
          
    //   } else if (currentIndex === 1) {
    //       componentToRender = <Onboarding2 onSaveResponse={nextScreen} />;
    //   } else if (currentIndex === 2) {
    //       componentToRender = <Onboarding3 onSaveResponse={nextScreen}/>;
    //   } else {
    //     componentToRender = <EndAnnotation onSaveResponse={saveResponsesToFirestore}/>;
    //   }
  
      return (
          <View style={{ flex: 1, backgroundColor: "#000000" }}>
              {componentToRender}
          </View>
      );
    
};

export default OnboardingScreen;

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