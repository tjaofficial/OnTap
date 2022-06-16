import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import { Header, LinkGroups } from '../../../components';
import { DataStore} from 'aws-amplify';
import { Platform } from '../../../models';

const AddLinkScreen = ({navigation}) => {
    const [groups, setGroups] = useState({});
    const [value, setValue] = useState('checking value...');
    
    useEffect(() => {
        let isMounted = true;

        const getPlatform = async () => {
            const dbPlatform = (await DataStore.query(Platform));
            return dbPlatform;
        }

        const typeFilter = (query) => {
            const newObject = {}
            for (let i=0; i < query.length; i++) {
                let platformInfo = query[i];
                let pType = platformInfo.type;
                if (newObject.hasOwnProperty(pType)) {
                    newObject[pType].push(platformInfo);
                } else {
                    newObject[pType] = [platformInfo];
                }
            }
            return newObject;
        }   
        
        const getGroupList = getPlatform().then((value) => {
            setGroups(typeFilter(value));
        });

        getPlatform().then(() => {
            if(isMounted) {
                setValue('done!');
            }
        });
        return () => {
            isMounted = false;
        }
    },[])

    return (
        <View style={styles.background}>
            <Header text='Add Link' />
            <ScrollView>
                <View style={styles.bodyContianer}>
                    {groups.MUSIC ?<LinkGroups 
                        group={groups.MUSIC}
                        title='Music'
                        onPress = 'nothing'
                    /> : <Text></Text>}
                    {groups.SOCIAL ?<LinkGroups 
                        group={groups.SOCIAL}
                        title='Socials'
                        onPress = 'nothing'
                    /> : <Text></Text>}
                    {groups.PAYMENTS ?<LinkGroups 
                        group={groups.PAYMENTS}
                        title='Payments'
                        onPress = 'nothing'
                    /> : <Text></Text>}
                    {groups.CONTACTS ? <LinkGroups 
                        group={groups.CONTACTS}
                        title='Contacts'
                        onPress = 'nothing'
                    /> : <Text></Text>}
                    {groups.MORE ? <LinkGroups 
                        group={groups.MORE}
                        title='More...'
                        onPress = 'nothing'
                    /> : <Text></Text>}
                    <View style={{ flex: 1 }}>
                        <Text style={styles.sectionTitleText}>
                            Socials
                        </Text>
                        <View style={styles.groupLinkContainer}>
                            <Text>
                                ''
                            </Text>
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
        flex: 1,
    },
    
})

export default AddLinkScreen;