import React, {useState} from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CustomInput, CustomButton, SocialSignInButtons, Header } from '../../components';
import { useForm } from 'react-hook-form';
import { Auth } from 'aws-amplify';
import * as Facebook from 'expo-facebook';


const SignInScreen = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const {control, handleSubmit, formState: {errors}} = useForm();

    
    const onSignInPressed = async(data) => {
        if(loading) {
            return;
        }
        setLoading(true);
        try {
            await Auth.signIn(data.username, data.password);
            navigation.navigate('Tabs',{changeForm: true}, {
                screen: 'HomeStackScreen', params: {
                    screen: 'HomeScreen'
                }
            });
        } catch(e) {
            Alert.alert('Oops', e.message);
        }
        setLoading(false);
        //validate user
        
    };
    const onForgotPasswordPressed = () => {
        navigation.navigate('ResetPasswordScreen');
    }
    const onSignUpPressed = () => {
        navigation.navigate('SignUpScreen');
    }

    return (
        <View style={styles.background}>
            
            <View style={{flex:1, justifyContent: 'center' }}>
                <View style={styles.bodyContianer}>
                    <CustomInput 
                        name='username'
                        placeholder="Username" 
                        control={control}
                        rules={{
                            required: 'Username is required',
                            maxLength: {value: 25, message: 'Username should be between 5 and 25 characters long'},
                            minLength: {value: 5, message: 'Username should be between 5 and 25 characters long'},
                        }} 
                    />
                    <CustomInput 
                        name='password'
                        control={control}
                        placeholder="Password"
                        secureTextEntry
                        rules={{
                            required: 'Password is required',
                            minLength: {value: 8, message: 'Password should be minimum 8 characters long'},
                        }}
                    />

                    <CustomButton 
                        text={loading ? "Loading..." : "Sign In"}
                        onPress={handleSubmit(onSignInPressed)}
                        type="Primary"
                    />
                    <CustomButton 
                        text="Forgot Password" 
                        onPress={onForgotPasswordPressed} 
                        type="Secondary"
                    />

                    <SocialSignInButtons />

                    <CustomButton 
                        text="Don't have an account? Create one" 
                        onPress={onSignUpPressed} 
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
        marginTop: -80
    },
})

export default SignInScreen;