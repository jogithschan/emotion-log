import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import { firebase, auth, firestore } from '../firebase/firebase'
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONT, SHADOWS, SIZES, images } from "../constants"

const screenWidth = Dimensions.get('window').width;

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
  let imageUri = '';

  if (item.responseZero >= -3 && item.responseZero < -1) {
    imageUri = images.e1;
  } else if (item.responseZero >= -1 && item.responseZero < 0) {
    imageUri = images.e2;
  } else if (item.responseZero === 0) {
    imageUri = images.e3;
  } else if (item.responseZero > 0 && item.responseZero <= 1) {
    imageUri = images.e4;
  } else if (item.responseZero > 1 && item.responseZero <= 3) {
    imageUri = images.e5;
  }

  return (
    <TouchableOpacity style={styles.cardContainer}>
      <View style={styles.iconContainer}>
        {/* Example: Replace 'imageUri' with the correct logic */}
        <Image
          source={imageUri} // Make sure 'imageUri' has the correct image file name
          resizeMode="contain"
          style={styles.iconImage}
        />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.textFormat}>
          Date: {item.timestamp ? item.timestamp.toDate().toLocaleDateString() : 'N/A'}
        </Text>
        <Text style={styles.textFormat}>
          Time: {item.timestamp ? item.timestamp.toDate().toLocaleTimeString() : 'N/A'}
        </Text>
        {/* Other text components can be added here */}
      </View>
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
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 100 }}
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
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
      borderRadius: 80,
      marginBottom: 10,
      width: screenWidth - 20,
      backgroundColor:"#FFF",
      shadowColor: "#FFF",
    },
    iconContainer: {
      width: 50,
      height: 50,
      marginRight: 10,
    },
    iconImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'contain',
      borderRadius: 70,
    },
    textContainer: {
      flex: 1,
    },
    textFormat: {
      fontSize: 16,
      // Add other text styles as needed
    },
    flatList: {
      width: screenWidth - 20,
    },
  });

export default HomeScreen;
