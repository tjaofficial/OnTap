import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, Switch, ActivityIndicator } from 'react-native';
import { Header, AccountSettingsButton } from "../components";
import { Auth, DataStore } from 'aws-amplify';
import { User } from '../models';

function SettingsScreen({ navigation }) {
    const [user, setUser] = useState({});
    const [authData, setAuthData] = useState();
    const [dataQuery, setDataQuery] = useState(false);
    const [pro, setPro] = useState(0);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    useEffect(() => {
        const getData = async () => {
            const dbAuth = await Auth.currentAuthenticatedUser();
            const dbUser = await DataStore.query(User, c => c.sub('eq', dbAuth.attributes.sub))

            setUser(dbUser[0]);
            setAuthData(dbAuth);
            setPro(dbUser[0].PRO);
            setDataQuery(true);
        }
        getData();
    }, [])

    const logout = async () => {
        await DataStore.clear();
        navigation.navigate('WelcomeScreen');
        Auth.signOut();
    };
    
    const goSocial = () => navigation.navigate('SocialSyncScreen');
    const goOnTap = () => navigation.navigate('OnTapProScreen');
    const goAmbo = () => navigation.navigate('AmbassadorScreen');
    const goPro = () => navigation.navigate('OnTapProScreen');


    return (
        <View style={styles.background}>
            <Header text='Account Settings' />
            <ScrollView>
                {dataQuery ? <View style={styles.bodyContianer}>
                    <AccountSettingsButton text='Accounts' arrow />
                    <View style={styles.settingsArea}>
                        <View style={styles.lineCont}>
                            <Text style={styles.lineHeader}>
                                First Name
                            </Text>
                            <Text style={styles.lineData}>
                                {user.firstName}
                            </Text>  
                        </View>
                        <View style={styles.lineCont}>
                            <Text style={styles.lineHeader}>
                                Last Name
                            </Text>  
                            <Text style={styles.lineData}>
                                {user.lastName}
                            </Text>  
                        </View>
                        <View style={styles.lineCont}>
                            <Text style={styles.lineHeader}>
                                Account Email
                            </Text>  
                            <Text style={styles.lineData}>
                                {authData.attributes.email}
                            </Text>  
                        </View>
                        <View style={styles.lineCont}>
                            <Text style={styles.lineHeader}>
                                Profile Link
                            </Text>  
                            <Text style={styles.lineData}>
                                {user.profileLink}
                            </Text>  
                        </View>
                        <View style={styles.lineCont}>
                            <Text style={styles.lineHeader}>
                                Dark Mode
                            </Text>  
                            <View style={styles.switchData}>
                                <Switch
                                    trackColor={{ false: '#6B6B6B', true: '#ffffff' }}
                                    thumbColor={isEnabled ? '#A4ADB3' : '#000000'}
                                    ios_backgroundColor="#6B6B6B"
                                    onValueChange={toggleSwitch}
                                    value={isEnabled}
                                />
                            </View>  
                        </View>
                    </View>
                    <AccountSettingsButton text='OnTap Ambassador' onPress={goAmbo} arrow />
                    <AccountSettingsButton text='Activate a OnTap Device' arrow />
                    <AccountSettingsButton text='How To Use OnTap' arrow />
                    <AccountSettingsButton text='Get OnTap PRO' onPress={goOnTap} arrow />
                    <AccountSettingsButton text='Social Sync' onPress={pro ? goSocial : goPro} arrow />
                    <AccountSettingsButton text='Sign Out' onPress={logout} />
                </View> : <ActivityIndicator />}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%', 
        alignItems: 'center',
    },
    background: {
        flex: 1,
        backgroundColor: 'black',
    },
    bodyContianer: {
        alignItems: 'center',
    },
    settingsArea: {
        width: '95%',
        borderRadius: 16,
        backgroundColor: '#353535',
        marginTop: 6,
        paddingVertical: 15
    },
    lineHeader: {
        flex:1,
        color: 'white',
        fontSize: 23,
        marginLeft: 25,
    },
    lineCont: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        paddingVertical: 8,
    },
    lineData: {
        flex: 1,
        color: 'white',
        textAlign: 'right',
        paddingRight: 25,
    },
    switchData: {
        flex: 1,
        alignItems: 'flex-end',
        paddingRight: 25,
        justifyContent: 'center',
    },
})

export default SettingsScreen;