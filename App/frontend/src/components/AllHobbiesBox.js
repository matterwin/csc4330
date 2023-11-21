import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS, FONTS } from '../constants';
import UserImageIcon from './UserImageIcon';
import * as Haptics from 'expo-haptics';
import Icon from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView, LongPressGestureHandler } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import { sendFriendRequest } from '../api/handleFriend';

const AllHobbiesBox = ({ navigation, username, realName, profilePic, isTitle, numFriends, setFriends, isFriend, sentRequestTo, receivedRequestFrom }) => {
    const [chosenPressedAccepted, setChosenPressedAccepted] = useState(false);
    const [chosenPressedDenied, setChosenPressedDenied] = useState(false);
    const [profilePressed, setProfilePressed] = useState(false);
    const token = useSelector(state => state.auth.token);
    
    const handlePressInAccepted = () => {
        setProfilePressed(false);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setChosenPressedAccepted(true);

        setTimeout(() => {
            setChosenPressedAccepted(false);
        }, 100);
    };

    const handleProfileTouchOn = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        console.log("pressed profile");

        // bring user to clicked profile
    }

    const send = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        console.log("pressed accept");

        setFriends((prevFriends) => prevFriends.filter((friend) => friend.username !== username));
        sendRequest();
    }

    const sendRequest = async () => {
        try {
            const res = await sendFriendRequest(token, username);
            console.log(res.data.msg);
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
                            { sentRequestTo === false && receivedRequestFrom === false &&
                                (<View style={styles.chosenVisualContainer}>
                                    <View 
                                        style={[
                                            styles.chosenVisual, 
                                            { 
                                                backgroundColor: isFriend ? COLORS.primaryLight : COLORS.green, 
                                                borderColor: COLORS.grey,
                                                padding: isFriend ? 2 : 0
                                            }
                                        ]}
                                        onTouchEnd={() => {send(); setProfilePressed(false);}}
                                        onTouchStart={handlePressInAccepted}
                                    >
                                        <View style={{ marginHorizontal: isFriend ? 0 : 13 }}>
                                            {/* {!isFriend && <Icon name="checkmark" size={25} color={ !chosenPressedAccepted ? COLORS.grey : COLORS.white } />} */}
                                            {!isFriend && <Text style={styles.addText}>Add +</Text> }
                                            {isFriend && <Icon name="person" size={23} color={ COLORS.white } />}
                                        </View>
                                    </View>
                                </View>)
                            }
                            { sentRequestTo === true || receivedRequestFrom === true &&
                                (<View style={styles.chosenVisualContainer}>
                                    <View 
                                        style={[
                                            styles.chosenVisual, 
                                            { 
                                                backgroundColor: isFriend ? COLORS.primaryLight : COLORS.green, 
                                                borderColor: COLORS.grey,
                                                padding: isFriend ? 2 : 0
                                            }
                                        ]}
                                        onTouchEnd={() => {send(); setProfilePressed(false);}}
                                        onTouchStart={handlePressInAccepted}
                                    >
                                        <View style={{ marginHorizontal: isFriend ? 0 : 13 }}>
                                            {/* {!isFriend && <Icon name="checkmark" size={25} color={ !chosenPressedAccepted ? COLORS.grey : COLORS.white } />} */}
                                            {!isFriend && <Text style={styles.addText}>Add +</Text> }
                                            {isFriend && <Icon name="close" size={23} color={ COLORS.white } />}
                                        </View>
                                    </View>
                                </View>)
                            }
                        </View>
                    </View>
                </LongPressGestureHandler>
            </GestureHandlerRootView>
        )}
        </>
    );
};

export default AllHobbiesBox;

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
    addText: {
        fontSize: 17,
        color: COLORS.darkgrey,
        paddingVertical: 2
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