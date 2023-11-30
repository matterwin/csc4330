import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import UserImageIcon from '../Upload/UserImageIcon';
import * as Haptics from 'expo-haptics';
import Icon from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView, LongPressGestureHandler, State } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { addInvitedUser, removeInvitedUser } from '../../redux/invites/invitesActions';

const InviteFriendsBox = ({ navigation, username, realName, chosenFriends, setChosenFriends, profilePic, isTitle, numFriends }) => {
    const [chosenPressed, setChosenPressed] = useState(false);
    const [profilePressed, setProfilePressed] = useState(false);
    const dispatch = useDispatch();
    const invitedUsers = useSelector(state => state.invites.invitedUsers);

    useEffect(() => {
        // Check if the current user is already invited
        setChosenPressed(invitedUsers.includes(username));
    }, [invitedUsers, username]);
    
    const handlePressIn = () => {
        setProfilePressed(false);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setChosenPressed(prev => !prev);
    };

    const handlePressOut = () => {
        if(chosenPressed) {
            setChosenFriends(prev => [...prev, username]);
            dispatch(addInvitedUser(username));
        } else {
            setChosenFriends(chosenFriends.filter((f) => f !== username));
            dispatch(removeInvitedUser(username));
        }
    };

    const handleProfileTouchOn = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    return (
        <>
            <GestureHandlerRootView style={{ width: '100%' }}>
                <LongPressGestureHandler
                    minDurationMs={300}
                    style={{ width: '100%' }}
                >
                    <View 
                        style={[styles.eventContainer, { backgroundColor: profilePressed ? COLORS.green : 'transparent' }]}
                        onTouchStart={handlePressIn}
                        onTouchEnd={handlePressOut}
                    >
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
                            <View
                                style={[
                                    styles.chosenVisual, 
                                    { 
                                        backgroundColor: chosenPressed ? COLORS.primaryLight : 'transparent', 
                                        padding: chosenPressed ? 2 : 12,
                                        borderColor: chosenPressed ? COLORS.primaryLight : COLORS.grey
                                    }
                                ]}

                            >
                                {chosenPressed && <Icon name="checkmark" size={22} color="white" /> }
                            </View>
                        </View>
                    </View>
                </LongPressGestureHandler>
            </GestureHandlerRootView>
        </>
    );
};

export default InviteFriendsBox;

const styles = StyleSheet.create({
    eventContainer: {
        width: '100%',
        padding: 10,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderColor: COLORS.greySuperLight
    },
    nameAndPicContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
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
        marginLeft: 'auto'
    },
    directMessagesTitle: {
        fontFamily: FONTS.Poppins_500,
        // marginBottom: 10,
        fontSize: 15
    },
});