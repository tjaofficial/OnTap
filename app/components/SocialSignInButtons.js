import React, { useState } from 'react';
import { Alert, Text, StyleSheet, View } from 'react-native';
import CustomButton from './CustomButton';
import * as Facebook from 'expo-facebook';
import { useNavigation } from '@react-navigation/core';
import { Auth } from 'aws-amplify';

const SocialSignInButtons = () => {
    const navigation = useNavigation();
    const [isLoggedin, setLoggedinStatus] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isImageLoading, setImageLoadStatus] = useState(false);
    const appID = '697895971482606';

    const onSignInFacebook = () => {
        console.warn('Sign Up with facebook');
    }
    const onSignInGoogle = () => {
        console.warn('Sign Up with google');
    }
    const onSignInApple = () => {
        console.warn('Sign Up with apple');
    }

    async function facebookLogIn() {
        try {
          await Facebook.initializeAsync({
            appId: '697895971482606',
          });
          const { type, token, expirationDate, permissions, declinedPermissions } =
            await Facebook.logInWithReadPermissionsAsync({
              permissions: ['public_profile'],
            });

          if (type === 'success') {
            // Get the user's name using Facebook's Graph API
            const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
            const user = await response.json();

            Alert.alert('Logged in!', `Hi ${user.name}!`);
            
            return {
                user,
                token,
                expires_at: expirationDate
            };
          } else {
            // type === 'cancel'
          }
        } catch ({ message }) {
          alert(`Facebook Login Error: ${message}`);
        }
    }
    
    const amplifyFacebookSignIn = async () => {
        // Use Expo to login with facebook and get user info.
        const { user, token, expires_at } = await facebookLogIn();
        
        // Use the token to authenticated Amplify.
        await Auth.federatedSignIn("Facebook", { token, expires_at }, user);
        
        // At any point you can get the user's information using Auth.currentUserInfo()
        const userDetails = await Auth.currentUserInfo();
        console.log("Current user info:", userDetails);
        
        // Navigate away or do something...
        navigation.navigate('Tabs',{changeForm: true}, {
            screen: 'HomeStackScreen', params: {
                screen: 'HomeScreen'
            }
        }) 
      }
    

    logout= () => {
        setLoggedinStatus(false);
        setUserData(null);
        setImageLoadStatus(false);
    }

    return (
         <>
            <CustomButton 
                text="Sign In with Facebook" 
                onPress={amplifyFacebookSignIn}
                bgColor="#E7EAF4"
                fgColor="#4765A9"
            />
            <CustomButton 
                text="Sign In with Google" 
                onPress={onSignInGoogle}
                bgColor="#FAE9Ea"
                fgColor="#DD4D44"
            />
            <CustomButton 
                text="Sign In with Apple" 
                onPress={onSignInApple}
                bgColor="#E3E3E3"
                fgColor="#363636"
            />
        </>
        
    );
}

const styles = StyleSheet.create({
    
})
export default SocialSignInButtons;