import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS, FONTS } from '../constants';
import UserImageIcon from './UserImageIcon';
import * as Haptics from 'expo-haptics';
import Icon from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView, LongPressGestureHandler } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { acceptFriendRequest, denyFriendRequest } from '../api/handleFriend';
import { setFetchFlag } from "../redux/fetch/fetchActions";

const ReceivedFriendRequestBox = ({ navigation, username, realName, profilePic, isTitle, numFriends, setFriends }) => {
    const [chosenPressedAccepted, setChosenPressedAccepted] = useState(false);
    const [chosenPressedDenied, setChosenPressedDenied] = useState(false);
    const [profilePressed, setProfilePressed] = useState(false);
    const token = useSelector(state => state.auth.token);
    const dispatch = useDispatch();
    
    const handlePressInAccepted = () => {
        setProfilePressed(false);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setChosenPressedAccepted(true);

        setTimeout(() => {
            setChosenPressedAccepted(false);
        }, 100);
    };

    const handlePressInDenied = () => {
        setProfilePressed(false);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setChosenPressedDenied(true);

        setTimeout(() => {
            setChosenPressedDenied(false);
        }, 100);
    };

    const handleProfileTouchOn = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        console.log("pressed profile");

        // bring user to clicked profile
    }

    const accepted = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        console.log("pressed accept");

        setFriends((prevFriends) => prevFriends.filter((friend) => friend.username !== username));
        accRequest();
    }

    const accRequest = async () => {
        try {
            const res = await acceptFriendRequest(token, username);
        } finally {
            dispatch(setFetchFlag('FriendsList'));
            dispatch(setFetchFlag('Friends'));
        }
    };

    const denied = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

        setFriends((prevFriends) => prevFriends.filter((friend) => friend.username !== username));
        delRequest();
    }

    const delRequest = async () => {
        try {
            const res = await denyFriendRequest(token, username);
        } finally {}
    };

    return (
        <>
        {isTitle ? (
            <View style={[styles.eventContainer, { backgroundColor: 'transparent', borderBottomWidth: 0 }]} >
                <View style={styles.nameAndPicContainer}>
                    <Text style={styles.directMessagesTitle}>Friends - {numFriends-1}</Text>
                </View>
            </View>
        ) : (
            <GestureHandlerRootView style={{ width: '100%' }}>
                <LongPressGestureHandler
                    minDurationMs={300}
                    style={{ width: '100%' }}
                >
                    <View 
                        style={[styles.eventContainer, { backgroundColor: profilePressed ? COLORS.green : 'transparent' }]}
                    >
                        <View style={styles.profileSlipContainer} >
                            <View style={styles.nameAndPicContainer} onTouchStart={() => handleProfileTouchOn()}>
                                <UserImageIcon url={profilePic} height={40} width={40} />
                                <View style={{marginLeft: 5}}>
                                    <Text style={styles.username}>{username}</Text>
                                    {realName && 
                                        <View style={styles.firstLastContainer}>
                                            <Text style={styles.realName}>{realName}</Text>
                                        </View>
                                    }
                                </View>
                            </View>
                            <View style={styles.chosenVisualContainer}>
                                <View 
                                    style={[
                                        styles.chosenVisual, 
                                        { 
                                            backgroundColor: COLORS.green, 
                                            borderColor: COLORS.grey,
                                        }
                                    ]}
                                    onTouchEnd={() => {accepted(); setProfilePressed(false);}}
                                    onTouchStart={handlePressInAccepted}
                                >
                                    <View style={styles.iconWrapper}>
                                        <Icon name="checkmark" size={25} color={ !chosenPressedAccepted ? COLORS.grey : COLORS.white } />
                                    </View>
                                </View>
                                <View 
                                    style={[
                                        styles.chosenVisual, 
                                        { 
                                            backgroundColor: chosenPressedDenied ? COLORS.primaryLight : 'transparent', 
                                            padding: chosenPressedDenied ? 2 : 2,
                                            borderColor: chosenPressedDenied ? COLORS.primaryLight : COLORS.grey
                                        }
                                    ]}
                                    onTouchEnd={() => {denied(); setProfilePressed(false);}}
                                    onTouchStart={handlePressInDenied}
                                >
                                    <View>
                                        <Icon name="close" size={22} color={ !chosenPressedDenied ? COLORS.grey : COLORS.white } />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </LongPressGestureHandler>
            </GestureHandlerRootView>
        )}
        </>
    );
};

export default ReceivedFriendRequestBox;

const styles = StyleSheet.create({
    eventContainer: {
        width: '100%',
        padding: 10,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderColor: COLORS.greySuperLight,
    },
    profileSlipContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
    },
    nameAndPicContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    chosenVisualContainer: {
        marginLeft: 'auto',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: 10
    },
    iconWrapper: {
        marginHorizontal: 30
    },
    username: {
        fontSize: 16,
        fontFamily: FONTS.Poppins_600
    },
    realName: {
        fontSize: 13,
        color: COLORS.darkgrey,
        fontFamily: FONTS.Poppins_400
    },
    firstLastContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chosenVisual: {
        borderRadius: 50,
        borderWidth: 2,
        backgroundColor: 'transparent',
    },
    directMessagesTitle: {
        fontFamily: FONTS.Poppins_500,
        // marginBottom: 10,
        fontSize: 15
    },
});