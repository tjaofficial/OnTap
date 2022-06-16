import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Header, CustomInput, CustomButton } from '../../components';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import Auth from '@aws-amplify/auth';


const NewPasswordScreen = () => {
    const navigation = useNavigation();

    const {control, handleSubmit, watch} = useForm();

    const pwd = watch('newPassword')

    const onResetPressed = async(data) => {
        const {username} = data;
        try {
            await Auth.forgotPasswordSubmit(data.username, data.code, data.newPassword);
            navigation.navigate('SignInScreen');
            Alert.alert('Success', 'Password has been changed. Please Sign In with new password.')
        } catch (e) {
            Alert.alert('Oops', e.message)
        }
    }
    const goSignIn = () => {
        navigation.navigate('SignInScreen');
    }
    
    return (
        <View style={styles.background}>
            <Header text='Reset Password' adjustment={183} />
            <ScrollView>
                <View style={styles.bodyContianer}>
                    <Text style={styles.title}>
                        Choose new password
                    </Text>    
                    <CustomInput 
                        name='username'
                        placeholder="Username" 
                        control={control} 
                        rules={{
                            required: 'Enter a username',
                        }} 
                    />
                    <CustomInput 
                        name='code'
                        placeholder="Code" 
                        control={control}
                        rules={{
                            required: "Please enter 6 digit code from your email",
                            validate: value => value.length === 6 || "Please check the length of the code entered",
                        }}
                    />
                    <CustomInput 
                        name='newPassword'
                        placeholder="New Password" 
                        control={control} 
                        rules={{
                            required: 'Enter a newpassword',
                            minLength: {
                                value: 8, 
                                message: 'Password should be minimum 8 characters long'
                            },
                        }}
                        secureTextEntry
                    />
                    <CustomInput 
                        name='newRepeatPassword'
                        placeholder="Repeat New Password" 
                        control={control} 
                        rules={{
                            required: 'Please re-enter new password',
                            validate: value => value === pwd || 'Password does not match',
                        }}
                        secureTextEntry
                    />
                    <CustomButton 
                        text="Reset"
                        onPress={handleSubmit(onResetPressed)}
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

export default NewPasswordScreen;