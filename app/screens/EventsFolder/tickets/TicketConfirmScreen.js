import React, { useEffect, useState } from 'react';
import { Alert, View, StyleSheet, TextInput } from 'react-native';
import { Header, CustomButton } from '../../../components';
import { useRoute } from '@react-navigation/core';
import { Event, Tickets } from '../../../models';
import  { Auth, DataStore } from 'aws-amplify';

const TicketConfirmScreen = ({navigation}) => {
    const route = useRoute();
    const eventDetails = route.params.eventDetails;
    const quantity = route.params.quantity;

    const [fName, setFName] = useState();
    const [lName, setLName] = useState();
    const [email, setEmail] = useState();
    const [seller, setSeller] = useState('');
    const [event, setEvent] = useState();
    const [dataQuery, setDataQuery] = useState(false);
    const [dataQuery2, setDataQuery2] = useState(false);
    const today = String(new Date()).substring(4,15)

    

    useEffect(() => {
        const getAuthSub = async () => {
            const dbAuth = await Auth.currentAuthenticatedUser();
            const dbEvent = await DataStore.query(Event, x => x.id('eq', eventDetails.id));
            
            setEvent(dbEvent[0]);
            setSeller(dbAuth.attributes.sub);
            setDataQuery(true);
        }
        getAuthSub();

    }, [])

    const save = async () => {
        const newTicketPurchase = new Tickets({
            firstName: fName,
            lastName: lName,
            email: email,
            seller: seller,
            hostID: eventDetails.sub,
            event: eventDetails.title,
            quantity: quantity,
            paid: true,
            emailSent: false,
            eventID: eventDetails.id,
        });

        //if team data passed run this code
        if (eventDetails.team) {
            console.log('PASS A1-1');
            const team = JSON.parse(eventDetails.team);
            team.forEach( async (data, i) => {
                let member = data['members'];
                if (member.sub === seller) {
                    console.log('PASS A2');
                    let prevSold = member.sold;
                    let prevToday = member.today;
                    let prevTodaySold = member.todaySold;
                    member.sold = parseInt(prevSold) + parseInt(quantity);
                    if (prevToday === today) {
                        console.log('PASS A3-1');
                        member.todaySold = parseInt(prevTodaySold) + parseInt(quantity);
                    } else {
                        console.log('PASS A3-2');
                        member.today = today;
                        member.todaySold = parseInt(quantity);
                    }
                    let teamFinal = JSON.stringify(team);
                    let soldFinal = parseInt(eventDetails.ticketsSold) + parseInt(quantity);
                    const updateEvent = Event.copyOf(eventDetails, updated => {
                        updated.ticketsSold = soldFinal;
                        updated.team = teamFinal;
                    });

                    setDataQuery2(true);
                    if (dataQuery2) {
                        console.log('WE MADE IT!');
                        await DataStore.save(newTicketPurchase);
                        await DataStore.save(updateEvent);
                        navigation.navigate('TicketConfirmationScreen');
                    }

                }
            });
        } else {
            console.log('PASS 1-2');
            //update events total number of tickets sold
            const updateEvent = Event.copyOf(eventDetails, updated => {
                updated.ticketsSold = parseInt(eventDetails.ticketsSold) + parseInt(quantity);
            });
            await DataStore.save(updateEvent);
            await DataStore.save(newTicketPurchase);
        
            navigation.navigate('TicketConfirmationScreen');
        }
    }
    

    return (
        <View style={styles.background}>
            <Header text='Confirm Tickets' />
            <View style={styles.bodyContianer}>
                <View style={styles.extraInfo}>
                    <TextInput 
                        style={styles.input}
                        placeholder='First Name'
                        placeholderTextColor='white'
                        textAlign= 'center'
                        value={fName}
                        onChangeText={setFName}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Last Name'
                        placeholderTextColor='white'
                        textAlign= 'center'
                        value={lName}
                        onChangeText={setLName}
                    />
                    <TextInput 
                        style={styles.input}
                        placeholder='Email'
                        placeholderTextColor='white'
                        textAlign= 'center'
                        value={email}
                        onChangeText={setEmail}
                    />
                    <CustomButton 
                        text='Send Tickets'
                        type="Primary"
                        onPress={save}
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
    extraInfo: {
        alignItems: 'center',
        width: '100%',
        marginTop: 15,
    },
    extraInfoInput: {
        width: '65%',
        backgroundColor: 'gray',
        borderRadius: 12,
        height: 40,
        fontSize: 20,
        marginTop: 5,
    },
    input: {
        height: 40,
        width: 300,
        backgroundColor: 'gray',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginVertical: 5,
    },
})

export default TicketConfirmScreen;