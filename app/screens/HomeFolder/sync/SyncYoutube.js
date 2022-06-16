import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, ActivityIndicator } from 'react-native';
import { CustomButton, Header } from '../../../components';
import { Auth, DataStore } from 'aws-amplify';
import { SocialSync } from '../../../models';

const SyncYoutube = ({navigation}) => {
    const [channel_id, setChannel_id] = useState();
    const [user_id, setUser_id] = useState();
    const [userSocials, setUserSocials] = useState();

    const [dataQuery, setDataQuery] = useState(false);

    useEffect(() => {
        const getAuthSub = async () => {
            const dbAuth = await Auth.currentAuthenticatedUser();
            const dbSocial = await DataStore.query(SocialSync, x => x.sub('eq', dbAuth.attributes.sub));
            
            setUser_id(dbAuth.attributes.sub);
            if (dbSocial.length === 0) {
                return;
            } else {
                setUserSocials(dbSocial[0]);
            }

            setDataQuery(true);
        }
        getAuthSub();
    },[])

    const isValid = () => {
        return channel_id;
    }

    const save = async () => {
        if (!isValid()) {
            return;
        }
        if (userSocials) {
            const updatedSocial = SocialSync.copyOf(userSocials, updated => {
                updated.youtubeChannelID = channel_id;
            })
            await DataStore.save(updatedSocial);
        } else {
            const newSocialSync = new SocialSync({
                sub: user_id,
                youtubeChannelID: channel_id,
            })
            await DataStore.save(newSocialSync);
        }
        navigation.navigate('SocialSyncScreen', {changeForm: true});
    }

    return (
        <View style={styles.background}>
            <Header text='Sync Youtube' />
            {dataQuery ? <View style={styles.Container}>
                <View style={styles.bodyContianer}>
                    <Text style={styles.text}>Youtube Channel ID</Text>
                    <TextInput
                        placeholder='Ex. UCdSa_YLoUokZAwHhlwJntIA'
                        style={styles.input}
                        placeholderTextColor='white'
                        value={channel_id}
                        onChangeText={setChannel_id}
                    />
                    <CustomButton
                        text='Save'
                        onPress={save}
                    />
                </View>
            </View> : <ActivityIndicator /> }
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
    Container: {
        flex: 1,
    },
    text: {
        color: 'white'
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

export default SyncYoutube;