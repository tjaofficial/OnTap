import React, { useState } from 'react';
import { View, StyleSheet, Button, Image } from 'react-native';
import { Header, CustomButton } from '../../../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/core';
import * as ImagePicker from 'expo-image-picker';



const AddEventCover = ({navigation}) => {
    const route = useRoute();
    const prevEventDetails = route.params.prevEventDetails;
    const [image, setImage] = useState(null);

    const save = async () => {
        //if (!isValid()) {
        //    return;
        //}MKAE SURE YOU CHANGE THIS MAKE SURE YOU CHANGE THIS MAKE SURE YOU CHANGE THIS
        prevEventDetails['image'] = 'https://picsum.photos/200/300';
        console.log(prevEventDetails);
        navigation.navigate('AddEventConfirmation', {prevEventDetails: prevEventDetails, file: image});
    };

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
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
                name: prevEventDetails.title + '_cover.png',
                type: 'image/png',
            }
            setImage(file);
        }
    }

    return (
        <View style={styles.background}>
            <Header text='Add Event Cover' />
            <SafeAreaView style={styles.bodyContianer}>
                <View style={styles.showContainer}>
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Button title="Pick an image from camera roll" onPress={pickImage} />
                        {image && <Image source={{ uri: image.uri }} style={{ width: 200, height: 200 }} />}
                    </View>
                    <CustomButton 
                        text="Next" 
                        onPress={save}
                        type="Primary"
                    />
                </View>
            </SafeAreaView>
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
    },
    showContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default AddEventCover;