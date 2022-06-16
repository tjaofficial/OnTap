import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, ImageBackground, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/core';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/AntDesign';
import { Auth, DataStore } from 'aws-amplify';
import { Header, CustomButton, LinkButton } from '../../../components';
import { User } from '../../../models';

const BuyTicketsScreen = ({navigation}) => {
    const route = useRoute();
    const changeForm = false;
    const [formFileds, setFormFields] =useState(changeForm);
    const eventDetails = route.params.eventDetails;
    const [authUser, setAuthUser] = useState();
    const [dataQuery, setDataQuery] = useState(false);
    const [quantity, setQuantity] = useState('');
    const [pro, setPro] = useState();
    const [host, setHost] = useState(true);
    
    const goPro = () => navigation.navigate('OnTapProScreen');

    useEffect(() => {
        const getCurrentUser = async () => {
            const dbAuth = await Auth.currentAuthenticatedUser(); 
            const dbUsers = await DataStore.query(User, x => x.sub('eq', dbAuth.attributes.sub));
            if (eventDetails.sub !== dbAuth.attributes.sub) {
                setHost(false);
            }

            setPro(dbUsers[0].PRO);
            setDataQuery(true);
        }
        getCurrentUser();
    }, [])


    const deleteEvent = () => {
        DataStore.delete(eventDetails);
        navigation.navigate('EventsScreen', {changeForm: true})
    }

    const addTeam = () => {
        navigation.navigate('AddTeam',{ prevEventDetails: eventDetails})
    }

    const goConfirm = () => navigation.navigate('TicketConfirmScreen', {eventDetails: eventDetails, quantity: quantity});

    const parseMoney = (moneyNumber) => {
        if (Number.isInteger(moneyNumber)){
            const cost = '$' + moneyNumber + '.00';
            return cost;
        } else {
            const cost = '$' + moneyNumber;
            return cost;
        }
    }

    const parseTime = (timeNumber) => {
        const time = timeNumber.substring(0,5);
        const minute = time.substring(3,5);
        if (parseInt(time.substring(0,2)) <= 12) {
            if (parseInt(time.substring(0,1)) === 0) {
                const hour = time.substring(1,2);
                return hour + ':' + minute + 'am';
            } else {
                if (parseInt(time.substring(0,2)) === 12) {
                    const hour = time.substring(0,2);
                    return hour + ':' + minute + 'pm';
                } else {
                    const hour = time.substring(0,2);
                    return hour + ':' + minute + 'am';
                }
            }
        } else {
            const pmTime = parseInt(time.substring(0,2)) - 12;
            if (parseInt(String(pmTime).substring(0,1)) === 0) {
                const hour = String(pmTime).substring(1,2);
                return hour + ':' + minute + 'pm';
            } else {
                const hour = pmTime;
                return hour + ':' + minute + 'pm';
            }
        }
    }


    return (
        <View style={styles.background}>
            <Header text='Buy Tickets' />
            <ScrollView>
                {dataQuery ?<View style={styles.bodyContianer}>
                    <View style={styles.showContainer}>
                        <View style={styles.sinlgeShowContainer}>
                            <View style={styles.optionCont}>
                                {eventDetails.code ? <></> : <TouchableOpacity style={styles.deleteContainer} onPress={pro ? addTeam : goPro}>
                                    <Icon2 name='team' size={15} color='white' style={styles.changePicIcon}/>
                                    <Text style={{color: 'white', fontSize: 13, marginRight: 40}}>{pro ? 'Add Team' : 'Add Team(PRO)' }</Text>
                                </TouchableOpacity> }
                                {host ? <TouchableOpacity style={styles.deleteContainer} onPress={deleteEvent}>
                                    <Icon1 name='delete' size={15} color='red' style={styles.changePicIcon}/>
                                    <Text style={{color: 'red', fontSize: 13}}> Delete</Text>
                                </TouchableOpacity> 
                                : <></> }
                            </View>
                            <ImageBackground 
                                style={styles.showCoverPic}
                                imageStyle={{borderRadius: 50}}
                                source={{ uri: eventDetails.image }}
                            >
                            </ImageBackground>
                            <View style={styles.showTitleContainer}>
                                <Text style={styles.showText}>
                                    {eventDetails.title}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={styles.inputData}>
                            <View style={styles.inputData2}>
                                <Text style={styles.infoText}>
                                    Date:
                                </Text>
                            </View>
                            <View style={styles.inputData3}>
                                <Text style={styles.infoText2}>
                                    {eventDetails.date}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.inputData}>
                            <View style={styles.inputData2}>
                                <Text style={styles.infoText}>
                                    Time:
                                </Text>
                            </View>
                            <View style={styles.inputData3}>
                                <Text style={styles.infoText2}>
                                    {parseTime(eventDetails.startTime.substring(0,5))} - {parseTime(eventDetails.endTime.substring(0,5))}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.inputData}>
                            <View style={styles.inputData2}>
                                <Text style={styles.infoText}>
                                    Ticket Price:
                                </Text>
                            </View>
                            <View style={styles.inputData3}>
                                <Text style={styles.infoText2}>
                                    {parseMoney(eventDetails.ticketPrice)}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.inputData}>
                            <View style={styles.inputData2}>
                                <Text style={styles.infoText}>
                                    Quantity:
                                </Text>
                            </View>
                            <View style={styles.inputData3}>
                                <View style={styles.quantityContainer}>
                                    <TextInput 
                                        style={styles.quantity} 
                                        value={quantity}
                                        onChangeText={setQuantity}
                                        keyboardType={'numeric'}
                                        placeholder='0.00'
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{marginTop: 25}}>
                        <View style={styles.inputData}>
                            <View style={styles.inputData2}>
                                <Text style={styles.infoText}>
                                    Total Amount:
                                </Text>
                            </View>
                            <View style={styles.inputData3}>
                                <Text style={styles.infoText2}>
                                    {eventDetails.ticketPrice * quantity === 0 ? 'Enter Quantity' : parseMoney(eventDetails.ticketPrice * quantity)}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.extraInfo}>
                        <LinkButton
                            title='PayPal'
                            logo='paypal'
                        />
                        <LinkButton
                            title='CashApp'
                            logo='cashapp'
                        />
                        <LinkButton
                            title='Venmo'
                            logo='venmo'
                        />
                    </View>
                    <View style={styles.extraInfo}>
                        <CustomButton 
                            text='Confirm'
                            onPress={goConfirm}
                            type="Primary"
                        />
                    </View>
                </View> : <ActivityIndicator /> }
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
    infoText: {
        color: 'white',
        fontSize: 20,
        width: 150,
    },
    infoText2: {
        color: 'white',
        fontSize: 18,
        textAlign: 'right',
    },
    inputData: {
        flexDirection: 'row',
        width: '100%',
    },
    inputData2: {
        width: 130,
        justifyContent: 'center',
    },
    inputData3: {
        width: 140,
        justifyContent: 'center',
    },
    quantity: {
        backgroundColor: 'gray',
        width: 70,
        borderRadius: 15,
        height: 22,
        textAlign: 'center',
        fontSize: 20,
    },
    quantityContainer: {
        alignItems: 'flex-end',
    },
    deleteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 5,
    },
    optionCont: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
})

export default BuyTicketsScreen;