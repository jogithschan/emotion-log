import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'

const ProfileScreen = () => {

  return (
    <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
            {/* Current System Date and Calendar Icon */}
            {/* <View style={styles.dateContainer}>
                <Image source={icons.calendar} style={styles.calendarIcon} />
                <Text style={styles.dateText}>{getFormattedDate()}</Text>
            </View> */}
            {/* User Profile Picture, Greeting, and Notification Center Button */}
            <View style={styles.profileContainer}>
                <Image source={require('./profile_picture.png')} style={styles.profilePicture} />
                <View>
                    <Text style={styles.greeting}>Hello, {fName}!</Text>
                    <Text style={styles.greeting}>How are you doing?😄</Text>
                </View>
                <TouchableOpacity style={styles.notificationButton}>
                    <Image source={icons.notificationBell} style={styles.notificationBell} />
                </TouchableOpacity>
            </View>
        </View>

        {/* Main Screen Section */}
        <View style={styles.mainSection}>
            {/* Widgets Displaying Information */}
            {/* <View style={styles.widgetContainer}> */}
                {/* Widget 1 */}
                {/* <TouchableOpacity style={styles.homeWidget} */}
                    {/* onPress={sendNotification}> */}
                    {/* <Text style={styles.buttonText}>Widget 1</Text> */}
                {/* </TouchableOpacity> */}
                {/* Widget 2 */}
                {/* <TouchableOpacity style={styles.homeWidget}> */}
                    {/* <Text style={styles.buttonText}>Widget 2</Text> */}
                {/* </TouchableOpacity> */}
            {/* </View> */}
            <View>
                <Text style={styles.bodyText}>Hello, {fName}! Happy to see you again thank you for being a part of this study and helping us annotating emotions!😊✨</Text>
            </View>
            {/* Emosnap Section */}
            <Text style={styles.sectionHeading}>Upcoming EmoSnap</Text>
            <View style={styles.section}>
                <View style={styles.buttonTextSection}>
                    <Text style={styles.buttonText}>Emosnap 2</Text>
                    <Text style={styles.buttonSubText}>12 noon</Text>
                </View>
                <TouchableOpacity style={styles.sectionButton}>
                    <Image source={icons.arrow} style={styles.buttonIcon} />
                </TouchableOpacity>
            </View>
            {/* Reflection Journal Section */}
            {/* <Text style={styles.sectionHeading}>Reflection Journal</Text>
            <View style={styles.section}>
            <View style={styles.buttonTextSection}>
                    <Text style={styles.buttonText}>Daily Reflection</Text>
                    <Text style={styles.buttonSubText}>Unlocks at 9pm</Text>
                </View>
                <TouchableOpacity style={[styles.sectionButton, styles.disabledSectionButton]} disabled={true}>
                    <Image source={icons.lock} style={styles.buttonIcon} />
                </TouchableOpacity>
            </View> */}
        </View>

        {/* Tab Bar */}
        <View style={styles.tabBar}>
            {/* Section 1 Icon */}
            <TouchableOpacity style={styles.tabItem}>
                {/* Use icons.NAME for Section 1 Icon */}
                <Image source={icons.home} style={styles.tabIcon} />
                <TouchableOpacity
                    onPress={() => navigation.navigate('HomePage')}>
                </TouchableOpacity>
            </TouchableOpacity>
            
            {/* Section 2 Icon */}
            {/* <TouchableOpacity style={styles.tabItem}> */}
                {/* Use icons.NAME for Section 2 Icon */}
                {/* <Image source={icons.calendar} style={styles.tabIcon} />
            </TouchableOpacity>*/}
            
            {/* Floating Action Button */}
            <TouchableOpacity style={[styles.tabItem, styles.floatingButton]}>
                {/* Use icons.NAME for Floating Action Button Icon */}
                <TouchableOpacity style={styles.annotationButton}
                    onPress={() => navigation.navigate('Annotation')}>
                </TouchableOpacity>
            </TouchableOpacity>
            
            {/* Section 3 Icon */}
            <TouchableOpacity style={styles.tabItem}>
                {/* Use icons.NAME for Section 3 Icon */}
                <Image source={icons.profile} style={styles.tabIcon} />
                <TouchableOpacity
                    onPress={() => navigation.navigate('HomePage')}>
                </TouchableOpacity>
            </TouchableOpacity>
            
            {/* Section 4 Icon */}
            {/* <TouchableOpacity style={styles.tabItem}> */}
                {/* Use icons.NAME for Section 4 Icon */}
                {/* <Image source={icons.calendar} style={styles.tabIcon} /> */}
            {/* </TouchableOpacity> */}
        </View>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000', // Dark Background
    },
  inputContainer: {
    width: '80%'
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonOutline: {
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#0782F9',
    borderWidth: 2,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  buttonOutlineText: {
    color: '#0782F9',
    fontWeight: '700',
    fontSize: 16,
  },
})
