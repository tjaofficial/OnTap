import React, {useEffect, useState} from 'react';
import { View, StyleSheet, Text, SafeAreaView, Pressable, ActivityIndicator } from 'react-native';
import { Header, CustomButton } from '../../../components';
import { DataStore } from 'aws-amplify';
import { Venue } from '../../../models';
import { Picker } from '@react-native-picker/picker';
import { useRoute } from '@react-navigation/core';

const AddEventVenue = ({navigation}) => {
    const route = useRoute();
    const prevEventDetails = route.params.eventDetailsOG
    
    const goNew = () => navigation.navigate('AddEventNewVenue');

    const [array, setArray] = useState([]);
    const [venue, setVenue] = useState('hello');
    const handleValueChange = (itemValue) => setVenue(itemValue);
    const [dataQuery, setDataQuery] = useState(false);

    const [eventDetails, setEventDetails] = useState();
    
    
    

    useEffect(() => {
        const venueDisplay = async () => {
            const allVenues=[];
            const venueArray = (await DataStore.query(Venue));
            
            for (var i = 0; i < venueArray.length; i++) {
                allVenues.push(venueArray[i].name);
            }
            setArray(venueArray);
            setDataQuery(true);
        };
        venueDisplay();
        
        if(route.params){
            return;
        }
    }, [route.params]) 

    function something (item) {
        return item.map ( piece => {
                    return <Picker.Item key={piece.id} label={piece.name} value={piece.name} />
                })
        
        
    }
    const isValid = () => {
        return venue;
    };

    const save = async () => {
        if (!isValid()) {
            return;
        }
        if (venue) {
            array.map ( item => {
                if (venue === item.name) {
                    prevEventDetails['venue'] = item;
                }
            })
            console.log(prevEventDetails);
            navigation.navigate('AddEventDateTime', {prevEventDetails: prevEventDetails});
        } else {
            //goBack();
        }
    
        //Alert.alert('Venue Selected');
    };

    return (
        <View style={styles.background}>
            <Header text='Add Event Venue' />
            <SafeAreaView style={styles.bodyContianer}>
                <View style={styles.infoInputContainer}>

                        {dataQuery ? 
                            <Picker
                                style={styles.picker}
                                selectedValue={venue}
                                onValueChange={handleValueChange}>
                                   {something(array)}
                            </Picker> 
                        : <ActivityIndicator />}
                    <CustomButton 
                        text="Next" 
                        onPress={save}
                        type="Primary"
                    />
                    <Pressable onPress={goNew}>
                        <Text style={{color:'white'}}>
                            Add New Venue
                        </Text>
                    </Pressable>
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
        flex: 1,
    },
    infoInputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    picker: {
        backgroundColor: 'white',
        color: 'white',
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

export default AddEventVenue;