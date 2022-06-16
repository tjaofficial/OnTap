import React, {useState} from 'react';
import { View, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { Header, CustomButton } from '../../../components';
import { useRoute } from '@react-navigation/core';


function AddEventTicket({navigation}) {
    const [price, setPrice] = useState();
    const route = useRoute();
    const prevEventDetails = route.params.prevEventDetails;

    const isValid = () => {
        return price;
    };

    const save = async () => {
        if (!isValid()) {
            return;
        }

        prevEventDetails['ticketPrice'] = price;
        console.log(prevEventDetails);
        //Alert.alert('Ticket Price Selected');
        navigation.navigate('AddEventCover', {prevEventDetails: prevEventDetails});
    };

    return (
        <View style={styles.background}>
            <Header text='Add Tickets' />
                <SafeAreaView style={styles.bodyContianer}>
                    <View style={styles.infoInputContainer}>
                        <TextInput 
                            style={styles.input} 
                            value={price}
                            placeholder="Price Per Tickets"
                            onChangeText={setPrice}
                            keyboardType={'numeric'}
                            rules={{
                                required: 'Ticket Price is required',
                                maxLength: {value: 5},
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
    },
    infoInputContainer: {
        width: '100%',
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
})

export default AddEventTicket;