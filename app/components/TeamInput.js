import React, {useEffect, useState} from 'react';
import { Alert, View, StyleSheet, Text, TextInput, Pressable } from 'react-native';
import { Auth, DataStore } from 'aws-amplify';
import { Event } from '../models';
import { useRoute } from '@react-navigation/core';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';
import { sendEmail } from '../../email_send';

const TeamInput = () => {
    const navigation = useNavigation();
    const [dataQuery, setDataQuery] = useState(false);
    const route = useRoute();
    const eventTitle = route.params.eventTitle; 
    const prevEventDetails = route.params.prevEventDetails;
    const changeForm = false;
    const [teamList, setTeamList] = useState([{ sellerName: '', email: ''}]);
    const [event, setEvent] = useState('');
    const today = String(new Date()).substring(4,15)
    

    

    useEffect(() => {
        if(route.params) {
            console.log('update: Refreshed and Ready to add new team member');
        }

        const getEvent = async () => {
            const dbEvent = await DataStore.query(Event, c => 
                c.title('eq', eventTitle).active('eq', true)    
            );
            setEvent(dbEvent[0]);
            setDataQuery(true);
        }
        getEvent();
    }, [route.params])

    const handleSellerAdd = () =>{
        setTeamList([...teamList, { sellerName: '', email: ''}])
    }
    const handleSellerRemove = (index) =>{
        const list = [...teamList];
        list.splice(index, 1);
        setTeamList(list);
    }

    const handleSellerChange = (text, index) => {
        const list = [...teamList];
        list[index]['sellerName'] = text;
        setTeamList(list);
    }
    const handleEmailChange = (text, index) => {
        const list = [...teamList];
        list[index]['email'] = text;
        setTeamList(list);
    }
    
    
    

    const save = async () => {
        const authUser = await Auth.currentAuthenticatedUser();
        
        const makeid = () => {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            
            for (var i = 0; i < 8; i++)
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            
            return text;
        }

        const random = makeid();

        const teamData = []
        for( let i=0; i < teamList.length; i++ ) {
            let seller = teamList[i];
            const name = seller.sellerName.text;
            const email = seller.email.text.toLowerCase();
            teamData.push(
                {'members':
                    {'name': name, 'email': email,'sub': null, 'sold': 0, active: false, today: null, todaySold: 0}
                }
            );
            sendEmail(String(email), String(name), random);
        }

        if (prevEventDetails.id) {
            const updatedEvent = Event.copyOf(prevEventDetails, updated => {
                updated.team = JSON.stringify(teamData);
                updated.code = random;
            });
            await DataStore.save(updatedEvent);
            Alert.alert('New Team Added to Event');
            navigation.navigate('EventsScreen', {changeForm: true});
        } else {
            const newEvent = new Event({
                sub: authUser.attributes.sub,
                title: prevEventDetails.title,
                date: prevEventDetails.date,
                startTime: prevEventDetails.startTime,
                endTime: prevEventDetails.endTime,
                ticketPrice: parseInt(prevEventDetails.ticketPrice),
                venueNAME: prevEventDetails.venue.name,
                image: 'https://picsum.photos/200/300',
                ticketsSold: 0,
                active: true,
                team: JSON.stringify(teamData),
                code: random,
            });
            await DataStore.save(newEvent);
            Alert.alert('Added New Event and Team');
            navigation.navigate('EventsScreen', {changeForm: true});
        }
    }

    return (
        <View style={{flex:1}}>
            {teamList.map ((seller, index) => (
                <View key={index} style={{flex:1}}>
                    <View style={{backgroundColor: '#4B4B4B', borderRadius: 20, padding: 10, marginVertical: 5, }}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{flex:1, color:'white', fontSize: 15, fontWeight: '500'}}>Member 1</Text>
                            {teamList.length > 1 && <Pressable 
                                style={{flex:1, alignItems:'flex-end',}}
                                onPress={() => handleSellerRemove(index)}
                            >
                                <Text style={{color: 'white', fontWeight: '200'}}>Remove</Text>
                            </Pressable>}
                            
                        </View>
                        <TextInput 
                            style={styles.input} 
                            placeholder='Member Name...' 
                            value={seller.sellerName} 
                            onChangeText={(text) => handleSellerChange({text}, index)}
                            placeholderTextColor='#CACACA'
                            rules={{
                                required: 'Teammate Name is required',
                                maxLength: {value: 20, message: 'Too many characters'},
                                minLength: {value: 1, message: 'Not enough characters'},
                            }} 
                        />
                        <TextInput 
                            style={styles.input} 
                            placeholder='Email...' 
                            value={seller.email} 
                            onChangeText={(text) => handleEmailChange({text}, index)}
                            placeholderTextColor='#CACACA'
                            rules={{
                                required: 'Teammate Email is required',
                                maxLength: {value: 30, message: 'Too many characters'},
                                minLength: {value: 7, message: 'Not enough characters'},
                            }} 
                        />
                    </View> 
                    {teamList.length - 1 === index && teamList.length < 4 && <View style={{flex:1}}><CustomButton 
                        text="Add Team Member" 
                        onPress={handleSellerAdd}
                        type="Primary"
                    /><CustomButton 
                        text="Save Team" 
                        onPress={save}
                        type="Primary"
                    />
                    </View>}
                </View>
            ))} 
            
        </View>   
    );
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        width: 250,
        backgroundColor: 'gray',
        borderRadius: 12,
        paddingHorizontal: 12,
        marginVertical: 5,
    },
})

export default TeamInput;