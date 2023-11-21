import React from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../constants';
import UserImageIcon from './UserImageIcon';
import Icon from 'react-native-vector-icons/Ionicons';

const EventCard = ({ 
    eventId,
    navigation,
    username, //required
    profilePic,
    privacyType, //required
    titleOfEvent, //required
    place, //required
    eventImage,
    exactLocation,
    description,
    dateAndTimeOfEvent,
    createdAt,
}) => {

    const handleTap = () => {
        navigation.navigate("EventCardScreen", { eventId });
    };

    return (
        <View style={styles.eventContainer}>
            <View style={styles.nameCard}>
                <View style={styles.nameAndPicContainer}>
                    <View style={{ marginRight: 5 }}>
                        <UserImageIcon url={profilePic} width={35} height={35} />
                    </View>
                    <Text style={styles.username}>{username}</Text>
                    <View style={styles.rightSideOfTop}>
                        <Text style={styles.subtext}>{createdAt}</Text>
                        <View style={styles.textCircle}>
                            <Icon name={privacyType === "Anyone" ? 'globe' : 'people'} size={18} color={COLORS.primary}/>
                            <Text>{privacyType}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <TouchableOpacity onPress={handleTap} activeOpacity={1.0}>
                <View style={styles.eventCardContainer}>
                    <View style={styles.titleAndPlaceContainer}>
                        <Text style={[styles.eventCardTitle, { marginBottom: eventImage === null ? 0 : 20 }]}>{titleOfEvent}</Text>
                        <Text style={styles.place}>{place}</Text>
                    </View>
                    {eventImage && <Image source={{ uri: eventImage }} style={{ width: '100%', height: 200 }}/> }
                    { ( description || dateAndTimeOfEvent ) && (
                        <View style={styles.spacePadding}>
                            {description && <Text style={styles.desc}>{description}</Text> }
                            { dateAndTimeOfEvent && 
                                <View style={styles.dateAndTime}>
                                    <Icon name="stopwatch" size={19} color={COLORS.black} />
                                    <Text>{dateAndTimeOfEvent}</Text>
                                </View>
                            }
                        </View>
                    )}
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    eventContainer: {
        width: "100%",
        marginBottom: 20,
        marginTop: 20,

    },
    nameCard: {
        backgroundColor: COLORS.greyLight,
        padding: 0,
        width: "100%",
        display: 'flex',
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
        marginLeft: 10,
        marginBottom: 5
    },
    username: {
        fontSize: 14,
        fontFamily: FONTS.Poppins_500
    },
    rightSideOfTop: {
        marginLeft: 'auto', 
        // marginRight: 10,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 5
    },
    textCircle: {
        padding: 5,
        borderRadius: "100%",
        borderWidth: 1,
        borderColor: COLORS.greySuperLight,
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'flex-start',
        alignItems: 'center'
      },
    dateAndTime: {
        paddingTop: 30,
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    eventCardTitle: {
        fontWeight: '800',
    },
    titleAndPlaceContainer: {
        paddingLeft: 10,
        paddingRight: 10,
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
        padding: 10,
        paddingTop: 0
    },
    subtext: {
        color: COLORS.darkgrey,
    }
});

export default EventCard;