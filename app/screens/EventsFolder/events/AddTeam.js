import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/core';
import { Header, TeamInput } from '../../../components';


const AddTeam = ({navigation}) => {
    const route = useRoute();
    const prevEventDetails = route.params.prevEventDetails;

    return (
        <View style={styles.background}>
            <Header text='Add Team' />
            <ScrollView style={styles.bodyContianer}>
                <View style={styles.showContainer}>
                    <TeamInput 
                        data={prevEventDetails}
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
        flex: 1,
    },
    showContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        height: 40,
        width: 250,
        backgroundColor: 'gray',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginVertical: 5,
    },
})

export default AddTeam;