import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/Octicons';

function NavigatorBar() {
    const navigation = useNavigation();
    const goTicket = () => navigation.navigate('TicketScreen')
    
    return (
        <View style={styles.navBarContainer}>
            <View style={styles.navBarInner}>
                <TouchableOpacity style={styles.IconBehave}>
                    <Icon1 name='network-wired' size={25} color='white' style={styles.connectIcon}/>
                    <Text style={styles.connectText}>
                        Connect
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.IconBehave}>
                    <Icon2 name='line-graph' size={25} color='white' style={styles.insightsIcon}/>
                    <Text style={styles.insightsText}>
                        Insights
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.IconBehave} onPress={goTicket}>
                    <Icon3 name='ticket' size={25} color='white' style={styles.ticketsIcon}/>
                    <Text style={styles.ticketsText}>
                        Tickets
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.IconBehave}>
                    <Icon4 name='qrcode' size={25} color='white' style={styles.shareIcon}/>
                    <Text 
                        style={styles.shareText}>
                        Share
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.IconBehave}>
                    <Icon5 name='person-fill' size={25} color='white' style={styles.profileIcon}/>
                    <Text style={styles.profileText}>
                        Profile
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    navBarContainer: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        height: 90,
        backgroundColor: '#3B3B3B',
        alignItems: 'center',
        paddingTop: 15
    },
    navBarInner:{
        flexDirection: 'row',
        width: '103%',
        justifyContent: 'space-evenly',
    },
    IconBehave:{ 
        Padding: 10,
        alignItems: 'center',
    },
    connectText: {
        color: 'white',
        fontSize: 13,
    },
    insightsText: {
        color: 'white',
        fontSize: 13,
    },
   ticketsText: {
        color: 'white',
        fontSize: 13,
    },
    shareText: {
        color: 'white',
        fontSize: 13,
    },
    profileText: {
        color: 'white',
        fontSize: 13,
    },
})

export default NavigatorBar;