import { Auth, DataStore } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Header, SocialSyncBar, SyncBarConfirm } from '../../../components';
import { SocialSync } from '../../../models';

function SocialSyncScreen({navigation}) {
    const [userSocials, setUserSocials] = useState();

    const [dataQuery, setDataQuery] = useState(false);

    useEffect(() => {
        const getAuthSub = async () => {
            const dbAuth = await Auth.currentAuthenticatedUser();
            const dbSocial = await DataStore.query(SocialSync, x => x.sub('eq', dbAuth.attributes.sub));
            
            //setUser_id(dbAuth.attributes.sub);
            if (dbSocial.length === 0) {
                return;
            } else {
                setUserSocials(dbSocial[0]);
            }

            setDataQuery(true);
        }
        getAuthSub();
    },[])



    return (
        <View style={styles.background}>
            <Header text='Social Sync' />
            <View style={{flex:1}}>
                {dataQuery ? <View style={styles.bodyContianer}>
                    <View style={styles.syncContainer}>
                        <SocialSyncBar
                            platform='Instagram'
                            sync='instagram'
                        />
                        <SocialSyncBar
                            platform='Facebook'
                            sync='facebook'
                        />
                        <SocialSyncBar
                            platform='Twitter'
                            sync='twitter'
                        />
                        <SocialSyncBar
                            platform='TikTok'
                            sync='tiktok'
                        />
                        {!userSocials.youtubeChannelID ? <SocialSyncBar
                            platform='Youtube'
                            onPress={() => navigation.navigate('SyncYoutube')}
                        /> : <SyncBarConfirm platform='Youtube' />}
                        <SocialSyncBar
                            platform='SoundCloud'
                            sync='soundcloud'
                        />
                    </View>
                </View> : <ActivityIndicator />}
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
        alignItems: 'center',
    },
    syncContainer: {
        width:'90%',
        backgroundColor: '#353535',
        alignItems: 'center',
        borderRadius: 15,
        padding:15,
        paddingHorizontal: 35,
    },
})

export default SocialSyncScreen;