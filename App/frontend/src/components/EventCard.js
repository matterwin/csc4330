import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from '../constants';
import UserImageIcon from './UserImageIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { useSelector } from 'react-redux';
import { joinEvent, unJoinEvent } from '../api/handleEvent';

const EventCard = ({ 
    eventId,
    navigation,
    username, //required
    realname,
    profilePic,
    privacyType, //required
    titleOfEvent, //required
    place, //required
    eventImage,
    exactLocation,
    description,
    dateAndTimeOfEvent,
    createdAt,
    invited,
    joined
}) => {

    const token = useSelector(state => state.auth.token);

    const handleTap = () => {
        navigation.navigate("EventCardScreen", { eventId });
    };

    const getOriginalInvitation = () => {
        if (privacyType === 'Private') {
            if (invited) return 'Accept Event';
            else if (joined) return 'Joined Event';
        }
        return '';
    };

    const [invitedOrJoined, setInvitedOrJoined] = useState(() => getOriginalInvitation());

    const handleOnTouchStart = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        if(invitedOrJoined === 'Accept Event' || invitedOrJoined === 'Rejoin Event'){
            setInvitedOrJoined('Joined Event');
            joinEventCall();
        } else if(invitedOrJoined === 'Joined Event'){
            setInvitedOrJoined('Rejoin Event');
            unJoinEventCall();
        }
    }

    const joinEventCall = async () => {
        try {
            await joinEvent(token, eventId);
        } finally {}
    };

    const unJoinEventCall = async () => {
        try {
            await unJoinEvent(token, eventId);
        } finally {}
    };

    return (
        <View style={styles.eventContainer}>
            <View style={styles.nameCard}>
                <View style={styles.nameAndPicContainer}>
                    <View style={{ marginRight: 5 }}>
                        <UserImageIcon url={profilePic} width={40} height={40} />
                    </View>
                    <Text style={styles.username}>{username}</Text>
                    {privacyType === 'Friends Only' &&
                        <View style={styles.rightSideOfTop}>
                            <View style={styles.textCircle}>
                                <Icon name='people' size={18} color={COLORS.primary}/>
                                <Text style={{ color: COLORS.white }}>{privacyType}</Text>
                            </View>
                        </View>
                    }
                    {privacyType === 'Private' &&
                        <View style={styles.rightSideOfTop}>
                            <View style={styles.textCircle}>
                                <Icon name='finger-print' size={18} color={COLORS.primary}/>
                                <Text style={{ color: COLORS.white }}>{privacyType}</Text>
                            </View>
                        </View>
                    }
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
            { (invitedOrJoined !== '' && privacyType === 'Private') &&
                <View 
                    style={
                        [ styles.smallBtn, 
                            { backgroundColor: (invitedOrJoined === 'Joined Event') ? COLORS.green 
                            : ( invitedOrJoined === 'Rejoin Event' ) ? COLORS.grey : COLORS.green},
                        ]} 
                    onTouchStart={handleOnTouchStart}
                >
                    <Text style={[styles.smallBtnText, { color: (invitedOrJoined === 'Joined Event') ? COLORS.darkgrey : COLORS.white }]}>{invitedOrJoined}</Text>
                </View>
            }
            <View style={styles.outsideBox}>
                <Text style={styles.createdAtText}>{createdAt}</Text>
            </View>
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
        // marginLeft: 10,
        marginBottom: 5
    },
    smallBtn: {
        borderRadius: 10,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        paddingVertical: 13,
        alignItems: 'center',
    },
    smallBtnText: {
        fontFamily: FONTS.Poppins_600,
        color: '#fff',
        fontSize: 15,
    },
    outsideBox: {
        display: 'flex',
        marginLeft: 'auto',
        marginTop:3
    },
    username: {
        fontSize: 16,
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
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.2)'
      },
    dateAndTime: {
        paddingTop: 30,
        display: 'flex',
        flexDirection: 'row',
        gap: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    eventCardTitle: {
        fontWeight: '800',
        fontSize: 16
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
        marginLeft: 'auto',
        fontSize: 15
    },
    desc: {
        marginTop: 10,
        fontSize: 15
    },
    spacePadding: {
        padding: 10,
        paddingTop: 0
    },
    subtext: {
        color: COLORS.darkgrey,
    },
    createdAtText: {
        color: COLORS.darkgrey,
        fontSize: 13
    }
});

export default EventCard;