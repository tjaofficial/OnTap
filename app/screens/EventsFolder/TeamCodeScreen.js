import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TextInput, Alert } from 'react-native';
import { CustomButton, Header } from '../../components';
import { Auth, DataStore } from 'aws-amplify';
import { Event, TeamEvents } from '../../models';

const TeamCodeScreen = ({navigation}) => {
    const [code, setCode] = useState('');
    const [email, setEmail] = useState('');
    const [seller, setSeller] = useState('');
    const [events, setEvents] = useState('');
    const [dataQuery, setDataQuery] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const dbAuth = await Auth.currentAuthenticatedUser();
            const dbEvent = await DataStore.query(Event);
            
            setEvents(dbEvent);
            setSeller(dbAuth.attributes.sub);
            setDataQuery(true);
        }
        getData();
    }, [])

    const save = async () => {
        events.forEach(event => {
            //Check if the Event Code and the Code entered are the same
            if (event.code === code) {
                let team = JSON.parse(event.team);
                team.forEach(async (members) => {
                    let member = members['members'];
                    //check if Member spots have not been claimed & check if emails are the same
                    if (member.sub === null && member.email.toLowerCase() === email.toLowerCase()) {
                        member.sub = String(seller);
                        member.active = true;
                        const updatedEvent = Event.copyOf(event, updated => {
                            updated.team = JSON.stringify(team);
                        });
                        const TeamLog = new TeamEvents({
                            sub: seller,
                            eventID: event.id,
                        });
                        await DataStore.save(updatedEvent);
                        await DataStore.save(TeamLog);
                        Alert.alert('FOUND IT');
                        navigation.navigate('EventsScreen', {changeForm: true});
                    } else {
                        Alert.alert('EMAIL NOT VALID');
                    }
                })
            } else {
               Alert.alert('CODE NOT VALID');
            }
        })   
    }
    const back = () => navigation.navigate('EventsScreen', {changeForm: true});

    return (
        <View style={styles.background}>
            <Header text='Team Event' />
            <View style={styles.bodyContianer}>
                <View style={styles.infoInputContainer}>
                    <TextInput 
                        style={styles.input} 
                        placeholder='Enter Team Code...' 
                        value={code} 
                        onChangeText={setCode}
                        placeholderTextColor='#CACACA'
                        rules={{
                            required: 'Code required',
                            maxLength: {value: 8, message: 'Code Not Valid'},
                            minLength: {value: 8, message: 'Code Not Valid'},
                        }} 
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder='Email' 
                        value={email} 
                        onChangeText={setEmail}
                        placeholderTextColor='#CACACA'
                        rules={{
                            required: 'Teammate Email is required',
                            maxLength: {value: 30, message: 'Too many characters'},
                            minLength: {value: 7, message: 'Not enough characters'},
                        }}
                    />
                    <CustomButton 
                        text="Add Team Event" 
                        onPress={save}
                        type="Primary"
                    />
                    <CustomButton 
                        text="Back" 
                        onPress={back}
                        type="Secondary"
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'black',
    },
    bodyContianer: {
        flex: 1,
        justifyContent: 'center',
    },
    infoInputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 180,
        backgroundColor: 'gray',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginVertical: 5,
        textAlign: 'center'
    },
})

export default TeamCodeScreen;