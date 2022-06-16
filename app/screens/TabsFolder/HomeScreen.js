import { RefreshControl, Linking, ScrollView, View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Switch } from "react-native";
import React, {useState, useEffect} from 'react';
import { Auth, DataStore, Hub, Predicates } from "aws-amplify";
import { Platform, ProfileLinks, User } from '../../models';
import { Header, CustomButton, ProfileNamePic, HomeLinkGroups2, ProfileButton } from "../../components";
import { useRoute } from '@react-navigation/core';
import awsConfig from '../../aws-exports';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen = ({ navigation }) => {
    const [user, setUser] = useState();
    const [userLinks, setUserLinks] = useState();
    const [username, setUsername] = useState('');
    const [pic, setPic] = useState();
    const [dataQuery, setDataQuery] = useState(false);
    const route = useRoute();
    const changeForm = false;
    const [formFileds, setFormFields] =useState(changeForm);
    const [isOrgEnabled, setIsOrgEnabled] = useState(false);
    const toggleOrgSwitch = () => setIsOrgEnabled(previousState => !previousState);
    const [isDirectEnabled, setIsDirectEnabled] = useState(false);
    const toggleDirectSwitch = () => setIsDirectEnabled(previousState => !previousState);
    const [pro, setPro] = useState();
    const [refreshing, setRefreshing] = React.useState(false);
   

    

    useEffect(() => {
        if(route.params) {
            console.log('update: link added to home page');
        }
        
        
        // Create listener that will stop observing the model once the sync process is done
        const removeListener = Hub.listen("datastore", async (capsule) => {
            const {
            payload: { event, data },
            } = capsule;
    
            //console.log("DataStore event", event, data);
    
            if (event === "ready") {
                const getCurrentUser = async () => {
                    const authUser = await Auth.currentAuthenticatedUser(); 
                    const dbUsers = await DataStore.query(User, x => x.sub('eq', authUser.attributes.sub), {
                        page: 0,
                        limit: 15,
                    });
                    const dbUserID = dbUsers[0].id;
                    //console.log(dbUserID + "<--------THIS ONE RIGHT HERE");
                    const comments = await DataStore.query(ProfileLinks, c => c.user2ID('eq', dbUserID), {
                        page: 0,
                        limit: 15,
                    });
                    secondFilter(comments);
        
                    if (!dbUsers || dbUsers.length === 0) {
                        return;
                    }
                    const dbUser = dbUsers[0];

                    setUser(dbUser);
                    if (dbUser.image) {
                        setPic(dbUser.image);
                    }
                    
                    setPro(dbUser.PRO);
                    setUsername(authUser.username);
                    
                };
                getCurrentUser();
            }
        });
    

        const secondFilter = async (x) => {
            const pIdGroups = {}
            const dbPlatform = await DataStore.query(Platform);
            x.forEach(userLink => {
                let platformId = userLink.platformID;
                dbPlatform.forEach(pInfo => {
                    let pType = pInfo.type;
                    let pID = pInfo.id;
                    if (platformId === pID && pIdGroups.hasOwnProperty(pType)) {
                        pIdGroups[pType].push(userLink);
                    } else if (platformId === pID && !pIdGroups.hasOwnProperty(pType)) {
                        pIdGroups[pType] = [userLink];
                    }
                })
            })
            setUserLinks(pIdGroups);
            setDataQuery(true);
        }

        // Start the DataStore, this kicks-off the sync process.
        DataStore.start();
    
        return () => {
            removeListener();
        };
    }, [route.params]);

    const goSettings = () => navigation.navigate('SettingsStackScreen')
    const goAddLink = () => navigation.navigate('AddLinkScreen')
    const goEditProfile = () => navigation.navigate('EditProfileScreen')

    //Refresh pull down
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
      }, []);

    return (
        <View style={styles.background}>
            <Header adjustment={120} pro={pro} />
            <ScrollView 
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        tintColor='white'
                    />
                }
            >
                {dataQuery ? <View style={{flex:1}}>
                    <View style={{flex: 1 }}>
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
                            <View style={styles.booleanCont}>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{color: 'white', marginRight: 5, fontSize: 17}}>Organized</Text>
                                    <Switch
                                        trackColor={{ false: '#6B6B6B', true: '#ffffff' }}
                                        thumbColor={isOrgEnabled ? '#A4ADB3' : '#000000'}
                                        ios_backgroundColor="#6B6B6B"
                                        onValueChange={toggleOrgSwitch}
                                        value={isOrgEnabled}
                                    />
                                </View>
                                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'  }}>
                                    <Text style={{color: 'white', marginRight: 5, fontSize: 17}}>Direct</Text>
                                    <Switch
                                        trackColor={{ false: '#6B6B6B', true: '#ffffff' }}
                                        thumbColor={isDirectEnabled ? '#A4ADB3' : '#000000'}
                                        ios_backgroundColor="#6B6B6B"
                                        onValueChange={toggleDirectSwitch}
                                        value={isDirectEnabled}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={{flex:1}}>
                            <View style={styles.bodyContianer}>
                                {userLinks.MUSIC ?<HomeLinkGroups2 
                                    group={userLinks.MUSIC}
                                    title='Music'
                                /> : <Text></Text>}
                                {userLinks.SOCIAL ?<HomeLinkGroups2 
                                    group={userLinks.SOCIAL}
                                    title='Socials'
                                /> : <Text></Text>}
                                {userLinks.PAYMENTS ?<HomeLinkGroups2 
                                    group={userLinks.PAYMENTS}
                                    title='Payments'
                                /> : <Text></Text>}
                                {userLinks.CONTACTS ? <HomeLinkGroups2 
                                    group={userLinks.CONTACTS}
                                    title='Contacts'
                                /> : <Text></Text>}
                                {userLinks.MORE ? <HomeLinkGroups2 
                                    group={userLinks.MORE}
                                    title='More...'
                                /> : <Text></Text>}
                            </View>
                        <View style={styles.sectionLink}>
                            <CustomButton 
                                text='+Add'
                                onPress={goAddLink}
                            />
                        </View>
                    </View>
                </View>
                 :  <View style={{flex:1, alignItems: 'center', justifyContent: 'center'}}><Text> <ActivityIndicator /></Text></View> }
            </ScrollView>
        </View>
        
    );
}
//https://static.wixstatic.com/media/71123f_393bf2fe626e401da24edcc3585e59c3~mv2.jpg/v1/fill/w_505,h_751,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/DSC02145.jpg
const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'black',
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
    },
    fingersCrossed: {
        flex:1,

    },
    innertext: {
        color: 'white',
        fontSize: 30,
        textAlign: 'right',
    },
    booleanCont: {
        flex:1, 
        flexDirection: 'row', 
        marginTop: 10,
        width: '80%'
    },
})
export default HomeScreen;