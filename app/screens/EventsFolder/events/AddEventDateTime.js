import React, { useState } from 'react';
import { Alert, View, StyleSheet, Text, Button, SafeAreaView } from 'react-native';
import { CustomButton, Header } from '../../../components';
import DateTimePickerModal from "react-native-modal-datetime-picker";
//import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/core';

const AddEventDateTime = ({navigation}) => {
    const route = useRoute();
    const prevEventDetails = route.params.prevEventDetails
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [isTimePickerVisible, setTimePickerVisibility] = useState(false);
    const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);


    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleDateConfirm = (date) => {
        const dateForm = String(date).substring(0,15);

        if (prevEventDetails.hasOwnProperty('date')) {
            delete prevEventDetails.date;
            prevEventDetails['date'] = formatDate(dateForm);
        } else {
            prevEventDetails['date'] = formatDate(dateForm);
        }
        console.log(prevEventDetails);
        hideDatePicker();
    };

    const showTimePicker = () => {
        setTimePickerVisibility(true);
    };

    const hideTimePicker = () => {
        setTimePickerVisibility(false);
    };

    const handleTimeConfirm = (time) => {
        const startTimeForm = String(time).substring(16,24) + '.000';
        if (prevEventDetails.hasOwnProperty('startTime')) {
            delete prevEventDetails.startTime;
            prevEventDetails['startTime'] = startTimeForm;
        } else {
            prevEventDetails['startTime'] = startTimeForm;
        }
        console.log(prevEventDetails);
        hideTimePicker();
    };
    
    //END TIME
    const showEndTimePicker = () => {
        setEndTimePickerVisibility(true);
    };

    const hideEndTimePicker = () => {
        setEndTimePickerVisibility(false);
    };

    const handleEndTimeConfirm = (endtime) => {
        const endTimeForm = String(endtime).substring(16,24) + '.000';
        if (prevEventDetails.hasOwnProperty('endTime')) {
            delete prevEventDetails.endTime;
            prevEventDetails['endTime'] = endTimeForm;
        } else {
            prevEventDetails['endTime'] = endTimeForm;
        }
        console.log(prevEventDetails);
        hideEndTimePicker();
    };
    
    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const save = async () => {
        navigation.navigate('AddEventTicket', {prevEventDetails: prevEventDetails});
        //Alert.alert('Date & Time Submitted');
    };


    return (
        <View style={styles.background}>
            <Header
                text='Add Date/Time'
            />
            <SafeAreaView style={styles.bodyContianer}>
                <View style={styles.DatePickerContainer}>
                    <View style={styles.holder}>
                        <View style={{alignItems: 'center'}}>
                            <Button title="Select Event Date" onPress={showDatePicker} />
                            <DateTimePickerModal
                                isVisible={isDatePickerVisible}
                                mode="date"
                                onConfirm={handleDateConfirm}
                                onCancel={hideDatePicker}
                                display='inline'
                                isDarkModeEnabled={true}
                            />
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Button title="Select Start Time" onPress={showTimePicker} />
                            <DateTimePickerModal
                                isVisible={isTimePickerVisible}
                                mode="time"
                                onConfirm={handleTimeConfirm}
                                onCancel={hideTimePicker}
                                isDarkModeEnabled={true}
                            />
                        </View>
                        <View style={{alignItems: 'center'}}>
                            <Button title="Select End Time" onPress={showEndTimePicker} />
                            <DateTimePickerModal
                                isVisible={isEndTimePickerVisible}
                                mode="time"
                                onConfirm={handleEndTimeConfirm}
                                onCancel={hideEndTimePicker}
                                isDarkModeEnabled={true}
                            />
                        </View>
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
    headerAdjustment:{
        height: 183,
        width: '100%',
    },
    titlePosition:{
        width: '100%',
        
    },
    titleText: {
        fontSize: 50,
        marginLeft: 20,
        color: '#B0B0B0',
    },
    bodyContianer: {
        justifyContent: 'center',
        flex: 1,
    },
    DatePickerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    holder: {
        justifyContent: 'center',
    }
})

export default AddEventDateTime;