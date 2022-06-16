import { useRoute } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { Pressable, Alert, StyleSheet, Text, TextInput, View } from 'react-native';
import { Header, CustomButton } from '../../../components';
import { ProfileLinks, User } from '../../../models';
import { Auth, DataStore } from 'aws-amplify';
import Icon1 from 'react-native-vector-icons/AntDesign';

const UserLinkDetailScreen = ({navigation}) => {
    const route = useRoute();
    const platformNameData = route.params.title;
    const linkIDData = route.params.linkID;

    const [link, setLink] = useState('');
    const [logo, setLogo] = useState();
    const [platformName, setPlatformName] = useState(platformNameData);
    const [linkID, setLinkID] = useState(linkIDData);
    const [pro, setPro] = useState();
    const [customTitle, setCustomTitle] = useState('');
    const [entry, setEntry] = useState();

    const goHome = () => navigation.navigate('HomeScreen',{changeForm: true});

    useEffect(() => {
        const getLinkData = async () => {
            const authUser = await Auth.currentAuthenticatedUser(); 
            const dbUsers = await DataStore.query(User, x => x.sub('eq', authUser.attributes.sub));
            const linkQuery = await DataStore.query(ProfileLinks, x => x.id('eq', linkIDData));
            if (linkQuery.length === 0) {
                return;
            } 
            const specificLink = linkQuery[0]
            
            setLink(specificLink.link);
            setEntry(specificLink);
            setLogo(specificLink.platformLOGO);
            setCustomTitle(specificLink.customTitle);
            setPro(dbUsers[0].PRO);

        }
        getLinkData();
    }, []);

    const isValid = () => {
        return link;
    }

    const save = async () => {
        if (!isValid()) {
            return;
        }
        
        const updatedLink = ProfileLinks.copyOf(entry, updated => {
            updated.link = link;
            updated.customTitle = customTitle;
        });

        await DataStore.save(updatedLink);
        
        Alert.alert("You've Updated Your " + platformName + " Link");
        goHome();
    };

    const deleteLink = () => {
        DataStore.delete(entry);
        goHome();
    }
    
    return (
        <View style={styles.background}>
            <Header text='Edit Link' adjustment={183} />
            <View style={styles.Container}>
                <View style={styles.bodyContianer}>
                    <Text style={{ color:'white', fontSize: 20 }}>
                        Enter {platformName} Link:
                    </Text>
                    <TextInput 
                        style={styles.input} 
                        placeholderTextColor='#CACACA'
                        value={link}
                        onChangeText={setLink}
                    />
                    {pro ? <View><Text style={{ color:'white', fontSize: 20 }}>
                        Enter Custom Name:
                    </Text>
                    <TextInput 
                        style={styles.input} 
                        placeholderTextColor='#CACACA'
                        placeholder='John Doe...'
                        value={customTitle}
                        onChangeText={setCustomTitle}
                    /></View>
                    : <></> }
                    <CustomButton 
                        text='Save'
                        onPress={save}
                    />
                    <CustomButton 
                        text='Cancel'
                        onPress={() => navigation.navigate('HomeScreen')}
                    />
                    <Pressable style={styles.deleteContainer} onPress={deleteLink}>
                        <Icon1 name='delete' size={20} color='red' style={styles.changePicIcon}/>
                        <Text style={{color: 'red'}}> Delete</Text>
                    </Pressable>
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
        flex: 1,
        justifyContent: 'center',
        marginTop: 50,
    },
    input: {
        height: 40,
        width: 300,
        backgroundColor: 'gray',
        borderRadius: 12,
        paddingHorizontal: 12,
    },
    deleteContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 60
    },
    Container: {
        flex: 1,
        justifyContent: 'center'
    },
})
export default UserLinkDetailScreen;