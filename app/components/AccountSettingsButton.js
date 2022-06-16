import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

const AccountSettingsButton = ({text, onPress, arrow }) => {
    return(
        <TouchableOpacity style={styles.settingsButtonBody} onPress={onPress}>
            <View style={styles.settingsButtonBody2}>
                <View style={styles.textContainer}>
                    <Text style={styles.settingsButtonText}>
                        { text }
                    </Text>
                </View>
                {arrow ? <View style={styles.arrowContainer}>
                    <Icon name='right' size={30} color='#BBBBBB' style={styles.changePicIcon}/>
                </View> :<></>}
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    settingsButtonBody: {
        width: '95%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderRadius: 16,
        backgroundColor: '#353535',
        marginTop: 6,
    },
    settingsButtonBody2: {
        flex: 1,
        flexDirection: 'row',
        borderRadius: 16,
        alignItems: 'center',
    },
    settingsButtonText: {
        fontSize: 23,
        color: 'white',
        marginLeft: 25,
    },
    arrowContainer: {
        flex:1,
        alignItems: 'flex-end',
        paddingRight: 20,
    },
    textContainer: {
        flex: 4,
    },
})
export { AccountSettingsButton };