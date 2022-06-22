import { useRoute } from '@react-navigation/core';
import React, { useEffect } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { CustomButton, Header } from '../../../components';
import QRCode from 'react-native-qrcode-svg';

const PaymentScreen = ({navigation}) => {
    const route = useRoute();
    const link = route.params.linkInfo;

    const QRAddress = link.link;

    const goConfirm = () => {
        navigation.navigate('TicketConfirmScreen', {eventDetails: route.params.eventDetails, quantity: route.params.quantity})
    }

    return (
        <View style={styles.background}>
            <Header text='Payment' />
            <View style={styles.bodyContianer}>
                <View style={styles.qrCont}>
                    <QRCode value={QRAddress} size={225} />
                </View>
                <Text style={{color:'white'}}>
                    {link.platformNAME}
                </Text>
                <CustomButton
                    text='Paid'
                    onPress={goConfirm}
                />
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
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -55
    },
    qrCont: {
        width:243, 
        height: 243, 
        backgroundColor: 'white', 
        justifyContent: 'center', 
        alignItems: 'center',
    }, 
})
export default PaymentScreen;