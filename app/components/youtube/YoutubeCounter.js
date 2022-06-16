import { Auth, DataStore } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { SocialSync } from '../../models';
import config from './config';

const YoutubeCounter = () => {
    const [subscriberCount, setSubscriberCount] = useState();
    const { api_key } = config;
    const [channelId, setChannelId] = useState();
    const [dataQuery, setDataQuery] = useState(false);
    
    useEffect(() => {
        const getYoutubeChannelId = async () => {
            const dbAuth = await Auth.currentAuthenticatedUser();
            const dbSocial = await DataStore.query(SocialSync, c => c.sub('eq', dbAuth.attributes.sub));

            const userSocial = dbSocial[0];
            setChannelId(userSocial.youtubeChannelID)
            setDataQuery(true);

            
        }
        getYoutubeChannelId();

        if (dataQuery) {process();}

    })
    const process = () => {
        const apiCall = 'https://www.googleapis.com/youtube/v3/channels?part=statistics&id=' + channelId + '&key=' + api_key;
        fetch(apiCall)
        .then(result => result.json())
        .then(data => {
            const subs = data.items[0].statistics.subscriberCount;
            setSubscriberCount(subs);
        });
    }
    return subscriberCount;
}

export default YoutubeCounter;