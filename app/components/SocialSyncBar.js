import React from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SocialSyncBar = ({platform, onPress}) => {
    return (
        <View style={styles.platformBar}>
            <Text style={styles.platformText}>
                {platform}
            </Text>
            <TouchableOpacity style={{justifyContent: 'center'}} onPress={onPress}>
                <Text style={styles.syncText}>
                    sync
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
        flex: 2,
        color: 'white',
        textAlign: 'left',
        fontSize: 20,
        fontWeight: '700',
    },
    syncText: {
        flex: 1,
        color: 'white',
        textAlign: 'right',
        textDecorationLine: 'underline',
    },
})
export default SocialSyncBar;