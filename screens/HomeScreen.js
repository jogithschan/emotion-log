import { useNavigation } from '@react-navigation/core'
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput, FlatList, Keyboard } from 'react-native'
import { auth, firestore, firebase } from '../firebase/firebase'
import QuestionsScreen from './QuestionsScreen'

export default function HomeScreen(props) {
  const navigation = useNavigation()

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  const [entities, setEntities] = useState([])

  const entityRef = firestore.collection('entities')
  const user = auth.currentUser
  const userID = user.uid

  useEffect(() => {
    entityRef
      .where("authorID", "==", userID)
      .orderBy('createdAt', 'desc')
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

  const renderEntity = ({ item, index }) => {
    return (
      <View style={styles.entityContainer}>
        <Text style={styles.entityText}>
          {item.text}
        </Text>
      </View>
    )
  }

  const navigateToQuestions = () => {
    navigation.navigate('Questions')
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={navigateToQuestions}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Start Questions</Text>
      </TouchableOpacity>

      {entities && (
        <View style={styles.listContainer}>
          <FlatList
            data={entities}
            renderItem={renderEntity}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={true}
          />
        </View>
      )}
      <Text>Email: {auth.currentUser?.email}</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Sign out</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  button: {
    height: 47,
    borderRadius: 5,
    backgroundColor: '#788eec',
    width: 200,
    alignItems: "center",
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16
  },
  listContainer: {
    marginTop: 20,
    padding: 20,
  },
  entityContainer: {
    marginTop: 16,
    borderBottomColor: '#cccccc',
    borderBottomWidth: 1,
    paddingBottom: 16
  },
  entityText: {
    fontSize: 20,
    color: '#333333'
  }
})
