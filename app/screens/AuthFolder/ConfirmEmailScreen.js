import React from 'react';
import { Alert, View, ScrollView, StyleSheet, Text } from 'react-native';
import { Header, CustomInput, CustomButton } from '../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import Auth from '@aws-amplify/auth';


const ConfirmEmailScreen = () => {
    const route = useRoute();
    const navigation = useNavigation();

    const {control, handleSubmit, watch} = useForm({
        defaultValues: {username: route?. params?. username},
    });

    const username = watch('username');

    const onConfirmPressed = async(data) => {
        const {username} = data;
        try {
            await Auth.confirmSignUp(
                data.username,
                data.code,
            );
            navigation.navigate('Tabs', {
                screen: 'HomeScreen'
            });
        } catch (e) {
            Alert.alert('Oops', e.message)
        }
    };
    const goResendCode = async() => {
        try {
            await Auth.resendSignUp(username);
            Alert.alert('Success', 'Code has been resent to your email')
        } catch (e) {
            Alert.alert('Oops', e.message)
        }
    }
    const goSignIn = () => {
        navigation.navigate('SignInScreen');
    }
    
    return (
        <View style={styles.background}>
            <Header text='Confirm email' />
            <ScrollView>
                <View style={styles.bodyContianer}>
                    <Text style={styles.title}>
                        Create an account
                    </Text>    
                    <CustomInput 
                        name='username'
                        placeholder="Username" 
                        control={control} 
                        rules={{
                            required: 'Enter a username',
                            maxLength: {
                                value: 25, 
                                message: 'Username cannot exceed 25 characters long'
                            },
                            minLength: {
                                value: 5, 
                                message: 'Username cannot be shorter than 5 characters long'
                            },
                        }} 
                    />
                    <CustomInput 
                        name='code'
                        placeholder="Enter your confirmation code" 
                        control={control} 
                        rules={{
                            required: "Please enter 6 digit code from your email",
                            validate: value => value.length === 6 || "Please check the length of the code entered",
                        }}
                    />
                    <CustomButton 
                        text="Confirm"
                        onPress={handleSubmit(onConfirmPressed)}
                    />
                    <CustomButton 
                        text='Resend Code'
                        onPress={goResendCode}
                        type= 'Inverted'
                    />
                    <CustomButton 
                        text="Back to Sign In"
                        onPress={goSignIn}
                        type= 'Secondary'
                    />
                </View>
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

export default ConfirmEmailScreen;