import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { Auth, DataStore } from 'aws-amplify';
import { Event } from '../../models';
import { Header } from '../../components';

function AnalyticsListScreen({navigation}) {
    const [dataQuery, setDataQuery] = useState(false);
    const [events, setEvents] = useState();
    const [sub, setSub] = useState();

    useEffect(() => {
        const getEvents = async () => {
            const dbAuth = await Auth.currentAuthenticatedUser();
            const dbEvents = await DataStore.query(Event, c => c.sub('eq', dbAuth.attributes.sub));
            setEvents(dbEvents);
            setSub(dbAuth.attributes.sub);
            setDataQuery(true);
        }
        getEvents();
    }, [])

    return (
        <View style={styles.background}>
            <Header text='Event Analytics' />
            <ScrollView style={{flex:1}}>
                {dataQuery ? <View style={styles.bodyContianer}>
                    {events.map ((item) =>{
                        return <View key={item.id} style={{flex:1, alignItems:'center', marginVertical: 5}}>
                                    <TouchableOpacity 
                                        style={styles.dataContainer}
                                        onPress={() => navigation.navigate('AnalyticsScreen', {event: item})}
                                    >
                                        <Text style={styles.dataHeader}>{item.title}</Text>
                                    </TouchableOpacity>
                                </View>
                    })}
                </View> : <ActivityIndicator /> }
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
    dataContainer: {
        backgroundColor: 'gray',
        width: '90%',
        borderRadius: 20,
        padding: 15
    },
    dataHeader: {
        fontSize: 25,
        fontWeight: '700',
    },
    tableHeaderCont: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        marginHorizontal: 10,
    }, 
})

export default AnalyticsListScreen;