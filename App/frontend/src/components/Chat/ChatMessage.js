import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import UserImageIcon from '../Upload/UserImageIcon';
import { useSelector } from 'react-redux';
import Animated, { SlideInDown } from 'react-native-reanimated';

const ChatMessage = ({ navigation, username, url, msgSent, sentDate, isNewMessage }) => {
    const user = useSelector(state => state.user);
    const isCurrentUser = username === user.username;

    if(isNewMessage) console.log(msgSent);

    if(isCurrentUser) {
        return (
            <View style={styles.chatMsgContainer}>
                <Animated.View style={[styles.nameAndPicContainer, { justifyContent: 'flex-end' }]} entering={isNewMessage ? SlideInDown : undefined}>
                    <View style={{ marginRight: 10 }}>
                        <View style={[styles.nameContainer, { justifyContent: 'flex-end' }]}>
                            <Text style={[styles.username, { marginRight: 0, }]}>{username}</Text>
                        </View>
                        <View style={[styles.msgSentContainer, { backgroundColor: COLORS.primaryLight, borderTopLeftRadius: 12, borderTopRightRadius: 0, alignSelf: 'flex-end',}]}>
                            <Text style={[styles.msgSent, { color: COLORS.white}]}>{msgSent}</Text>
                        </View>
                        <View style={[styles.dateContainer, { justifyContent: 'flex-end' }]}>
                            <Text style={styles.sentDate}>{sentDate}</Text>
                        </View>
                    </View>
                </Animated.View>
            </View>
        );
    }

    return (
        <View style={ styles.chatMsgContainer }>
            <Animated.View style={[styles.nameAndPicContainer]} entering={isNewMessage ? SlideInDown : undefined}>
                <UserImageIcon url={user.profilePic} height={35} width={35}/>
                <View style={{marginLeft: 5}}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.username}>{username}</Text>
                    </View>
                    <View style={styles.msgSentContainer}>
                        <Text style={styles.msgSent}>{msgSent}</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.sentDate}>{sentDate}</Text>
                    </View>
                </View>
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    chatMsgContainer: {
        marginBottom: 12,
        width: '100%',
    },
    nameAndPicContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '100%',
    },
    username: {
        fontSize: 13,
        fontFamily: FONTS.Poppins_500,
        marginRight: 5,
        color: COLORS.darkgrey,
        marginBottom: 2,
    },
    msgSentContainer : {
        backgroundColor: COLORS.white,
        padding: 10,
        borderRadius: 12,
        borderTopLeftRadius: 0,
        alignSelf: 'flex-start',
    },
    msgSent: {
        fontSize: 15,
        color: COLORS.dark,
        fontFamily: FONTS.Poppins_400,
    },
    sentDate: {
        marginTop: 2,
        color: COLORS.black,
        fontSize: 10,
    },
    nameContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    dateContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
});

export default ChatMessage;
