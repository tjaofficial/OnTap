import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import AddLinkButton from './AddLinkButton';

const LinkGroups = ({ group, title }) => {

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitleText}>
                {title}
            </Text>
            <View style={{ flex: 1, alignItems: 'center'}}>
                <View style={styles.groupLinkContainer}>
                    {group.map ( item => {
                        return <AddLinkButton 
                                    key={item.title}
                                    text={item.title} 
                                    logo={item.logo}
                                    link={item.url}
                                    type={item.type}
                                    color={item.color}
                                />  
                    })} 
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    sectionTitleText: {
        color: 'gray',
        fontWeight: 'bold',
        fontSize: 30,
    },
    groupLinkContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        marginBottom: 15,
    },
})

export default LinkGroups;