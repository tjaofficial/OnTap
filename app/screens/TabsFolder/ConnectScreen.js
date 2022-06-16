import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Header } from '../../components';

const ConnectScreen = ({navigation}) => {
    return (
        <View style={styles.background}>
            <Header text='Connect' />
            <View style={styles.Container}>
                <View style={styles.bodyContianer}>
                    <Text style={styles.text}>
                        'Connect' Under {"\n"}
                        Construction
                    </Text>


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
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    Container: {
        flex: 1,
    },
    text: {
        borderColor: 'gray', 
        borderWidth: 1,
        borderRadius: 20,
        color: 'white', 
        textAlign: 'center', 
        fontSize: 38, 
        fontWeight: '600', 
        opacity: 0.4,
        padding: 5,
        marginTop: -80,
    },
})

export default ConnectScreen;