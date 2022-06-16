import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Header, CustomButton } from '../../../components';

const TicketConfirmationScreen = ({navigation}) => {
    return (
        <View style={styles.background}>
            <Header text='Confirmation' />
            <View style={{flex: 1}}>
                <View style={styles.bodyContianer}>
                    <Text style={{color: 'white', fontSize: 30, textAlign: 'center',}}>
                        Tickets Have Been Sent To Your Email
                    </Text>
                    <CustomButton
                        text='Back to Events'
                        onPress={() => navigation.navigate('EventsScreen', {changeForm: true})}
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
        alignItems: 'center',
        justifyContent: 'center',
    },
})

export default TicketConfirmationScreen;