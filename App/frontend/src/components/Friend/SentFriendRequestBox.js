import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import UserImageIcon from '../Upload/UserImageIcon';
import * as Haptics from 'expo-haptics';
import Icon from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView, LongPressGestureHandler } from 'react-native-gesture-handler';
import { cancelFriendRequest } from '../../api/handleFriend';
import { useSelector } from 'react-redux';

const SentFriendRequestBox = ({ navigation, username, realName, profilePic, isTitle, numFriends, setFriends }) => {
    const [chosenPressed, setChosenPressed] = useState(false);
    const [profilePressed, setProfilePressed] = useState(false);
    const token = useSelector(state => state.auth.token);
    
    const handlePressIn = () => {
        setProfilePressed(false);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setChosenPressed(true);

        setTimeout(() => {
            setChosenPressed(false);
        }, 100);
    };

    const handleProfileTouchOn = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        console.log("pressed profile");

        // navigation.navigate('RootNav', {
        //     screen: 'OtherUserProfileScreen',
        //     params: {searchedUser: username },
        // })
    }

    const cancelRequest = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
        console.log("pressed cancelled");

        setFriends((prevFriends) => prevFriends.filter((friend) => friend.username !== username));
        delRequest();
    }

    const delRequest = async () => {
        try {
            const res = await cancelFriendRequest(token, username);
            console.log(res.data.msg);
        } finally {}
    };
    
    return (
        <>
        {isTitle ? (
            <View style={[styles.eventContainer, { backgroundColor: COLORS.white, borderBottomWidth: 0 }]} >
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
                        style={[styles.eventContainer, { backgroundColor: COLORS.white }]}
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
                            <View 
                                style={[
                                    styles.chosenVisual, 
                                    { 
                                        backgroundColor: chosenPressed ? COLORS.primaryLight : 'transparent', 
                                        padding: chosenPressed ? 2 : 2,
                                        borderColor: chosenPressed ? COLORS.primaryLight : COLORS.grey
                                    }
                                ]}
                                onTouchEnd={() => {cancelRequest(); setProfilePressed(false);}}
                                onTouchStart={handlePressIn}
                            >
                                <Icon name="close" size={22} color={ !chosenPressed ? COLORS.grey : COLORS.white } />
                            </View>
                        </View>
                    </View>
                </LongPressGestureHandler>
            </GestureHandlerRootView>
        )}
        </>
    );
};

export default SentFriendRequestBox;

const styles = StyleSheet.create({
    eventContainer: {
        width: '100%',
        padding: 10,
        paddingHorizontal: 20,
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