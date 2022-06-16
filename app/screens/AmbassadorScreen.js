import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import Header from '../components/Header';



const AmbassadorScreen = ({navigation}) => {
    

    return (
        <View style={styles.background}>
            <Header text='Ambassador' />
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <View style={styles.bodyContianer}>
                    <Text style={styles.text}>
                        'Ambassador' Under {"\n"}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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

export default AmbassadorScreen;