import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';

const SocialGrowthBar = ({platform, following, progress, subs}) => {
    return (
        <TouchableOpacity style={styles.container}>
            <Text style={[styles.text1, styles.text]}>{platform}</Text>
            <Text style={[styles.text2, styles.text]}>{following} {!subs ? 'Followers' : 'Subscribers' }</Text>
            <Text style={[styles.text3, styles.text]}>+{progress}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: '#353535',
        height: 40,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginBottom: 5,
    },
    text1: {
        flex: 2,
        textAlign: 'left',
    },
    text2: {
        flex: 3,
        textAlign: 'center',
    },
    text3: {
        flex: 1,
        textAlign: 'right',
        paddingRight: 5,
    },
    text: {
        color: 'white',
        fontSize: 15,
        fontWeight: '600',
    },
})
export default SocialGrowthBar;