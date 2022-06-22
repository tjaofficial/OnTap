import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Text } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { AddLinkScreen, UserLinkDetailScreen, AddLinkDetailsScreen } from '../screens/EventsFolder/links';
import { AddEventCover, AddEventName, AddEventDateTime, AddEventVenue, AddEventNewVenue, AddEventTicket, AddEventConfirmation } from '../screens/EventsFolder/events';
import { BuyTicketsScreen, TicketConfirmScreen, TicketConfirmationScreen, PaymentScreen } from '../screens/EventsFolder/tickets';
import { EventsScreen, AnalyticsListScreen, AnalyticsScreen, TeamCodeScreen } from '../screens/EventsFolder';
import { SocialSyncScreen, SyncYoutube } from '../screens/HomeFolder/sync';

import HomeScreen from '../screens/TabsFolder/HomeScreen';
import InsightsScreen from '../screens/TabsFolder/InsightsScreen';
import ShareScreen from '../screens/TabsFolder/ShareScreen';
import ConnectScreen from '../screens/TabsFolder/ConnectScreen';
import SettingsScreen from '../screens/SettingsScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import AmbassadorScreen from '../screens/AmbassadorScreen';

import Icon1 from 'react-native-vector-icons/FontAwesome5';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/FontAwesome';
import Icon4 from 'react-native-vector-icons/FontAwesome';
import Icon5 from 'react-native-vector-icons/Octicons';



const SettingsStack = createStackNavigator();
const SettingsStackScreen = () => (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name='SettingsScreen' component={SettingsScreen} options={{headerShown: false,}} />
      <SettingsStack.Screen name='AmbassadorScreen' component={AmbassadorScreen} options={{headerShown: false,}} />
      <SettingsStack.Screen name='SocialSyncScreen' component={SocialSyncScreen} options={{headerShown: false,}} />
      <SettingsStack.Screen name='SyncYoutube' component={SyncYoutube} options={{headerShown: false,}} />
    </SettingsStack.Navigator>
  )

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator
    initialRouteName="HomeScreen"
  >
    <HomeStack.Screen name='HomeScreen' component={HomeScreen} options={{headerShown: false,}} />
    <HomeStack.Screen name='SettingsStackScreen' component={SettingsStackScreen} options={{headerShown: false,}} />
    <HomeStack.Screen name='AddLinkScreen' component={AddLinkScreen} options={{headerShown: false,}} />
    <HomeStack.Screen name='AddLinkDetailsScreen' component={AddLinkDetailsScreen} options={{headerShown: false,}} />
    <HomeStack.Screen name='EditProfileScreen' component={EditProfileScreen} options={{headerShown: false,}} />
    <HomeStack.Screen name='UserLinkDetailScreen' component={UserLinkDetailScreen} options={{headerShown: false,}} />
  </HomeStack.Navigator>
)

const InsightsStack = createStackNavigator();
const InsightsStackScreen = () => (
    <InsightsStack.Navigator
        initialRouteName={InsightsScreen}
    >
      <InsightsStack.Screen name='Insights' component={InsightsScreen} options={{headerShown: false,}} />
    </InsightsStack.Navigator>
  )

const EventsStack = createStackNavigator();
const EventsStackScreen = () => (
    <EventsStack.Navigator
        initialRouteName={EventsScreen}
    >
        <EventsStack.Screen name='EventsScreen' component={EventsScreen} options={{headerShown: false,}} />
        <EventsStack.Screen name='AddEventCover' component={AddEventCover} options={{headerShown: false,}} />
        <EventsStack.Screen name='AddEventName' component={AddEventName} options={{headerShown: false,}} />
        <EventsStack.Screen name='AddEventDateTime' component={AddEventDateTime} options={{headerShown: false,}} />
        <EventsStack.Screen name='AddEventVenue' component={AddEventVenue} options={{headerShown: false,}} />
        <EventsStack.Screen name='AddEventNewVenue' component={AddEventNewVenue} options={{headerShown: false,}} />
        <EventsStack.Screen name='AddEventTicket' component={AddEventTicket} options={{headerShown: false,}} />
        <EventsStack.Screen name='AddEventConfirmation' component={AddEventConfirmation} options={{headerShown: false,}} />
        <EventsStack.Screen name='AnalyticsListScreen' component={AnalyticsListScreen} options={{headerShown: false,}} />
        <EventsStack.Screen name='AnalyticsScreen' component={AnalyticsScreen} options={{headerShown: false,}} />
        <EventsStack.Screen name='BuyTicketsScreen' component={BuyTicketsScreen} options={{headerShown: false,}} />
        <EventsStack.Screen name='TicketConfirmScreen' component={TicketConfirmScreen} options={{headerShown: false,}} />
        <EventsStack.Screen name='TicketConfirmationScreen' component={TicketConfirmationScreen} options={{headerShown: false,}} />
        <EventsStack.Screen name='TeamCodeScreen' component={TeamCodeScreen} options={{headerShown: false,}} />
        <EventsStack.Screen name='PaymentScreen' component={PaymentScreen} options={{headerShown: false,}} />
    </EventsStack.Navigator>
)

const Tab = createBottomTabNavigator();
const Tabs = () => {
    const [activeScreen, setActiveScreen] = useState('HOME');

    
    return(
            <Tab.Navigator
                initialRouteName={HomeScreen}
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: 'black',
                        borderTopColor: 'white',
                        paddingTop: 10,
                    },
                    tabBarShowLabel: false,
                    headerShown: false,
                }}
            >
                <Tab.Screen name='HomeStack' component={HomeStackScreen} options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styles.IconBehave} onPress={() => setActiveScreen('HOME')}>
                            <Icon5 name='person-fill' size={25} color='white' style={styles.profileIcon}/>
                            <Text style={styles.profileText}>
                                Profile
                            </Text>
                        </View>
                    ),
                    headerShown: false,}}/>
                <Tab.Screen name='Connect' component={ConnectScreen} options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styles.IconBehave}>
                            <Icon1 name='network-wired' size={25} color='white' style={styles.connectIcon}/>
                            <Text style={styles.connectText}>
                                Connect
                            </Text>
                        </View>
                    ),
                    headerShown: false,
                }}/>
                <Tab.Screen 
                    name='EventsStack' 
                    component={EventsStackScreen} 
                    options={{
                        tabBarIcon: ({focused}) => (
                            <View style={styles.IconBehave}>
                                <Icon3 name='ticket' size={25} color='white' style={styles.ticketsIcon}/>
                                <Text style={styles.ticketsText}>
                                    Events
                                </Text>
                            </View>
                        ),
                        headerShown: false,
                    }}
                    initialParams={{changeForm: true}}   
                />
                <Tab.Screen name='InsightsStack' component={InsightsStackScreen} options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styles.IconBehave}>
                            <Icon2 name='line-graph' size={25} color='white' style={styles.insightsIcon}/>
                            <Text style={styles.insightsText}>
                                Insights
                            </Text>
                        </View>
                    ),
                    headerShown: false,}}/>
                <Tab.Screen name='Share' component={ShareScreen} options={{
                    tabBarIcon: ({focused}) => (
                        <View style={styles.IconBehave}>
                            <Icon4 name='qrcode' size={25} color='white' style={styles.shareIcon}/>
                            <Text 
                                style={styles.shareText}>
                                Share
                            </Text>
                        </View>
                    ),
                    headerShown: false,}}/>
            </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    IconBehave:{ 
        Padding: 10,
        alignItems: 'center',
    },
    connectText: {
        color: 'white',
        fontSize: 13,
    },
    insightsText: {
        color: 'white',
        fontSize: 13,
    },
   ticketsText: {
        color: 'white',
        fontSize: 13,
    },
    shareText: {
        color: 'white',
        fontSize: 13,
    },
    profileText: {
        color: 'white',
        fontSize: 13,
    },
})
export default Tabs;
