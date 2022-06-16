import React, {useState} from 'react';
import { Alert, View, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { Header, CustomButton } from '../../../components';

const AddEventNewVenue = ({navigation}) => {
    const [venueName, setVenueName] = useState('');
    const [venueAddress, setVenueAddress] = useState('');
    const [venueCap, setVenueCap] = useState('');

    const isValid = () => {
        return venueName && venueAddress;
    };

    const save = async () => {
        if (!isValid()) {
            return;
        }
        
        const newVenue = new Venue({
            name: venueName,
            address: venueAddress,
            capacity: parseInt(venueCap),
        });

        await DataStore.save(newVenue);
    
        Alert.alert('New Venue Saved Successfully');
        navigation.navigate('AddEventTicket');
        
    };

    return (
        <View style={styles.background}>
            <Header text='Add New Venue' />
                <SafeAreaView style={styles.bodyContianer}>
                    <View style={styles.infoInputContainer}>
                        <TextInput  
                            style={styles.input}
                            name='venueName'
                            placeholder="Venue Name" 
                            value={venueName}
                            onChangeText={setVenueName}
                            rules={{
                                required: 'Event Name is required',
                                maxLength: {value: 30, message: 'Too many characters'},
                                minLength: {value: 3, message: 'Not enough characters'},
                            }} 
                        />
                        <TextInput  
                            style={styles.input}
                            name='address'
                            placeholder="Address" 
                            value={venueAddress}
                            onChangeText={setVenueAddress}
                            rules={{
                                required: 'Address is required',
                            }} 
                        />
                        <TextInput  
                            style={styles.input}
                            keyboardType='numeric'
                            name='capacity'
                            placeholder="Capacity" 
                            value={venueCap}
                            onChangeText={setVenueCap}
                            rules={{
                                maxLength: {value: 7, message: 'Too many characters'},
                                minLength: {value: 1, message: 'Not enough characters'},
                            }} 
                        />
                        <CustomButton 
                            text="Next" 
                            onPress={save}
                            type="Primary"
                        />
                    </View>
                </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'black',
    },
    bodyContianer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
    infoInputContainer: {
        width: '100%',
        alignItems: 'center',
    },
    DatePickerContainer: {
        width: '70%',
    },
    input: {
        height: 40,
        width: 300,
        backgroundColor: 'gray',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginVertical: 5,
    },
})

export default AddEventNewVenue;