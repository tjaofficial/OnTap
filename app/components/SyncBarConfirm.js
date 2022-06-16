import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';

const SyncBarConfirm = ({platform, onPress}) => {
    return (
        <View style={styles.platformBar}>
            <Icon name='check' size={20} color='green' />
            <Text style={styles.platformText}>
                {platform}
            </Text>
            <TouchableOpacity style={{justifyContent: 'center'}} onPress={onPress}>
                <Text style={styles.syncText}>
                    remove
                </Text>
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({
    platformBar: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 12
    },
    platformText: {
        flex: 1,
        color: 'green',
        textAlign: 'center',
        fontSize: 20,
        fontWeight: '700'
    },
    syncText: {
        flex: 1,
        color: 'gray',
        textAlign: 'right',
        textDecorationLine: 'underline',
    },
})
export default SyncBarConfirm;