import React, {useEffect, useState} from 'react';
import { View, ScrollView, StyleSheet, Text, Image, Alert } from 'react-native';
import { Auth, DataStore, Storage } from 'aws-amplify';
import { Header, CustomButton } from '../../../components';
import { Event, User } from '../../../models';
import { useRoute } from '@react-navigation/core';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';


function AddEventConfirmation({navigation}) {
    const [user, setUser] = useState();
    const [pro, setPro] = useState();

    const route = useRoute();
    const eventDetails = route.params.prevEventDetails;
    const file = route.params.file;
    

    useEffect(() => {
        const getCurrentUser = async () => {
            const authUser = await Auth.currentAuthenticatedUser(); 
            const dbUsers = await DataStore.query(User, x => x.sub('eq', authUser.attributes.sub));
            const dbEvents = await DataStore.query(Event);
            if (dbUsers.length === 0) {
                return;
            } 
            const dbUser = dbUsers[0];
            setUser(dbUser);
            setPro(dbUsers[0].PRO);
        }
        getCurrentUser();
        
    }, [])

    const uploadToStorage = async (imagePath) => {
        try {
            const response = await fetch(imagePath);
            
            const blob = await response.blob();

            const filename = uuidv4() + '.png';
            const s3Response = await Storage.put(filename, blob);

            return s3Response.key;
        } catch(e) {
            console.error(e);
        }
        
    }

    const save = async () => {
        console.log('start');

        const s3ResponseKey = await uploadToStorage(file.uri);
        console.log(s3ResponseKey);
        
        const authUser = await Auth.currentAuthenticatedUser();

        if (!s3ResponseKey) {
            console.warn('Cover photo not yet uploaded');
            return;
        }

        const response = await Storage.get(s3ResponseKey);
        const coverUri = response.toString();
        

        try {
            const newEvent = new Event({
                sub: authUser.attributes.sub,
                title: eventDetails.title,
                date: eventDetails.date,
                startTime: eventDetails.startTime,
                endTime: eventDetails.endTime,
                ticketPrice: parseInt(eventDetails.ticketPrice),
                venueNAME: eventDetails.venue.name,
                image: coverUri,
                ticketsSold: 0,
                active: true,
            });
        
            await DataStore.save(newEvent);
            navigation.navigate('EventsScreen', {changeForm: true});
        } catch(e) {
            console.error(e);
        }
        
    }

    const addTeam = async () => {
        console.log(eventDetails);
        Alert.alert('Event has been Saved! Lets add a Team');
        navigation.navigate('AddTeam', {prevEventDetails: eventDetails});
    }

    const goPro = () => navigation.navigate('OnTapProScreen');

    return (
        <View style={styles.background}>
            <Header text='Confirmation' />
            <ScrollView>
                <View style={styles.bodyContianer}>
                    <View style={styles.showContainer}>
                        <View style={styles.sinlgeShowContainer}>
                            <Image 
                                style={styles.showCoverPic}
                                source={{ uri: eventDetails.image.uri }}
                            />
                            <View style={styles.showTitleContainer}>
                                <Text style={styles.showText}>
                                    Title: {eventDetails.title}
                                </Text>
                                <Text style={styles.showText}>
                                    Date: {String(eventDetails.date).substring(0,15)}
                                </Text>
                                <Text style={styles.showText}>
                                    Venue Name: {eventDetails.venue.name}
                                </Text>
                                <Text style={styles.showText}>
                                    Address: {'\n'}
                                    {eventDetails.venue.address}
                                </Text>
                                <Text style={styles.showText}>
                                    Capacity: {eventDetails.venue.capacity}
                                </Text>
                                <Text style={styles.showText}>
                                    Start Time: {String(eventDetails.startTime)}
                                    End Time: {String(eventDetails.endTime)}
                                </Text>
                                <Text style={styles.showText}>
                                    Ticket Price: {eventDetails.ticketPrice}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.infoInputContainer}>
                        <CustomButton 
                            text="Save Event" 
                            onPress={save}
                            type="Primary"
                        />
                         <CustomButton 
                            text={pro ? "Add Team" : 'Add Team(PRO)'}
                            onPress={pro ? addTeam : goPro}
                            type="Primary"
                        /> 
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'black',
    },
    bodyContianer: {
        alignItems: 'center',
    },
    showContainer: {
        width: '100%',
        alignItems: 'center',
        flex: 1,
    },
    showCoverPic: {
        width: 300,
        height: 200,
        borderRadius: 50,
    },
    sinlgeShowContainer: {
        alignItems: 'center',
    },
    showText: {
        color: 'white',
        fontSize: 25
    },
    infoInputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    showTitleContainer: {
        alignItems: 'center',
        flex: 1,
    },
})

export default AddEventConfirmation;