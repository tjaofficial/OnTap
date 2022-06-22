import React, { useEffect, useState } from 'react';
import { Auth, DataStore } from 'aws-amplify';
import { useRoute } from '@react-navigation/core';
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { Event, Tickets, User } from '../../models';
import { Header } from '../../components';
import Icon from 'react-native-vector-icons/Octicons';
import Email from 'react-native-vector-icons/MaterialCommunityIcons';
import Remove from 'react-native-vector-icons/FontAwesome';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { sendEmail } from '../../../email_send';


const AnalyticsScreen = ({navigation}) => {
    const route = useRoute();
    const event = route.params.event;
    const eventID = event.id;
    const teamData = JSON.parse(event.team);
    const [active, setActive] = useState();
    const [tickets, setTickets] = useState();
    const [dataQuery, setDataQuery] = useState(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [addTeam, setAddTeam] = useState(true);
    const [user, setUser] = useState();
  
   

    useEffect(() => {
        const getTicketsSold = async () => {
            const dbAuth = await Auth.currentAuthenticatedUser();
            const dbUser = await DataStore.query(User, x => x.sub('eq', dbAuth.attributes.sub));
            const dbEventTickets = await DataStore.query(Tickets, c => c.hostID('eq', eventID));
            
            if (dbUser.length === 0) {
                return;
            }
            setUser(dbUser[0]);
            setTickets(dbEventTickets);
            setDataQuery(true);
        }
        getTicketsSold();
        
        if (teamData !== null) {
            setAddTeam(false);
            setActive(teamData.active);
        }
        
    }, [])

    const resend = (instance) => {
        sendEmail(instance.email, instance.name, event.code);
        Alert.alert('Resent Activation Email');
    }

    const deleteSeller = async (index) => {
        console.log(teamData.length);
        if (teamData[0].members.length === 1) {
            console.log('there only one');
            teamData[0]['members'] = [];
            const updatedTeam = Event.copyOf(event, updated => {
                updated.team = teamData;
                updated.code = null;
            });
            await DataStore.save(updatedTeam);
            setAddTeam(true);
        } else if (teamData.length > 1){
            console.log(index);
            teamData[0].members.splice(index, 1)
            const newTeam = JSON.stringify(teamData);
            const updatedTeam = Event.copyOf(event, updated => {
                updated.team = newTeam;
            });
            console.log(newTeam);
            await DataStore.save(updatedTeam);
        }
        
    }

    const goAddTeam = () => {
        navigation.navigate('AddTeam',{ prevEventDetails: event})
    }

    return (
        <View style={styles.background}>
            <Header text='Event Analytics' />
            <ScrollView style={{flex:1}}>
                {dataQuery ? <View style={styles.bodyContianer}>
                    <View style={{flex:1, alignItems:'center', marginVertical: 5}}>
                        <View style={styles.dataContainer}>
                            <View style={styles.headerHolder}>
                                <Text style={styles.dataHeader}>{event.title}</Text>
                                <View style={styles.totals}>
                                    <Text style={styles.totalsTextTop}>Total Ticket Sales</Text>
                                    <Text style={styles.totalsTextBottom}>{event.ticketsSold}</Text>
                                </View>
                            </View>
                            <View style={styles.tableHeaderCont}>
                                <Text style={styles.headerLeft}>Seller</Text>
                                <Text style={styles.headerCenter}>Today</Text>
                                <Text style={styles.headerRight}>Total</Text>
                            </View>
                            <View style={styles.sellersCont}>
                                <View style={styles.sellerCont}>
                                <Icon name='dot-fill' size={25} color='white' style={[styles.active, {opacity: 0.0,}]} />
                                    <Text style={styles.sellerText}>Host</Text>
                                    <Text style={styles.todayText}>+{teamData[1].host.todaySold}</Text>
                                    <Text style={styles.totalText}>{teamData[1].host.sold}</Text>
                                    <TouchableOpacity style={{flex:.5, alignItems: 'flex-end',}}>
                                        <Email name='email-send-outline' size={20} color='white' style={[styles.emailSend, {opacity: 0.0,}]}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flex:.5, alignItems: 'flex-end', marginLeft: 10}}>
                                        <Remove name='remove' size={20} color='white' style={[styles.emailSend, {opacity: 0.0,}]} />
                                    </TouchableOpacity>
                                </View>
                            {!addTeam ? teamData[0].members.map ((item, index) => {
                                return <View key={item.email} style={styles.sellerCont}>
                                    <Icon name='dot-fill' size={25} color={item.active ? 'green' : 'white'} style={styles.active}/>
                                    <Text style={styles.sellerText}>{item.name}</Text>
                                    <Text style={styles.todayText}>+{item.todaySold}</Text>
                                    <Text style={styles.totalText}>{item.sold}</Text>
                                    <TouchableOpacity style={{flex:.5, alignItems: 'flex-end'}}>
                                        <Email name='email-send-outline' size={20} color='white' style={styles.emailSend} onPress={ () => resend(item)} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flex:.5, alignItems: 'flex-end', marginLeft: 10}} onPress={() => deleteSeller(index)}>
                                        <Remove name='remove' size={20} color='white' style={styles.emailSend} />
                                    </TouchableOpacity>
                                </View>
                            })
                            : <View style={{flex:1, alignItems: 'center'}}>
                                <TouchableOpacity style={styles.deleteContainer} onPress={goAddTeam}>
                                        <Icon2 name='team' size={15} color='white' style={styles.changePicIcon}/>
                                        <Text style={{color: 'white', fontSize: 13}}>Add Team</Text>
                                    </TouchableOpacity>
                                </View>}
                            </View>
                        </View>
                    </View>
                </View> : <ActivityIndicator />}
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
        flex: 1,
    },
    eventCont: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        height: 35,
        marginHorizontal: 10,
    }, 
    eventTitleText: {
        flex: 3,
    },
    eventSoldText: {
        flex: 2,
        textAlign: 'center',
    },
    eventRevenueText: {
        flex: 1,
        textAlign: 'center',
    },
    dataContainer: {
        backgroundColor: '#646464',
        width: '95%',
        borderRadius: 20,
        padding: 10
    },
    dataHeader: {
        fontSize: 20,
        fontWeight: '700',
        color: '#B0B0B0',
        flex: 3,
    },
    tableHeaderCont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: 5,
        paddingHorizontal: 25,
    }, 
    sellerCont: {
        backgroundColor: '#353535',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 15,
        paddingRight: 15,
        paddingLeft: 15,
    },
    sellerText: {
        flex: 3, 
        fontWeight: '500',
        color: 'white',
        textAlign: 'left',
    },
    active: {
        flex:1, 
    },
    emailSend: {
        //flex:1, 
    },
    todayText: {
        flex:2, 
        textAlign: 'center', 
        fontWeight: '500', 
        color: 'white',
        textAlign: 'center',
    },
    totalText: {
        flex:1, 
        textAlign: 'center', 
        fontWeight: '500',
        color: 'white',
        textAlign: 'left',
    },
    headerLeft: {
        flex: 4, 
        fontWeight: '400', 
        color: 'white',
        textAlign: 'center',
        marginRight: 10,
    },
    headerCenter: {
        flex:2, 
        textAlign: 'center', 
        fontWeight: '400', 
        color: 'white',
    },
    headerRight: {
        flex:2, 
        textAlign: 'left', 
        fontWeight: '400', 
        color: 'white',
    },
    sellersCont: {
        flex: 1,
    },
    totalsTextTop: {
        color: '#B0B0B0',
        fontSize: 10,
    },
    totalsTextBottom: {
        color: '#FFFFFF',
    },
    totals: {
        backgroundColor: '#353535',
        borderRadius: 20,
        //flex: 2,
        alignItems: 'center',
        width: 120,
        paddingVertical: 2,
    },
    headerHolder: {
        flexDirection: 'row',
        marginHorizontal: 10,
        alignItems: 'center',
    },
    deleteContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
        justifyContent: 'center'
    },
})
export default AnalyticsScreen;