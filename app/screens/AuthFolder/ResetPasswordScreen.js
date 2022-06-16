import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Header, CustomInput, CustomButton } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import Auth from '@aws-amplify/auth';

const ResetPasswordScreen = () => {
    const navigation = useNavigation();

    const {control, handleSubmit} = useForm();

    const onSendPressed = async(data) => {
        const {username} = data;
        try {
            await Auth.forgotPassword(data.username);
            navigation.navigate('NewPasswordScreen');
        } catch (e) {
            Alert.alert('Oops', e.message)
        }
    }
    const goSignIn = () => {
        navigation.navigate('SignInScreen');
    }
    
    return (
        <View style={styles.background}>
            <View style={{flex:1, justifyContent: 'center' }}>
                <View style={styles.bodyContianer}>
                    <Text style={styles.title}>
                        Create an account
                    </Text>    
                    <CustomInput 
                        name='username'
                        placeholder="Username" 
                        control={control} 
                        rules={{
                            required: 'Please enter your email'
                        }}
                    />
                    <CustomButton 
                        text="Send"
                        onPress={handleSubmit(onSendPressed)}
                    />
                    <CustomButton 
                        text="Back to Sign In"
                        onPress={goSignIn}
                        type= 'Secondary'
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
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -100
    },
    title: {
        color: 'white',
    },
    text: {
        color: 'white',
    },
    link: {
        color: 'blue'
    },
})

export default ResetPasswordScreen;