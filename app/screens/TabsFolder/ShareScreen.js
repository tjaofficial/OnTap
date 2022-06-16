import React, {useEffect, useState} from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Header, CustomButton } from '../../components';
import QRCode from 'react-native-qrcode-svg';
import {Auth, DataStore} from 'aws-amplify';
import { User } from '../../models';


const ShareScreen = ({navigation}) => {
    const QRAddress = 'https://www.TJAofficial.com';
    const [pro, setPro] = useState();
    
    useEffect(() => {
        const getPro = async () => {
            const authUser = await Auth.currentAuthenticatedUser(); 
            const dbUsers = await DataStore.query(User, x => x.sub('eq', authUser.attributes.sub));

            setPro(dbUsers[0].PRO);
        }
        getPro();
    })

    const goPro = () => navigation.navigate('OnTapProScreen');

    return (
        <View style={styles.background}>
            <Header text='Share' />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.bodyContianer}>
                    <View style={styles.qrCont}>
                        <QRCode value={QRAddress} size={225} />
                    </View>
                    <View style={{flex:1, alignItems: 'center'}}>
                        <Text style={{color: 'white'}}>Share</Text>
                        <CustomButton buttonWidth={225} type='Inverted' text='Email' />
                        <CustomButton buttonWidth={225} type='Inverted' text='Text' />
                        <CustomButton buttonWidth={225} type='Inverted' text='Wallet' />
                        <CustomButton buttonWidth={225} type='Inverted' text='Copy Link' />
                        <CustomButton buttonWidth={225} type='Inverted' text='Save QR' />
                        <CustomButton buttonWidth={225} type='Inverted' text={pro ? 'Add Logo' : 'Add Logo(PRO)'} onPress={pro ? {} : goPro} />
                    </View>
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
    qrCont: {
        width:243, 
        height: 243, 
        backgroundColor: 'white', 
        justifyContent: 'center', 
        alignItems: 'center',
    }, 
})

export default ShareScreen;