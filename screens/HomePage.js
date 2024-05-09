import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { SIZES, icons } from '../constants';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            {/* Header Section */}
            <View style={styles.header}>
                {/* Current System Date and Calendar Icon */}
                <View style={styles.dateContainer}>
                    <Image source={icons.calendar} style={styles.calendarIcon} />
                    <Text style={styles.dateText}>May 8, 2024</Text>
                </View>
                {/* User Profile Picture, Greeting, and Notification Center Button */}
                <View style={styles.profileContainer}>
                    <Image source={require('./profile_picture.png')} style={styles.profilePicture} />
                    <View>
                        <Text style={styles.greeting}>Hello, User!</Text>
                        <Text style={styles.greeting}>How are you doing?😄</Text>
                    </View>
                    <TouchableOpacity style={styles.notificationButton}>
                        <Image source={icons.notificationBell} style={styles.notificationBell} />
                    </TouchableOpacity>
                </View>
                {/* Search Bar with Icons */}
                <View style={styles.searchBarContainer}>
                    <Image source={icons.search2} style={styles.notificationBells} />
                    <TextInput style={styles.searchBar} placeholder="'Search for EmoSnap'" placeholderTextColor='white'/>
                    {/* Search Icon */}
                </View>
            </View>

            {/* Main Screen Section */}
            <View style={styles.mainSection}>
                {/* Widgets Displaying Information */}
                <View style={styles.widgetContainer}>
                    {/* Widget 1 */}
                    {/* Widget 2 */}
                </View>
                {/* Emosnap Section */}
                <Text style={styles.sectionHeading}>Upcoming EmoSnap</Text>
                <TouchableOpacity style={styles.sectionButton}>
                    <Text style={styles.buttonText}>Emosnap</Text>
                </TouchableOpacity>
                {/* Reflection Journal Section */}
                <Text style={styles.sectionHeading}>Refelction Journal</Text>
                <TouchableOpacity style={styles.sectionButton}>
                    <Text style={styles.buttonText}>Reflection Journal</Text>
                </TouchableOpacity>
            </View>

            {/* Tab Bar */}
            <View style={styles.tabBar}>
                {/* Section 1 Icon */}
                <TouchableOpacity style={styles.tabItem}>
                    {/* Use icons.NAME for Section 1 Icon */}
                    <Image source={icons.calendar} style={styles.calendarIcon} />
                </TouchableOpacity>
                
                {/* Section 2 Icon */}
                <TouchableOpacity style={styles.tabItem}>
                    {/* Use icons.NAME for Section 2 Icon */}
                    <Image source={icons.calendar} style={styles.calendarIcon} />
                </TouchableOpacity>
                
                {/* Floating Action Button */}
                <TouchableOpacity style={[styles.tabItem, styles.actionButton]}>
                    {/* Use icons.NAME for Floating Action Button Icon */}
                    <Image source={icons.calendar} style={styles.calendarIcon} />
                </TouchableOpacity>
                
                {/* Section 3 Icon */}
                <TouchableOpacity style={styles.tabItem}>
                    {/* Use icons.NAME for Section 3 Icon */}
                    <Image source={icons.calendar} style={styles.calendarIcon} />
                </TouchableOpacity>
                
                {/* Section 4 Icon */}
                <TouchableOpacity style={styles.tabItem}>
                    {/* Use icons.NAME for Section 4 Icon */}
                    <Image source={icons.calendar} style={styles.calendarIcon} />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000', // Dark Background
    },
    header: {
        flexDirection: 'column',
        justifyContent: 'bottom',
        alignItems: 'left',
        paddingHorizontal: 20,
        paddingTop: 50,
        paddingBottom: 20,
        borderRadius: 20,
        width:"100%",
        backgroundColor:"#2A272A",
    },
    dateContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: 30
    },
    dateText: {
        fontSize: 16,
        marginLeft: 5,
        marginRight: 10,
        color: '#ffffff', // White Text
    },
    calendarIcon: {
        width: 15,
        height: 15,
    },
    profileContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems:'center',
        width:'100%'
    },
    profilePicture: {
        width: 66,
        height: 66,
        borderRadius: 20,
        marginRight: 10,
    },
    greeting: {
        fontSize: SIZES.xLarge,
        marginRight: 10,
        color: '#ffffff', // White Text
    },
    notificationButton: {
        width: 30,
        height: 30,
        borderRadius: 15,
        backgroundColor: '#98989F',
        justifyContent: 'center',
        alignItems: 'center',
    },
    searchBarContainer: {
        flex: 0,
        flexDirection: 'row',
        alignItems: 'center',
        padding:12,
        borderRadius: 10,
        backgroundColor: '#000000', // Darker Background
        marginTop: 20,
    },
    searchBar: {
        flex:1,
        marginLeft: 10,
        width:'80%',
        color: '#ffffff',
    },
    mainSection: {
        flex: 1,
        padding: 20,
    },
    widgetContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    sectionHeading: {
        fontSize: SIZES.xLarge,
        marginRight: 10,
        color: '#ffffff',
        marginTop: 20,
        marginBottom: 20,

    },
    sectionButton: {
        width: '100%',
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#444444', // Darker Background
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff', // White Text
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 20,
    },
});

export default HomeScreen;
