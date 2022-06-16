import React, {useState} from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Header, CustomButton } from '../../../components';

function AddEventName({navigation}) {
    const [name, setName] = useState('');
    const [eventDetails, setEventDetails] = useState();

    const isValid = () => {
        return name;
    }

    const save = async () => {
        if (!isValid()) {
            return;
        }
        if (name) {
            const newObject = {};
            newObject['title'] = name;
            console.log(newObject);
            setEventDetails(newObject);
            //Alert.alert('User Saved Successfully');
            navigation.navigate('AddEventVenue', { eventDetailsOG: newObject });

        }
    };

    return (
        <View style={styles.background}>
            <Header text='Add Event Name' />
                <View style={styles.bodyContianer}>
                    <View style={styles.infoInputContainer}>
                        <TextInput 
                            style={styles.input} 
                            placeholder='Event Name...' 
                            value={name} 
                            onChangeText={setName}
                            placeholderTextColor='#CACACA'
                            rules={{
                                required: 'Event Name is required',
                                maxLength: {value: 30, message: 'Too many characters'},
                                minLength: {value: 3, message: 'Not enough characters'},
                            }} 
                        />
                        <CustomButton 
                            text="Next" 
                            onPress={save}
                            type="Primary"
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
    bodyContianer: {
        flex: 1,
        justifyContent: 'center',
    },
    infoInputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    scroller: {
        backgroundColor: 'green', 
        justifyContent:'center',
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

export default AddEventName;