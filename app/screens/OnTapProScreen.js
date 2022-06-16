import React from 'react';
import { View, ScrollView, StyleSheet, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import Header from '../components/Header';

function OnTapProScreen({navigation}) {

    return (
        <View style={styles.background}>
            <Header text='OnTap PRO' adjustment={183} />
            <ScrollView>
                <View style={styles.bodyContianer}>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.headerTextLeft}>
                            Upgrade to OnTap PRO
                        </Text>
                        <Text style={styles.descriptionTextRight}>
                            OnTap PRO is the only Networking App that has been specially
                            tailord for Entertainment Professionals but is utilized by all professionals.
                        </Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.headerTextRight}>
                            Personal and Professional Profiles
                        </Text>
                        <Text style={styles.descriptionTextLeft}>
                            OnTap PRO is the only Networking App that has been specially
                            tailord for Entertainment Professionals but is utilized by all professionals.
                        </Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.headerTextLeft}>
                            Sell Tickets with and Organized Team
                        </Text>
                        <Text style={styles.descriptionTextRight}>
                            OnTap PRO is the only Networking App that has been specially
                            tailord for Entertainment Professionals but is utilized by all professionals.
                        </Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.headerTextRight}>
                            Analytics of Event Sales
                        </Text>
                        <Text style={styles.descriptionTextLeft}>
                            OnTap PRO is the only Networking App that has been specially
                            tailord for Entertainment Professionals but is utilized by all professionals.
                        </Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.headerTextLeft}>
                            Create a Custom QR Code
                        </Text>
                        <Text style={styles.descriptionTextRight}>
                            OnTap PRO is the only Networking App that has been specially
                            tailord for Entertainment Professionals but is utilized by all professionals.
                        </Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.headerTextRight}>
                            Keep Track of Social Media Growth
                        </Text>
                        <Text style={styles.descriptionTextLeft}>
                            OnTap PRO is the only Networking App that has been specially
                            tailord for Entertainment Professionals but is utilized by all professionals.
                        </Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.headerTextLeft}>
                            Fully Customize Profile
                        </Text>
                        <Text style={styles.descriptionTextRight}>
                            OnTap PRO is the only Networking App that has been specially
                            tailord for Entertainment Professionals but is utilized by all professionals.
                        </Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.headerTextRight}>
                            Swap Between Multiple Accounts
                        </Text>
                        <Text style={styles.descriptionTextLeft}>
                            OnTap PRO is the only Networking App that has been specially
                            tailord for Entertainment Professionals but is utilized by all professionals.
                        </Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.headerTextLeft}>
                            Unlimited Profile Links
                        </Text>
                        <Text style={styles.descriptionTextRight}>
                            OnTap PRO is the only Networking App that has been specially
                            tailord for Entertainment Professionals but is utilized by all professionals.
                        </Text>
                    </View>
                </View>
            </ScrollView>
            <View style={styles.footerContainer}>
                <View style={styles.paymentArea}>
                    <View style={styles.slider}>
                        <Text style={styles.sliderText}>
                            Yearly{"\n"}$67.99
                        </Text>
                    </View>
                    <Text style={styles.areaText}>
                        Yearly{"\n"}$67.99
                    </Text>
                </View>
                <View style={{marginTop: -7}}>
                    <CustomButton
                        text='Go Back'
                        type='SecondaryDark'
                        onPress={() => navigation.goBack()}
                        
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'black',
    },
    bodyContianer: {
        flex: 1,
        //alignItems: 'center',
    },
    headerTextLeft: {
        color:'white', 
        fontWeight: '800', 
        fontSize: 20,
        textAlign: 'left',
        flex: 1,
    },
    headerTextRight: {
        color:'white', 
        fontWeight: '800', 
        fontSize: 20,
        textAlign: 'right',
        flex: 1,
    },
    descriptionTextLeft: {
        color:'white', 
        fontWeight: '400', 
        fontSize: 17,
        textAlign: 'left',
        flex: 1,
    },
    descriptionTextRight: {
        color:'white', 
        fontWeight: '400', 
        fontSize: 17,
        textAlign: 'right',
        flex: 1,
    },
    footerContainer: {
        backgroundColor: '#D9D9D9',
        height: 105,
        alignItems: 'center'
    },
    paymentArea: {
        backgroundColor: '#444444',
        height: 45,
        width: '75%',
        borderRadius: 30,
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    slider: {
        flex: 5,
        backgroundColor: '#D9D9D9',
        justifyContent: 'center',
        borderRadius: 30,
        borderColor: '#444444',
        borderWidth: 1,
        alignItems: 'center',
        height: '100%',
    },
    sliderText: {
        color: 'black',
        textAlign: 'center',
    },
    areaText: {
        flex: 4,
        color: '#919191',
        fontWeight: '700',
        textAlign: 'center',
    },
    sectionContainer: {
        flex: 1,
        height: 250,
    },
})

export default OnTapProScreen;