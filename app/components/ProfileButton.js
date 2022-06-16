import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileButton = (props) => {
    return(
        <View style={styles.profButtonBody}>
            <Text style={styles.profButtonText}>
                { props.children }
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    profButtonBody: {
        width: 220,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 22,
        backgroundColor: '#A4ADB3',
        marginTop: 6,
    },
    profButtonText: {
        fontSize: 20,
        color: 'white',
    },
})
export {ProfileButton};