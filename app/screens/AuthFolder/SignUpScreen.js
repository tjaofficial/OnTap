import React from 'react';
import { Alert, View, StyleSheet, Text } from 'react-native';
import { CustomInput, CustomButton, SocialSignInButtons, Header } from '../../components';
import { useNavigation } from '@react-navigation/native';
import {useForm} from 'react-hook-form';
import Auth from '@aws-amplify/auth';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const SignUpScreen = () => {
    const {
        control, 
        handleSubmit, 
        watch,
    } = useForm();

    const pwd = watch('password')

    const navigation = useNavigation();

    const onRegisterPressed = async(data) => {
        const {username, password, email, name} = data;
        try {
            await Auth.signUp({
                username,
                password,
                attributes: { email, name, preferred_username: username}
            });
            navigation.navigate('ConfirmEmailScreen', {username});
        } catch (e) {
            Alert.alert('Oops', e.message)
        }
    }
    const onSignInPressed = () => {
        navigation.navigate('SignInScreen');
    }
    const goPrivacyPolicy = () => {
        console.warn('Privacy Policy');
    }
    const goTermsOfConditions = () => {
        console.warn('Terms and Conditions');
    }

    return (
        <View style={styles.background}>
            <View style={{flex:1,justifyContent: 'center' }}>
                <View style={styles.bodyContianer}>
                    <Text style={styles.title}>
                        Create an account
                    </Text>    
                    <CustomInput 
                        name='name'
                        placeholder="Full Name" 
                        control={control} 
                        rules={{
                            required: 'Name is required',
                            maxLength: {
                                value: 25, 
                                message: 'Name cannot exceed 25 characters long'
                            },
                            minLength: {
                                value: 5, 
                                message: 'Name cannot be shorter than 5 characters long'
                            },
                        }} 
                    />
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
                        name='email'
                        placeholder="Email" 
                        control={control} 
                        rules={{
                            required: "Enter a valid email",
                            pattern: {
                                value: EMAIL_REGEX, 
                                message: 'Email is invalid',
                            }
                        }}
                    />
                    <CustomInput 
                        name='password'
                        placeholder="Password" 
                        control={control} 
                        rules={{
                            required: 'Enter a password',
                            minLength: {
                                value: 8, 
                                message: 'Password should be minimum 8 characters long'
                            },
                        }}
                        secureTextEntry
                    />
                    <CustomInput 
                        name='Repeat Password'
                        placeholder="Repeat Password" 
                        control={control} 
                        rules={{
                            required: 'Please re-enter password',
                            validate: value => value === pwd || 'Password does not match',
                        }}
                        secureTextEntry
                    />
                    <CustomButton 
                        text="Register" 
                        onPress={handleSubmit(onRegisterPressed)}
                        type="Primary"
                    />
                    <Text style={styles.text}>
                        By registering, you confirm that you accept our{" "}
                        <Text style={styles.link} onPress={goTermsOfConditions}>
                            Terms of Use
                        </Text>{" "}
                        and{" "}
                        <Text style={styles.link} onPress={goPrivacyPolicy}>
                            Privacy Policy
                        </Text>
                    </Text>

                    <SocialSignInButtons />

                    <CustomButton 
                        text="Already have an account? Sign In" 
                        onPress={onSignInPressed} 
                        type="Secondary"
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
        marginTop: -60
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

export default SignUpScreen;