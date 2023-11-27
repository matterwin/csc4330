import React, { useState, useMemo, useRef, useCallback, useEffect } from 'react';
import { Text, StyleSheet, View, Image, TouchableOpacity, FlatList, Button } from 'react-native';
import { COLORS, FONTS } from '../constants';
import UserImageIcon from './UserImageIcon';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Haptics from 'expo-haptics';
import { useDispatch, useSelector } from 'react-redux';
import { joinEvent, unJoinEvent } from '../api/handleEvent';
import { toggleSheet } from '../redux/sheet/sheetActions';
import { setFetchFlag } from '../redux/fetch/fetchActions';
import { setEventInfo } from '../redux/participants/eventInfoActions';

const FocusedEventCard = ({ 
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
    joined,
    invitedUsers,
    joinedUsers,
    fetchData
}) => {

    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();

    const handleTap = () => {
        dispatch(toggleSheet());
    };

    useEffect(() => {
        dispatch(setEventInfo(eventId));
    },[])

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
        if(invitedOrJoined === 'Accept Event'){
            setInvitedOrJoined('Joined Event');
            joinEventCall();
        } else if(invitedOrJoined === 'Joined Event'){
            setInvitedOrJoined('Accept Event');
            unJoinEventCall();
        }
    }

    const joinEventCall = async () => {
        try {
            const res = await joinEvent(token, eventId);
            if(res.status === 200){
                dispatch(setFetchFlag('Friends'));
                dispatch(setFetchFlag('Discover'));
                fetchData();
            }
        } finally {}
    };

    const unJoinEventCall = async () => {
        try {
            const res = await unJoinEvent(token, eventId);
            if(res.status === 200){
                dispatch(setFetchFlag('Friends'));
                dispatch(setFetchFlag('Discover'));
                fetchData();
            }
        } finally {}
    };

    return (
        <>
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
                    <View style={[styles.eventCardContainer, 
                        { 
                            borderBottomLeftRadius: invitedOrJoined !== '' ? 0 : 5,
                            borderBottomRightRadius: invitedOrJoined !== '' ? 0 : 5
                        }
                    ]}>
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
                                { backgroundColor: (invitedOrJoined === 'Joined Event') ? COLORS.grey : COLORS.primaryLight},
                            ]}
                        onTouchStart={handleOnTouchStart}
                    >
                        <Text style={[styles.smallBtnText, { color: (invitedOrJoined === 'Joined Event') ? COLORS.darkgrey : COLORS.white }]}>{invitedOrJoined}</Text>
                    </View>
                }
                <View style={styles.outsideBox}>
                    <Text style={styles.createdAtText}>{createdAt}</Text>
                </View>
                {exactLocation && (
                    <View style={styles.eventContainer}>
                        <TouchableOpacity activeOpacity={1.0}>
                            <View style={styles.eventCardContainer}>
                                <View style={styles.spacePadding}>
                                    <View style={styles.addressBlock}>
                                        <Icon name="navigate" size={19} color={COLORS.black} />
                                        <Text>Address: {exactLocation}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                )}
                { (invitedOrJoined !== '' && privacyType === 'Private') &&
                    <View style={styles.eventContainer}>
                        <TouchableOpacity onPress={handleTap} activeOpacity={1.0}>
                            <View style={styles.eventCardContainer}>
                                <View style={styles.spacePadding}>
                                    <View style={styles.addressBlock}>
                                        <Icon name="people" size={19} color={COLORS.black} />
                                        <Text style={styles.textEvent}>Participants: {joinedUsers.length}</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    eventContainer: {
        width: "100%",
        marginBottom: 5,
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
    addressBlock: {
        paddingTop: 10,
        display: 'flex',
        flexDirection: 'row',
        gap: 3,
        alignItems: 'center',
        justifyContent: 'flex-start'
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

export default FocusedEventCard;