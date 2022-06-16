import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Platform, ProfileLinks, User } from '../models';
import {Auth, DataStore} from 'aws-amplify';
import HomeLinkGroups2 from "../components/HomeLinkGroups2";


const HomeLinkGroups = () => {
    const [firstFilter, setFirstFilter] = useState({});
    const [userLinks, setUserLinks] = useState({});
    const [value, setValue] = useState('checking value...');

    useEffect(() => {
        let isMounted = true;

        const thisone = async () => {
            const authUser = await Auth.currentAuthenticatedUser(); 
            const dbUsers = await DataStore.query(User, x => x.sub('eq', authUser.attributes.sub));
            const dbUser = dbUsers[0].id
            const comments = await DataStore.query(ProfileLinks, c => c.user2ID('eq', dbUser));
            setFirstFilter(comments);
        }
        thisone();

        const secondFilter = async () => {
            const pIdGroups = {}
            const dbPlatform = await DataStore.query(Platform);
            for (let a=0; a < Object.keys(firstFilter).length; a++) {
                let userLink = firstFilter[a];
                let platformId = userLink.platformID;
                for (let b=0; b < dbPlatform.length; b++){
                    let pInfo = dbPlatform[b];
                    let pType = pInfo.type;
                    let pID = dbPlatform[b].id;
                    if (platformId === pID) {
                        if (pIdGroups.hasOwnProperty(pType)) {
                            pIdGroups[pType].push(userLink);
                        } else {
                            pIdGroups[pType] = [userLink];
                        }
                    } 
                }
            }
            setUserLinks(pIdGroups);
        }
        secondFilter();

        secondFilter().then(() => {
            if(isMounted) {
                setValue('done!');
            }
        });
        return () => {
            isMounted = false;
        }
    }, [])

    return (
        <View style={styles.bodyContianer}>
            {userLinks.MUSIC ?<HomeLinkGroups2 
                group={userLinks.MUSIC}
                title='Music'
                onPress = 'nothing'
            /> : <Text></Text>}
            {userLinks.SOCIAL ?<HomeLinkGroups2 
                group={userLinks.SOCIAL}
                title='Socials'
                onPress = 'nothing'
            /> : <Text></Text>}
            {userLinks.PAYMENTS ?<HomeLinkGroups2 
                group={userLinks.PAYMENTS}
                title='Payments'
                onPress = 'nothing'
            /> : <Text></Text>}
            {userLinks.CONTACTS ? <HomeLinkGroups2 
                group={userLinks.CONTACTS}
                title='Contacts'
                onPress = 'nothing'
            /> : <Text></Text>}
            {userLinks.MORE ? <HomeLinkGroups2 
                group={userLinks.MORE}
                title='More...'
                onPress = 'nothing'
            /> : <Text></Text>}
            <View style={{ flex: 1 }}>
                <Text style={styles.sectionTitleText}>
                    Socials
                </Text>
                <View style={styles.groupLinkContainer}>
                    <Text>
                        ''
                    </Text>
                </View>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    text: {
        color: 'white',
    },
    fingersCrossed: {
        flex:1,

    },
})
export default HomeLinkGroups;








import { Linking, ScrollView, View, Text, StyleSheet, TouchableOpacity, SectionList } from "react-native";
import React, {useState, useEffect} from 'react';
import { PersonalHeader } from '../components/PersonalHeader';
import { ProfileButton } from "../components/ProfileButton";
import { Auth, DataStore } from "aws-amplify";
import { Platform, ProfileLinks, User } from '../models';
import ProfileNamePic from "../components/ProfileNamePic";
import HomeLinkGroups2 from "../components/HomeLinkGroups2";
import CustomButton from "../components/CustomButton";
import { Amplify, Hub } from 'aws-amplify';
import awsConfig from '../aws-exports';

Amplify.configure(awsConfig);

const HomeScreen = ({ navigation }) => {
    const [user, setUser] = useState();
    const [userLinks, setUserLinks] = useState({'MUSIC': ['chicken', 'pork' ], 'PAYMENTS': ['chicken', 'pork', 'cereal'], 'SOCIAL': ['chicken', 'pork', 'cereal'], });
    const [pic, setPic] = useState(null);
    const [username, setUsername] = useState('');
    const [firstFilter, setFirstFilter] = useState();
    
    useEffect(() => {
        const getCurrentUser = async () => {
            const authUser = await Auth.currentAuthenticatedUser(); 
            const dbUsers = await DataStore.query(User, x => x.sub('eq', authUser.attributes.sub));
            const dbUserID = dbUsers[0].id;

            const comments = await DataStore.query(ProfileLinks, c => c.user2ID('eq', dbUserID));
            console.log(comments);
            
            if (!dbUsers || dbUsers.length === 0) {
                return;
            } 

            const dbUser = dbUsers[0];
            setUser(dbUser);
            setUsername(authUser.username);
            setPic(dbUser.image);
        };
        getCurrentUser();
    
        const secondFilter = async () => {
            const pIdGroups = {}
            const dbPlatform = await DataStore.query(Platform);
            for (let a=0; a < Object.keys(firstFilter).length; a++) {
                let userLink = firstFilter[a];
                let platformId = userLink.platformID;
                for (let b=0; b < dbPlatform.length; b++){
                    let pInfo = dbPlatform[b];
                    let pType = pInfo.type;
                    let pID = dbPlatform[b].id;
                    if (platformId === pID) {
                        if (pIdGroups.hasOwnProperty(pType)) {
                            pIdGroups[pType].push(userLink);
                        } else {
                            pIdGroups[pType] = [userLink];
                        }
                    } 
                }
            }
            setUserLinks(pIdGroups);
        }
        secondFilter();
    }, []);

    const goSettings = () => navigation.navigate('SettingsStackScreen')
    const goAddLink = () => navigation.navigate('AddLinkScreen')
    const goEditProfile = () => navigation.navigate('EditProfileScreen')

    return (
        <View style={styles.background}>
            <View style={styles.headerAdjustment} >
                <PersonalHeader />
            </View>
            <SectionList
                sections={[
                    { title: 'Music', data: userLinks.MUSIC},
                    { title: 'Socials', data: userLinks.SOCIAL},
                    { title: 'Payments', data: userLinks.PAYMENTS},
                ]}
                renderItem={({ item }) => (
                    <View style={styles.fingersCrossed}>
                        <Text style={styles.innertext}>
                            {item}
                        </Text>
                    </View>
                )}
                renderSectionHeader={({ section }) => (
                    <View style={styles.fingersCrossed}>
                        <Text style={styles.text}>
                            {section.title}
                        </Text>
                    </View>
                )}
            />
            <View style={{flex: 1}}>
                <ProfileNamePic 
                    username={username}
                    profilePic={pic}
                />
                <View style={styles.profButtonContainer}>
                    <TouchableOpacity onPress={goEditProfile}>
                        <ProfileButton>Edit Profile</ProfileButton>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        Linking.openURL('https://www.TJAofficial.com');
                        }}
                    >
                        <ProfileButton>Preview</ProfileButton>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={goSettings}>
                        <ProfileButton>Account Settings</ProfileButton>
                    </TouchableOpacity>
                </View>
                <View style={styles.sectionLink}>
                    <CustomButton 
                        text='+Add'
                        onPress={goAddLink}
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
    headerAdjustment:{
        height: 135,
        width: '100%',
    },
    profilePicContainer: {
        alignItems: 'center',
        width: "100%",
        height: 250,
    },
    profileName: {
        color: 'white',
        fontSize: 40,
    },
    profPic: {
        resizeMode: "contain",
        width: 200,
        height: 200,
    },
    changePicIcon: {
        opacity: 0.7,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
    },
    changePicContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    profButtonContainer: {
        alignItems: 'center',
    },
    sectionContainer: {
        flex: 1,
    },
    sectionHeader: {
        width: '100%',
        alignItems: 'center',
        marginTop: 5,
    },
    sectionName: {
        color: '#B0B0B0',
    },
    sectionLink: {
        flex: 1,
        alignItems: 'center',
        marginBottom: 10,
    },
    bodyContianer: {
        flex: 1,
        marginBottom: -20,
    },
    text: {
        color: 'white',
        fontSize: 30,
        alignItems: 'center',
        backgroundColor:'red'
    },
    fingersCrossed: {
        flex:1,

    },
    innertext: {
        color: 'white',
        fontSize: 30,
        textAlign: 'right',
        backgroundColor:'red'
    }
})
export default HomeScreen;










<View style={{flex:1}}>
                {dataQuery ? <SectionList
                    sections={[
                        { title: 'Music', data: userLinks.MUSIC},
                        { title: 'Socials', data: userLinks.SOCIAL},
                        { title: 'Payments', data: userLinks.PAYMENTS},
                    ]}
                    renderItem={({ item }) => (
                        <View style={styles.fingersCrossed}>
                            <Text style={styles.innertext}>
                                {item.platformNAME}
                            </Text>
                        </View>
                    )}
                    renderSectionHeader={({ section }) => (
                        <View style={styles.fingersCrossed}>
                            <Text style={styles.text}>
                                {section.title}
                            </Text>
                        </View>
                    )}
                />
                :  <ActivityIndicator /> }
            </View>






<View style={styles.changePicContainer}>
                        <Icon name='camera' size={40} color='white' style={styles.changePicIcon}/>
                    </View>