import React, { useEffect, useState } from 'react';
import { Alert, View, ScrollView, StyleSheet, Text, TextInput } from 'react-native';
import { Header, CustomButton } from '../../../components';
import { useRoute } from '@react-navigation/core';
import {Auth, DataStore} from 'aws-amplify';
import { Platform, User, ProfileLinks } from '../../../models';

const AddLinkDetailsScreen = ({navigation}) => {
    const route = useRoute();
    const [url, setUrl] = useState(route.params.link);
    const text = route.params.text;
    const logo = route.params.logo;
    const type = route.params.type;
    const color = route.params.color;
    const [user, setUser] = useState();
    const [link, setLink] = useState(url);
    const [platform, setPlatform] = useState('');
    const [item, setItem] = useState();
    const [title, setTitle] = useState('');
    const [pro, setPro] = useState();

    const goPro = () => navigation.navigate('OnTapProScreen');

    const goHome = () => {
        navigation.navigate('HomeScreen',{changeForm: true});
    }

    useEffect(() => {
        const getCurrentUser = async () => {
            const authUser = await Auth.currentAuthenticatedUser(); 
            const dbUsers = await DataStore.query(User, x => x.sub('eq', authUser.attributes.sub));
            if (!dbUsers || dbUsers.length === 0) {
                return;
            } 
            const dbUser = dbUsers[0];
            setUser(dbUser);
            setPro(dbUsers[0].PRO);
        };
        getCurrentUser();

        const getPlatform = async () => {
            const platformArray = await DataStore.query(Platform, c => c.title('eq', text));

            if (!platformArray || platformArray.length === 0) {
                return;
            } 

            const platform = platformArray[0];
            setPlatform(platform);
        }
        getPlatform();
    }, [])

    const isValid = () => {
        return link;
    }

    const save = async () => {
        if (!isValid()) {
            return;
        }
        const newLink = new ProfileLinks({
            link: String(link),
            customTitle: title,
            user2ID: user.id,
            platformID: platform.id,
            platformNAME: text,
            platformLOGO: logo,
            platformTYPE: type,
            platformColor: color,
        });

        await DataStore.save(newLink);
        //Alert.alert('Link Saved Successfully')
        goHome();
    }; 


    return (
        <View style={styles.background}>
            <Header text='Add Details' />
            <View style={{flex: 1}}>
                <View style={styles.bodyContianer}>
                    <Text style={{ color:'white', fontSize: 20 }}>
                        Enter {text} Link:
                    </Text>
                    <TextInput 
                        style={styles.input} 
                        placeholderTextColor='#CACACA'
                        placeholder='Enter Link...'
                        value={link}
                        onChangeText={setLink}
                    />
                    {pro ? <TextInput 
                        style={styles.input} 
                        placeholderTextColor='#CACACA'
                        placeholder="Enter Custom Title..."
                        value={title}
                        onChangeText={setTitle}
                    /> : <></>}
                    <CustomButton 
                        text='Add'
                        onPress={save}
                    />
                    {pro ? <></> : <CustomButton 
                        text='Create Custom Title(PRO)'
                        onPress={goPro}
                        type='Secondary'
                    /> }
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
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -55
    },
    input: {
        height: 40,
        width: 300,
        backgroundColor: 'gray',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginBottom: 7,
    }
})

export default AddLinkDetailsScreen;