import React from 'react';
import { Text, StyleSheet, TouchableOpacity } from 'react-native';

const CustomButton = ({onPress, text, type = "Primary", bgColor, fgColor, buttonWidth }) => {
    return (
        <TouchableOpacity 
            onPress={onPress}
            style={[
                styles.container, 
                styles['container_' + type],
                bgColor ? {backgroundColor: bgColor} : {},
                buttonWidth ? {width: buttonWidth} : {},
            ]}
        >
            <Text style={[
                styles.text, 
                styles['text_' + type ],
                fgColor ? {color: fgColor} : {},
            ]}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '60%',
        padding: 10,
        alignItems: 'center',
        borderRadius: 6,
        marginVertical: 5,
    },
    container_Primary: {
        backgroundColor: 'gray',
    },
    container_Secondary: {
        width: '100%'
    },
    text: {
        color: 'white',
    },
    container_Inverted: {
        borderColor: 'white',
        borderWidth: 2,
        fontWeight: 'bold',
    },
    text: {
        color: 'white',
    },
    text_Primary: {
        fontWeight: 'bold',
    },
    text_Secondary: {
        textDecorationLine: 'underline',
    },
    text_SecondaryDark: {
        textDecorationLine: 'underline',
        color: 'gray'
    },
});
export default CustomButton;