import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS, FONTS } from '../constants';
import UserImageIcon from './UserImageIcon';
import { useSelector } from 'react-redux';

const ChatMessage = ({ navigation, name, url, msgSent, sentDate }) => {
    const user = useSelector(state => state.user);

    return (
        <View style={styles.chatMsgContainer}>
            <View style={styles.nameAndPicContainer}>
                <UserImageIcon url={user.profilePic}/>
                <View>
                    <View style={styles.nameAndDate}>
                        <Text style={styles.username}>{name}</Text>
                        <Text style={styles.sentDate}>{sentDate}</Text>
                    </View>
                    <Text style={styles.msgSent}>{msgSent}</Text>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chatMsgContainer: {
        marginBottom: 7,
        width: '100%',
    },
    nameAndPicContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '90%'
    },
    username: {
        fontSize: 14,
        fontFamily: FONTS.Poppins_600,
        marginRight: 5
    },
    msgSent: {
        fontSize: 13,
        color: COLORS.dark,
        fontFamily: FONTS.Poppins_400,
    },
    sentDate: {
        color: COLORS.black,
        fontSize: 11,
    },
    nameAndDate: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
});

export default ChatMessage;
