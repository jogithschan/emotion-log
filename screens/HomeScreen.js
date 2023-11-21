import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { firebase, auth, firestore } from '../firebase/firebase'
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  
  const [entityText, setEntityText] = useState('')
  const [entities, setEntities] = useState([])

  const entityRef = firestore.collection('userResponses')
  const userID = auth.currentUser?.uid

  useEffect(() => {
    entityRef
        .where("userID", "==", userID)
        .orderBy('timestamp', 'desc')
        .onSnapshot(
            querySnapshot => {
                const newEntities = []
                querySnapshot.forEach(doc => {
                    const entity = doc.data()
                    entity.id = doc.id
                    newEntities.push(entity)
                });
                setEntities(newEntities)
            },
            error => {
                console.log(error)
            }
        )
}, [])

  const renderEntity = ({ item }) => {
    return (
      <TouchableOpacity style={styles.cardContainer}>
        <Text>Date: {item.timestamp ? item.timestamp.toDate().toLocaleDateString() : 'N/A'}</Text>
        <Text>Time: {item.timestamp ? item.timestamp.toDate().toLocaleTimeString() : 'N/A'}</Text>
        <Text>Response: {item.responseZero}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
            onPress={() => navigation.navigate('Questions')}
            style={styles.button}
        >
            <Text style={styles.buttonText}>Create Entry</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
      <FlatList
        data={entities}
        renderItem={renderEntity}
        keyExtractor={(item) => item.id}
        style={styles.flatList}
      />
      </View> 
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        height: 80,
        marginTop: 40,
        marginBottom: 5,
        flex: 1,
        paddingTop: 40,
        paddingBottom: 10,
        paddingLeft: 30,
        paddingRight: 30,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        marginTop: 20,
        padding: 20,
    },
    button: {
      backgroundColor: '#3498db',
      padding: 10,
      borderRadius: 5,
      marginBottom: 20,
      marginTop: 20,

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
      width: 380, // Ensure the width occupies the entire space
    },
    flatList: {
      width: '100%',
    },
  });

export default HomeScreen;
