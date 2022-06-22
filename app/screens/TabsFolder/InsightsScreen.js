import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Header, SocialGrowthBar } from '../../components';
import {Auth, DataStore} from 'aws-amplify';
import { User } from '../../models';
import YoutubeCounter from '../../components/youtube/YoutubeCounter';

const InsightsScreen = ({navigation}) => {
    const [pro, setPro] = useState();

    useEffect(() => {
        const getPro = async () => {
            const authUser = await Auth.currentAuthenticatedUser(); 
            const dbUsers = await DataStore.query(User, x => x.sub('eq', authUser.attributes.sub));

            setPro(dbUsers[0].PRO);
        }
        getPro();
    })

    const goSocialSync = () => navigation.navigate('Tabs', {
        screen: 'HomeStack', params: {
            screen: 'SettingsStackScreen', params: {
                screen: 'SocialSyncScreen'
            }
        }
    });
    
    const goPro = () => navigation.navigate('OnTapProScreen');

    const subs = YoutubeCounter();

    const tokens = {
        consumer_key: 'v7UmfXTkRv56sXERZN5WzBuuW',
        consumer_secret: 'wTm20U4goDP48Qq269EmdtHmVDIjcckYx41fHI6q9tdZAcoVQI',
        access_token_key: '226525350-',
        access_token_secret: 'y5Uw8VJGXeYoH5HsWr5rcwjcixMN5SBlPQw9gc2s',
        bearer_token: 'AAAAAAAAAAAAAAAAAAAAAKN7dgEAAAAANdBg1x6Nppuy9W99YSa7MTwiqHk%3DwTn24c2Qx2oupnUvTzSbeQx5V6YfPRB6fGAfsm5KIrNguPT4x3'
    };
    

    //var T = new twit({
    //consumer_key: consumer_key,
    //consumer_secret: consumer_secret,
    //access_token: access_token_key,
    //access_token_secret: access_token_secret,
    //})

    //T.get('followers/ids', { screen_name: 'tjaofficial' },  function (err, data, response) {
    //    console.log(data)
    //})
    return (
        <View style={styles.background}>
            <Header text='Insights' />
            <ScrollView>
                <View style={styles.bodyContianer}>
                    <View style={styles.graphsContainer}>
                        <View style={styles.singleGraph}>
                            <Text style={styles.graphText}>
                                OnTaps
                            </Text>
                            <View style={{flex:1, alignItems: 'center'}}>
                                
                            </View>
                        </View>
                        <View style={styles.singleGraph}>
                            <Text style={styles.graphText}>
                                Connections
                            </Text>
                            <View>
                                
                            </View>
                        </View>
                        <Text style={styles.graphSubText}>
                            Total Connections: 13
                        </Text>
                    </View>
                    <View style={styles.socialGrowthContainer}>
                        <Text style={styles.socialHeader}>
                            Social Growth
                        </Text>
                        <View style={styles.socialContainer}>
                            <SocialGrowthBar 
                                platform='Instagram'
                                following='9,342'
                                progress='4'
                            />
                            <SocialGrowthBar 
                                platform='Facebook'
                                following='1,245'
                                progress='6'
                            />
                            <SocialGrowthBar 
                                platform='TikTok'
                                following='632'
                                progress='12'
                            />
                            
                            <SocialGrowthBar 
                                platform='YouTube'
                                following={subs}
                                progress='12'
                                subs={true}
                            />
                        </View>
                        <View style={styles.socialSync}>
                            <TouchableOpacity onPress={ pro ? goSocialSync : goPro}>
                                <Text style={{color: 'gray', textDecorationLine: 'underline'}}>
                                    {pro ? 'sync social media' : 'sync social media (PRO)'}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
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
        flex:1,
        alignItems: 'center',
    },
    graphsContainer: {
        backgroundColor: '#2A2A2A',
        borderRadius: 12,
        width: '90%',
        padding: 20,
        alignItems: 'center',
    },
    singleGraph: {
        backgroundColor: 'gray',
        width: '100%',
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
    },
    graphText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
    },
    graphSubText: {
        paddingTop: 10,
        color: 'gray',
        fontWeight: '700',
        fontSize: 15,
    }, 
    socialGrowthContainer: {
        width: '85%',
    },
    socialHeader: {
        color: 'gray',
        fontSize: 35,
        fontWeight: '800',
    },
    socialContainer: {
        flex: 1,
        paddingHorizontal: 3,
    },
    socialSync: {
        alignItems: 'center',
        flex: 1,
        marginBottom: 15,
    },
})

export default InsightsScreen;