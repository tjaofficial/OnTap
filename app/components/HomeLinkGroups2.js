import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { LinkButton } from './LinkButton';


const HomeLinkGroups2 = ({group, title}) => {

    return (
        <View style={styles.fingersCrossed}>
                <Text style={styles.text}>
                    {title}
                </Text>
                <View style={{flex:1, alignItems: 'center'}}>
                    {group.map ((item) => {
                        return <LinkButton
                                    title={item.platformNAME}
                                    link={item.link}
                                    logo={item.platformLOGO}
                                    type={item.platformTYPE}
                                    linkID = {item.id}
                                    customTitle = {item.customTitle}
                                    key={item.id}
                                    item={item}
                                    platformColor={item.platformColor}
                                />
                    })}

                </View>
        </View>
    );
}
const styles = StyleSheet.create({
    text: {
        color: 'gray',
        fontSize: 15,
        alignItems: 'center',
        paddingLeft: 15,
        fontWeight: '400',
        textAlign: 'center',
        marginBottom: -5,
        marginTop: 20,
    },
    fingersCrossed: {
        flex:1,

    },
    flatList: {
        flex: 1,
        alignItems: "center",
    }
})
export default HomeLinkGroups2;