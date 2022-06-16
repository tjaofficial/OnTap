import React from 'react';
import { Text, View, StyleSheet, Pressable, ImageBackground } from 'react-native';
import logos from '../assets/social';
import { useNavigation } from '@react-navigation/native';

const AddLinkButton = ({ logo, text, link, type, color }) => {
    const navigation = useNavigation();
    const logoAssign = logos.logo[logo];
    const goLinkDetail = () => navigation.navigate('AddLinkDetailsScreen', {link: link, text: text, logo: logo, type: type, color: color});
    return (
        <View style={styles.linkContainer}>
            <View style={styles.logoContainer}>
                <ImageBackground 
                    style={styles.logo}
                    source={logoAssign}
                />
            </View>
            <View style={styles.textButtonContainer}>
                <Text style={styles.titleText}>
                    {text}
                </Text>
                <Pressable onPress={goLinkDetail} style={styles.container}>
                    <Text style={styles.text}>
                        +Add
                    </Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: 50,
        padding: 2,
        alignItems: 'center',
        borderRadius: 6,
        marginVertical: 5,
        backgroundColor: 'gray',
    },
    text: {
        color: 'white',
        fontWeight: 'bold',
    },
    logo: {
        resizeMode: "contain",
        width: 80,
        height: 80,
        marginLeft: -13,
    },
    linkContainer: {
        backgroundColor: '#555555',
        width: 180,
        height: 90,
        borderRadius: 13,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
        marginVertical: 5,
    },
    titleText: {
        flexWrap:'wrap',
        fontSize: 16,
        color: 'white',
        textAlign: 'center',
    },
    textButtonContainer: {
        justifyContent:"center",
        alignItems: 'center',
        width: 75,
    },
    logoContainer: {
        marginLeft: 12,
        marginRight: 5,
    }
});
export default AddLinkButton;