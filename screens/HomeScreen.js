import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image, Dimensions } from 'react-native';
import { firebase, auth, firestore } from '../firebase/firebase'
import { useNavigation } from '@react-navigation/native';
import { COLORS, FONT, SHADOWS, SIZES, images, icons } from "../constants"
import ActionButton from 'react-native-action-button';
import { SafeAreaView } from 'react-native-safe-area-context';

const screenWidth = Dimensions.get('window').width;

const HomeScreen = () => {
  const navigation = useNavigation();
  
  const [entityText, setEntityText] = useState('')
  const [entities, setEntities] = useState([])
  const [userFullName, setUserFullName] = useState([])

  const entityRef = firestore.collection('userResponses')
  const userRef = firestore.collection('users')

  const userID = auth.currentUser?.uid

  useEffect(() => {
    userRef
          .where("id", "==", userID)
          .onSnapshot(
            querySnapshot =>{
              querySnapshot.forEach(doc => {
                const data = doc.data()
                setUserFullName(data.fullName)
              });
            },
            error => {
              console.log(error)
            }
          )
  }, [])

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

  function formatDate(date) {
    const options = { day: 'numeric', month: 'short' };
    const formattedDate = date.toLocaleDateString(undefined, options);
  
    const day = date.getDate();
    const suffix = day === 1 ? 'st' : day === 2 ? 'nd' : day === 3 ? 'rd' : 'th';
  
    return `${formattedDate}${suffix}`;
  }
  
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
        <Text style={styles.timeFormat}>
            {item.timestamp
                   ? item.timestamp.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
                   : 'Your response has been recorded!'}
          </Text>
          <Text style={styles.textFormat}>
            {item.timestamp ? formatDate(item.timestamp.toDate()) : ''}
          </Text>
          {/* Other text components can be added here */}
        </View>
      </TouchableOpacity>
    );
  };
  
  
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.btnContainer}>
            <Image 
              source={icons.menu}
              resizeMode="cover"
              style={styles.btnImg('100%')}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnContainer}>
            <Image 
              source={{ uri : 'https://placehold.co/500/orange/white/jpg'}}
              resizeMode="cover"
              style={styles.btnImg('100%')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.welcomeContainer}>
          <Text style={styles.userName}>Hello, {userFullName}!</Text>
          <Text style={styles.userName}>How do you feel today?</Text>
        </View>
        {/* <View>
          <TouchableOpacity
              onPress={() => navigation.navigate('Questions')}
              style={styles.button}
          >
              <Text style={styles.buttonText}>Create Entry</Text>
          </TouchableOpacity>
        </View> */}
        <View style={styles.listContainer}>
        <FlatList
          data={entities}
          renderItem={renderEntity}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 160 }}
          style={styles.flatList}
        />
        </View>
        <ActionButton
          buttonColor="rgba(102,204,153,1)"
          onPress={() => navigation.navigate('Questions')}
        /> 
      </SafeAreaView>
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
        marginTop: SIZES.xsmall,
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
        flex: 0,
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
        fontSize: SIZES.medium,
        color: '#9f9f9f'
      },
      timeFormat: {
        fontSize: SIZES.large
      },
      flatList: {
        width: screenWidth - 20,
      },
      userName: {
        fontSize: SIZES.xLarge,
        color: COLORS.secondary,
      },
      welcomeContainer: {
        padding: 10,
        alignItems: 'left',
        justifyContent: 'left',
        width: screenWidth -20,
        paddingBottom: 20
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '95%',
        marginBottom: 10,
      },
      btnContainer: {
        width: 40,
        height: 40,
        backgroundColor: COLORS.white,
        borderRadius: SIZES.small / 1.25,
        justifyContent: "center",
        alignItems: "center",
      },
      btnImg: (dimension) => ({
        width: dimension,
        height: dimension,
        borderRadius: SIZES.small / 1.25,
      }),
    });
  
  export default HomeScreen;