import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import PersonalHeader from '../components/PersonalHeader';

const Header = ({text, adjustment, pro }) => {
    return (
        <View style={[
            styles.headerAdjustment, 
            adjustment ? {height: adjustment} : {},]}>
            <PersonalHeader pro={pro} />
            {text? <View style={styles.titlePosition}>
                <Text 
                    style={styles.titleText}
                >
                    {text}
                </Text>
            </View>
            : <></>}
        </View>
    );
};

const styles = StyleSheet.create({
    headerAdjustment:{
        height: 165,
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
});

export default Header;