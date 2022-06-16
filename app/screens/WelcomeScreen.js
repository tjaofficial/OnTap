import {Image, StyleSheet, Text, View } from "react-native";
import React from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";


function WelcomeSceen({navigation}) {

    const goSignUp = () => navigation.navigate('SignUpScreen');
    const goSignIn = () => navigation.navigate('SignInScreen');

    return (
        <View
            style={styles.background}
        >
            <Image 
                style={styles.logo}
                source={require("../assets/OnTapIcon.png")}
            />
            <TouchableOpacity 
                style={styles.loginButton}
                onPress={goSignUp}
            >
                <Text style={styles.loginFont}>
                    Create an Account
                </Text>
            </TouchableOpacity>
            <Text 
                style={{color: 'white', marginBottom: 70, fontSize: 17}}
                onPress={goSignIn}>
                Already Registered? Sign In
            </Text>
        </View>
    );
}
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    loginButton: {
        width: '75%',
        height: 60,
        backgroundColor: 'gray',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        borderRadius: 30,
        marginBottom: 25,
    },
    logo: {
        width: 200, 
        height: 150,
        position: 'absolute',
        top: '36%',
    },
    loginFont: {
        fontSize: 20,
    },
})
export default WelcomeSceen;