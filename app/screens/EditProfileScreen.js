import React, {useState, useEffect} from 'react';
import { View, ScrollView, StyleSheet, Text, TextInput, Alert, Image, Pressable, TouchableOpacity } from 'react-native';
import { Header, CustomButton } from '../components';
import {Auth, DataStore, Storage} from 'aws-amplify';
import { User } from '../models/';
import * as ImagePicker from 'expo-image-picker';
import { v4 as uuidv4 } from 'uuid';

const EditProfileScreen = ({navigation}) => {
    const [user, setUser] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [location, setLocation] = useState('');
    const [profileLink, setProfileLink] = useState('');
    const [value, setValue] = useState('checking value...');
    const [image, setImage] = useState(null);
    const [dataQuery2, setDataQuery2] = useState(false);
    const [coverKey, setCoverKey] = useState(null);
    const [coverUri, setCoverUri] = useState('');

    const goAddLink = () => navigation.navigate('AddLinkScreen')

    useEffect(() => {
        let isMounted = true;

        const getCurrentUser = async () => {
            const user = await Auth.currentAuthenticatedUser(); 
            const dbUsers = (await DataStore.query(User)).filter(x => x.sub === user.attributes.sub);
            if (dbUsers.length === 0) {
                return;
            } 
            const dbUser = dbUsers[0];
            setUser(dbUser);

            setFirstName(dbUser.firstName);
            setLastName(dbUser.lastName);
            setProfileLink(dbUser.profileLink);
            setBio(dbUser.bio);
            setLocation(dbUser.location);
        };
        getCurrentUser();

        getCurrentUser().then(() => {
            if(isMounted) {
                setValue('done!');
            }
        });
        return () => {
            isMounted = false;
        }
    }, [])


    const isValid = () => {
        return firstName && lastName && profileLink && bio && location;
    }

    const save = async () => {
        uploadToStorage(image.uri);
        if (dataQuery2){
            if (!isValid()) {
                return;
            }
            const parseCover = async (x) => {
                const response = await Storage.get(x);
                setCoverUri(response.toString());
            }
            parseCover(coverKey);
            if (user) {
                const updatedUser = User.copyOf(user, updated => {
                    updated.firstName = firstName;
                    updated.lastName = lastName;
                    updated.profileLink = profileLink;
                    updated.bio = bio;
                    updated.location = location;
                    updated.image = coverUri;
                });
                await DataStore.save(updatedUser);
            } else {
                const authUser = await Auth.currentAuthenticatedUser();

                const newUser = new User({
                    sub: authUser.attributes.sub,
                    firstName,
                    lastName,
                    profileLink,
                    bio,
                    location,
                    image: coverUri,
                });

                await DataStore.save(newUser);
            }

            Alert.alert('User Saved Successfully')
            navigation.navigate('HomeScreen', {changeForm: true});
        }
    };

        
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            const file = {
                uri: result.uri,
                name: user.id + '_profile.png',
                type: 'image/png',
            }
            setImage(file);
        }
    }

    const uploadToStorage = async (imagePath) => {
        try {
            const response = await fetch(imagePath);
            
            const blob = await response.blob();

            const filename = uuidv4() + '.png';
            const s3Response = await Storage.put(filename, blob);

            setCoverKey(s3Response.key);
            setDataQuery2(true);
        } catch(e) {
            console.error(e);
        }
    }
    return (
        <View style={styles.background}>
            <Header text='Edit Profile' />
            <ScrollView>
                <View style={styles.bodyContianer}>
                    <TouchableOpacity style={{flex:1}} onPress={pickImage}>
                        {image ? <Image source={{ uri: image.uri }} style={styles.picture} /> 
                        : 
                        <Image 
                            source={user.image ? {uri: user.image} : require('../assets/blankProfilePicture.png') }
                            style={styles.picture}
                        /> }
                    </TouchableOpacity>
                    <Pressable onPress={pickImage}>
                        <Text style={{color:'white'}}>
                            Change Image
                        </Text>
                    </Pressable>
                    <TextInput 
                        style={styles.input} 
                        placeholder='First Name...' 
                        value={firstName} 
                        onChangeText={setFirstName}
                        placeholderTextColor='#CACACA'
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder='Last Name...' 
                        value={lastName} 
                        onChangeText={setLastName}
                        placeholderTextColor='#CACACA'
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder='Bio...' 
                        value={bio} 
                        multiline
                        numberOfLines={3}
                        onChangeText={setBio}
                        placeholderTextColor='#CACACA'
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder='City,State...' 
                        value={location}
                        onChangeText={setLocation}
                        placeholderTextColor='#CACACA'
                    />
                    <TextInput 
                        style={styles.input} 
                        placeholder='Custom URL...' 
                        value={profileLink}
                        onChangeText={setProfileLink}
                        placeholderTextColor='#CACACA'
                    />
                    <CustomButton 
                        text='Save Profile'
                        onPress={save}
                    />
                    <CustomButton 
                        text='+ Add Link'
                        onPress={goAddLink}
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
    input: {
        height: 40,
        width: 300,
        backgroundColor: 'gray',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginVertical: 5,
    },
    picture: {
        width: 300,
        height: 300,
        borderRadius: 100,
    },
})

export default EditProfileScreen;