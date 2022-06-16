import { useNavigation } from '@react-navigation/core';
import React, { useEffect, useState } from 'react';
import { View, Image, Text, StyleSheet, Pressable } from 'react-native';
import SwitchSelector from "react-native-switch-selector";
import {Auth, DataStore} from 'aws-amplify';
import { User } from '../models';

const PersonalHeader = ({pro}) => {
    const navigation = useNavigation();
    //const [pro, setPro] = useState();
    const [dataQuery, setDataQuery] = useState(false);
    const options = [
        { label: "Standard", value: false },
        { label: "PRO", value: true },
    ];
    
    //useEffect(() => {
        //const getCurrentUser = async () => {
        //    const authUser = await Auth.currentAuthenticatedUser(); 
        //    const dbUsers = await DataStore.query(User, x => x.sub('eq', authUser.attributes.sub));
//
        //    setPro(dbUsers[0].PRO);
        //    setDataQuery(true);
        //}
        //getCurrentUser();
//
    //}, [])
    return (
        <View style={styles.headerContainer}>
            <View style={styles.holder}>
                <View style={styles.imageCont}>
                    <Image style={styles.tinyLogo} source={require('../assets/OnTapIcon.png')}/>
                </View>
                <View style={styles.slideCont}>
                    <View style={styles.slideContainer}>
                        <View style={styles.barSelected}>
                            <Text style={styles.selectedText}>
                                Personal
                            </Text>
                        </View>
                        <Pressable 
                            onPress={() => navigation.navigate('OnTapProScreen')}
                            style={{flex:1, justifyContent: 'center'}}>
                            <Text style={styles.unselectedText}>
                                PRO
                            </Text>
                        </Pressable>
                        <SwitchSelector
                            textColor='black'
                            selectedColor='black'
                            buttonColor='white'
                            borderColor='white'
                            backgroundColor='gray'
                            initial={0}
                            options={options}
                            onPress={!pro ? () => navigation.navigate('OnTapProScreen'): console.log()}
                            value={pro ? 1: 0}
                        />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    tinyLogo: {
        width: 76,
        height: 60,
    },
    slideContainer: {
        width: 200,
        height: 35,
        backgroundColor: 'gray',
        borderRadius: 20,
        justifyContent: 'center',
    },
    slideCont: {
        flex: 1,
        paddingRight: 50
    },
    imageCont: {
        flex: 1,
        paddingLeft: 15
    },
    barSelected: {
        width: 110,
        height: 35,
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingRight: 6,
    },
    selectedText: {
        
    },
    unselectedText: {
        position: 'absolute',
        right: 33,
    },
    headerContainer:{
        justifyContent: 'flex-end',
        height: 105,
        paddingBottom: 5,
    },
    holder: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})
export default PersonalHeader;