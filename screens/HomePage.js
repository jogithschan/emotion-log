import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import { SIZES, icons } from '../constants';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const HomeScreen = () => {
    const navigation = useNavigation();

    const [expoPushToken, setExpoPushToken] = useState('');

    useEffect(() => {
        console.log("Registering for push notifications...");

        registerForPushNotificationsAsync().then(
            (token) => {
                console.log(token);
                setExpoPushToken(token);
            }
          ).catch((err) => console.log(err));
    }, []);

    async function registerForPushNotificationsAsync() {
        let token;
      
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      
        if (Device.isDevice) {
          const { status: existingStatus } =
            await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;
          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }
          if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
          }
          // Learn more about projectId:
          // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
          // EAS projectId is used here.
          try {
            const projectId =
              Constants?.expoConfig?.extra?.eas?.projectId ??
              Constants?.easConfig?.projectId;
            if (!projectId) {
              throw new Error('Project ID not found');
            }
            token = (
              await Notifications.getExpoPushTokenAsync({
                projectId,
              })
            ).data;
            console.log(token);
          } catch (e) {
            token = `${e}`;
          }
        } else {
          alert('Must use physical device for Push Notifications');
        }
      
        return token;
      }

    const sendNotification = async () => {
        console.log("sending notification");
        const message = {
            to:expoPushToken,
            title:"This is a Push Notification",
            body:"Who knows where it's from"
        };

        await fetch("https://exp.host/--/api/v2/push/send", {
            method: "POST",
            headers: {
                host: "exp.host",
                accept: "application/json",
                "accept-encoding": "gzip, deflate",
                "content-type": "application/json",
            },
            body: JSON.stringify(message),
        });
    }
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
                    <TouchableOpacity style={styles.homeWidget}
                        onPress={sendNotification}>
                        <Text style={styles.buttonText}>Widget 1</Text>
                    </TouchableOpacity>
                    {/* Widget 2 */}
                    <TouchableOpacity style={styles.homeWidget}>
                        <Text style={styles.buttonText}>Widget 2</Text>
                    </TouchableOpacity>
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
                <Text style={styles.sectionHeading}>Reflection Journal</Text>
                <View style={styles.section}>
                <View style={styles.buttonTextSection}>
                        <Text style={styles.buttonText}>Daily Reflection</Text>
                        <Text style={styles.buttonSubText}>Unlocks at 9pm</Text>
                    </View>
                    <TouchableOpacity style={[styles.sectionButton, styles.disabledSectionButton]} disabled={true}>
                        <Image source={icons.lock} style={styles.buttonIcon} />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Tab Bar */}
            <View style={styles.tabBar}>
                {/* Section 1 Icon */}
                <TouchableOpacity style={styles.tabItem}>
                    {/* Use icons.NAME for Section 1 Icon */}
                    <Image source={icons.calendar} style={styles.tabIcon} />
                </TouchableOpacity>
                
                {/* Section 2 Icon */}
                <TouchableOpacity style={styles.tabItem}>
                    {/* Use icons.NAME for Section 2 Icon */}
                    <Image source={icons.calendar} style={styles.tabIcon} />
                </TouchableOpacity>
                
                {/* Floating Action Button */}
                <TouchableOpacity style={[styles.tabItem, styles.floatingButton]}>
                    {/* Use icons.NAME for Floating Action Button Icon */}
                    <TouchableOpacity style={styles.annotationButton}
                        onPress={() => navigation.navigate('Annotation', {})}>

                    </TouchableOpacity>
                </TouchableOpacity>
                
                {/* Section 3 Icon */}
                <TouchableOpacity style={styles.tabItem}>
                    {/* Use icons.NAME for Section 3 Icon */}
                    <Image source={icons.calendar} style={styles.tabIcon} />
                </TouchableOpacity>
                
                {/* Section 4 Icon */}
                <TouchableOpacity style={styles.tabItem}>
                    {/* Use icons.NAME for Section 4 Icon */}
                    <Image source={icons.calendar} style={styles.tabIcon} />
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
        paddingTop: 5,
        paddingBottom: 20
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
        padding: 15,
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
        marginTop: 10,
        marginBottom:10,
    },
    section: {
        flex:0,
        flexDirection:'row',
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#252527', // Darker Background
        borderRadius: 10,
        marginBottom: 10,
    },
    buttonTextSection: {
        flex:0,
        flexDirection:'column',
        margin:10,
    },
    buttonText: {
        fontSize: 18,
        color: '#ffffff', // White Text
        marginBottom: 5,
    },
    buttonSubText: {
        fontSize: 14,
        color: '#ffffff', // White Text
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    tabIcon: {
        width:20,
        height:20,
    },
    annotationButton: {
        width:70,
        height:70,
        borderRadius:35,
        marginBottom: 10,
        backgroundColor: "#987BEE",
    },
    homeWidget: {
        width: 174,
        height: 150,
        borderRadius: 10,
        alignItems:'center',
        justifyContent: 'center',
        backgroundColor: "#252527",

    },
    sectionButton: {
        width:53,
        height: 53,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor: "#957BEE",
        borderRadius:10,
        margin:5,
    },
    disabledSectionButton: {
        opacity:0.5,
    }
});

export default HomeScreen;
