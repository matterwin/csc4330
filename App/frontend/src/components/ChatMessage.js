import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS, FONTS } from '../constants';
import UserImageIcon from './UserImageIcon';
import { useSelector } from 'react-redux';

const ChatMessage = ({ navigation, name, url, msgSent, sentDate }) => {
    const user = useSelector(state => state.user);
    const isCurrentUser = name === user.username;

    if(isCurrentUser) {
        return (
            <View style={styles.chatMsgContainer}>
                <View style={[styles.nameAndPicContainer, { justifyContent: 'flex-end' }]}>
                    <View style={{marginRight: 10}}>
                        <View style={[styles.nameContainer, { justifyContent: 'flex-end' }]}>
                            <Text style={styles.username}>{name}</Text>
                        </View>
                        <View style={[styles.msgSentContainer, { backgroundColor: COLORS.primaryLight, borderTopLeftRadius: 12, borderTopRightRadius: 0}]}>
                            <Text style={[styles.msgSent, { color: COLORS.white}]}>{msgSent}</Text>
                        </View>
                        <View style={[styles.dateContainer, { justifyContent: 'flex-end' }]}>
                            <Text style={styles.sentDate}>{sentDate}</Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    return (
        <View style={ styles.chatMsgContainer }>
            <View style={styles.nameAndPicContainer}>
                <UserImageIcon url={user.profilePic} height={35} width={35}/>
                <View style={{marginLeft: 5}}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.username}>{name}</Text>
                    </View>
                    <View style={styles.msgSentContainer}>
                        <Text style={styles.msgSent}>{msgSent}</Text>
                    </View>
                    <View style={styles.dateContainer}>
                        <Text style={styles.sentDate}>{sentDate}</Text>
                    </View>
                </View>
            </View>
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
        borderTopLeftRadius: 0
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
