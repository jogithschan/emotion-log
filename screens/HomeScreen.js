import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { firebase, auth, firestore } from '../firebase/firebase'
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [userResponses, setUserResponses] = useState([]);
  const userID = auth.currentUser

  useEffect(() => {
    const fetchUserResponses = async () => {
      try {
        const db = firebase.firestore();
        const userResponsesRef = db.collection('userResponses');

        const snapshot = await userResponsesRef.where('userID', '==', userID).get();

        const responses = [];
        snapshot.forEach((doc) => {
          const data = doc.data();
          responses.push({
            id: doc.id,
            timestamp: data.timestamp ? data.timestamp.toDate() : null,
            question1Response: data.question1,
          });
        });

        setUserResponses(responses);
      } catch (error) {
        console.error('Error fetching user responses:', error);
        // Handle the error or set an appropriate state to indicate the error
      }
  };

    fetchUserResponses();
  }, [userID]);

  const renderUserResponse = ({ item }) => {
    return (
      <TouchableOpacity style={styles.cardContainer}>
        <Text>Date: {item.timestamp ? item.timestamp.toLocaleDateString() : 'N/A'}</Text>
        <Text>Time: {item.timestamp ? item.timestamp.toLocaleTimeString() : 'N/A'}</Text>
        <Text>Response to first question: {item.question1Response}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate('Questions')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Create Entry</Text>
      </TouchableOpacity>

      <FlatList
        data={userResponses}
        renderItem={renderUserResponse}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
    },
    button: {
      backgroundColor: '#3498db',
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    cardContainer: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginBottom: 10,
      width: '100%', // Ensure the width occupies the entire space
    },
    flatList: {
      width: '100%',
    },
  });

export default HomeScreen;
