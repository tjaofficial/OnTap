import React from 'react';
import { Text, StyleSheet, View, ImageBackground, TouchableOpacity, Pressable } from 'react-native';
import logos from '../assets/social';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';


const LinkButton = ({logo, link, title, type, linkID, customTitle, item, platformColor, onPress }) => {
    const navigation = useNavigation();
    const logoAssign = logos.logo[logo];
    const goLinkDetail = () => navigation.navigate('UserLinkDetailScreen', {logo: logo, link: link, title: title, type: type, linkID: linkID, customTitle: customTitle, item: item});
    return(
        <TouchableOpacity 
            onPress={onPress ? onPress : goLinkDetail} 
            style={styles.linkButtonBody}>
            <LinearGradient
                colors={[platformColor, '#020202']}
                start={{ x: 1.5, y: -4.0 }}
                end={{ x: 1.2, y: 4.0 }}
                locations={[0.55, 0.64]}
                style={styles.button}>
                <View style={styles.logoContainer}>
                    <ImageBackground 
                        style={styles.logo}
                        source={logoAssign}
                    />
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.linkButtonText}>
                        { title }
                    </Text>
                </View>
                <Pressable style={styles.moveContainer}>
                    <Text style={styles.moveDots}>
                        ...
                    </Text>
                </Pressable>
            </LinearGradient>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    linkButtonBody: {
        width: '90%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 38,
        backgroundColor: 'black',
        marginTop: 6,
        borderColor: 'gray',
        //borderWidth: 2,
        flexDirection: 'row',
    },
    linkButtonText: {
        fontSize: 25,
        color: 'white',
        marginLeft: -15,
        fontWeight: '800',
        textAlign: 'center',
    },
    logoContainer: {
        marginLeft: 12,
        marginRight: 5,
        flex: 1,
        alignItems: 'center',
    },
    logo: {
        resizeMode: "contain",
        width: 40,
        height: 40,
        marginLeft: 10
    },
    textContainer: {
        flex: 4,
    },
    deleteContainer: {
        flex: 1,
        alignItems: 'center'
    },
    button: {
        flex:1, 
        borderRadius: 38,
        flexDirection: 'row',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'gray',
    },
    moveDots: {
        fontSize: 25,
        color: 'white',
        fontWeight: '800',
        marginBottom: 12,
        marginRight: 20,
    },
    moveContainer: {
        flex: 1,
    },
})
export { LinkButton };