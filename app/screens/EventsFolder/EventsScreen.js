import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, ImageBackground, ActivityIndicator, RefreshControl } from 'react-native';
import { Auth, DataStore, Storage } from 'aws-amplify';
import { Event, TeamEvents, User } from '../../models';
import { useRoute } from '@react-navigation/core';
import { CustomButton, Header } from '../../components';



const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const EventsScreen = ({navigation}) => {
    const route = useRoute();
    const changeForm = false;
    const [formFileds, setFormFields] =useState(changeForm);
    const goAddShow = () => navigation.navigate('AddEventName');
    const goAnalytics = () => navigation.navigate('AnalyticsListScreen');
    const goPro = () => navigation.navigate('OnTapProScreen');
    const [events, setEvents] = useState(false);
    const [myEvents, setMyEvents] = useState([]);
    const [myTeamEvents, setMyTeamEvents] = useState([]);
    const [activeTeam, setActiveTeam] = useState(false);
    const [dataQuery, setDataQuery] = useState(false);
    const [pro, setPro] = useState();
    const [refreshing, setRefreshing] = React.useState(false);
    const [coverUri, setCoverUri] = useState('');


    useEffect (() => {
        if(route.params) {
            console.log('update: Event added to Ticket Screen');
            setEvents(false);
            setActiveTeam(false);
        }

        const getUserEvents = async () => {
            const authUser = await Auth.currentAuthenticatedUser(); 
            const dbEvents = await DataStore.query(Event);
            const dbUsers = await DataStore.query(User, x => x.sub('eq', authUser.attributes.sub));
            const dbTeamEvents = await DataStore.query(TeamEvents, c => c.sub('eq', authUser.attributes.sub));

            const myEvents = []
            dbEvents.forEach( event => {
                //Pull the Users events from the database & Check if Events are active
                if (event.sub === authUser.attributes.sub && event.active) {
                    //console.log('PASS 1')
                    myEvents.push(event);
                    setEvents(true);
                }
            });
            setMyEvents(myEvents);

            //if database is not empty
            if (dbTeamEvents != 0) {
                setActiveTeam(true);
                const myTeamEventsPrev = [];
                dbEvents.forEach( event => {
                    dbTeamEvents.forEach( teamEvent => {
                        //Pull the Users Team Events from the database and if they are active
                        if (event.id === teamEvent.eventID && event.active) {
                            myTeamEventsPrev.push(event);
                        }
                    });
                });
                setMyTeamEvents(myTeamEventsPrev);
            };
            setPro(dbUsers[0].PRO);
            setDataQuery(true);
        };
        getUserEvents();

    }, [route.params]);
    
    //Refresh pull down
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);

    return (
        <View style={styles.background}>
            <Header text='Events' adjustment={160}/>
            
            <View style={styles.Container}>
                <TouchableOpacity style={styles.buttonContainer1} onPress={goAddShow}>
                    <Text style={styles.buttonText}>
                        + Add Show
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainer2} onPress={pro ? goAnalytics : goPro}>
                    <Text style={styles.buttonText}>
                        {pro ? 'Analytics' : 'Analytics(PRO)'}
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{width: '100%'}}>
                    <CustomButton
                        text="Have a Team Code?"
                        type='Secondary'
                        onPress={() => navigation.navigate('TeamCodeScreen')}
                    />
            </View>
            
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor='white'
                    />
                }
            >
                <View style={styles.bodyContianer}>
                    <View style={styles.showContainer}>
                        {events ? <></> :
                            activeTeam ? <></> : <Text style={{color: 'white', fontSize: 30, marginVertical: 150, fontWeight: '700', opacity: .4}}>No Events Scheduled</Text>}
                        {dataQuery ? 
                            myEvents.map (item => {
                                return <TouchableOpacity 
                                            key={item.id} 
                                            style={styles.sinlgeShowContainer} 
                                            onPress={() => navigation.navigate('BuyTicketsScreen', {eventDetails: item})}
                                        >
                                            <ImageBackground 
                                                style={styles.showCoverPic}
                                                imageStyle={{borderRadius: 50}}
                                                source={{ uri: item.image }}
                                            >
                                            </ImageBackground>
                                            <View style={styles.showTitleContainer}>
                                                <Text style={styles.showText}>
                                                    {item.title}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                            })
                        : <ActivityIndicator /> }
                        {activeTeam ? <Text style={{color: 'white', fontSize: 35, fontWeight: '600', marginTop: 50}}>Team Events</Text>
                            : <></>}
                        {dataQuery ?
                            activeTeam ? myTeamEvents.map ( item => {
                                    return <TouchableOpacity key={item.id} 
                                                style={styles.sinlgeShowContainer} 
                                                onPress={() => navigation.navigate('BuyTicketsScreen', {eventDetails: item})}
                                            >
                                                <ImageBackground 
                                                    style={styles.showCoverPic}
                                                    imageStyle={{borderRadius: 50}}
                                                    source={{ uri: item.image }}>
                                                </ImageBackground>
                                                <View style={styles.showTitleContainer}>
                                                    <Text style={styles.showText}>
                                                        {item.title}
                                                    </Text>
                                                </View>
                                            </TouchableOpacity>
                                }) : <></>
                        : <ActivityIndicator /> }
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
    Container: {
        width: '100%',
        height: 60,
        marginBottom: 7,
    },
    buttonContainer1: {
        marginLeft: 13,
        width: '45%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderColor: 'gray',
        borderWidth: 1,
    },
    buttonContainer2: {
        width: '45%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        borderColor: 'gray',
        borderWidth: 1,
        position: 'absolute',
        right: 13,
    },
    buttonText: {
        color: 'white',
        fontSize: 25,
    },
    showContainer: {
        width: '100%',
        alignItems: 'center',
        flex: 1,
    },
    showCoverPic: {
        marginTop: 7,
        resizeMode: "contain",
        width: 320,
        height: 225,
    },
    sinlgeShowContainer: {
        alignItems: 'center',
    },
    showText: {
        color: 'white',
        fontSize: 25
    },
})

export default EventsScreen;