import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { StyleSheet, Image, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProfileNamePic = ({ username, profilePic }) => {
    const navigation = useNavigation();
    const goEdit = async () => {
        navigation.navigate('EditProfileScreen');
    }
    //console.log(profilePic);
    return (
        <View style={styles.profilePicContainer}>
            <Text style={styles.profileName}>
                {username}
            </Text>
            <TouchableOpacity style={{flex: 1,}} onPress={goEdit}>
                <View style={{flex:1}}>
                    <Image 
                        style={styles.profPic}
                        imageStyle={{borderRadius: 100}}
                        source={profilePic ? { uri: profilePic } : require('../assets/blankProfilePicture.png') }
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    profilePicContainer: {
        alignItems: 'center',
        flex: 1,
    },
    profileName: {
        color: 'white',
        fontSize: 40,
    },
    profPic: {
        width: 300,
        height: 300,
        borderRadius: 100,
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
})
export default ProfileNamePic;