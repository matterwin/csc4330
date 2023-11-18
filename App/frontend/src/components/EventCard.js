import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants';
import ProfileImage from './ProfileImage';

const EventCard = ({ navigation, noNav, username, titleOfEvent, place, exactLocation, timeOfEvent, desc, privacyType }) => {
    const handleTap = () => {
        if(noNav) return;
        navigation.navigate("EventCard", { 
            username, 
            titleOfEvent, 
            place, 
            exactLocation, 
            timeOfEvent, 
            desc, 
            privacyType 
        });
    };

    return (
        <View style={styles.eventContainer}>
            <View style={styles.nameCard}>
                <View style={styles.nameAndPicContainer}>
                    <ProfileImage width={50} height={50}/>
                    <Text style={styles.text}>{username}</Text>
                </View>
            </View>
            <TouchableOpacity onPress={handleTap} activeOpacity={1.0}>
                <View style={styles.eventCardContainer}>
                    <View style={styles.titleAndPlaceContainer}>
                        <Text style={styles.eventCardTitle}>{titleOfEvent}</Text>
                        <Text style={styles.place}>{place}</Text>
                    </View>
                    <Image source={require('../../assets/images/lsu.webp')} style={{ width: '100%', height: 200 }}/>
                    <View style={styles.spacePadding}>
                        <Text style={styles.desc}>{desc}</Text>
                        <View style={styles.dateAndTime}>
                            <Text>Today:</Text>
                            <Text>{timeOfEvent}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    eventContainer: {
        width: "100%",
        marginBottom: 20,
    },
    nameCard: {
        backgroundColor: COLORS.greyLight,
        padding: 0,
        width: "100%",
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    eventCardContainer: {
        backgroundColor: '#fff',
        // padding: 20,
        width: "100%",
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 5,
    },
    nameAndPicContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: 10
    },
    dateAndTime: {
        paddingTop: 30,
    },
    eventCardTitle: {
        fontWeight: '800',
        marginBottom: 20
    },
    titleAndPlaceContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 20,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: "flex-start",
    },
    place: {
        marginLeft: 'auto'
    },
    desc: {
        marginTop: 10
    },
    spacePadding: {
        padding: 20,
        paddingTop: 0
    },
});

export default EventCard;