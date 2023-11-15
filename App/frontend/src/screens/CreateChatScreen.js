import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Animated, { SlideInLeft, SlideInRight } from 'react-native-reanimated';
import { COLORS, FONTS } from '../constants';
import UploadImage from '../components/UploadImage';
import FriendList from '../components/FriendList';
import Container from '../components/containers/Container';

const CreateChatScreen = () => {
  const [chosenFriends, setChosenFriends] = useState(0);

  return (
    <>
        <View style={styles.container}>
            { chosenFriends > 1 &&
            <View style={[styles.createGroupContainer]}>
                <Animated.View style={{ display: 'flex', width: '50%' }} entering={SlideInLeft}>
                <UploadImage />
                </Animated.View>
                <Animated.View style={{ display: 'flex', width: '50%' }} entering={SlideInRight}>
                <TextInput
                    placeholder='Enter Group Name'
                    style={styles.input}
                    placeholderTextColor={COLORS.black}
                />
                </Animated.View>
            </View>
            }
          <Text style={styles.directMessagesTitle}>Friends</Text>
          <FriendList chosenFriends={chosenFriends} setChosenFriends={setChosenFriends} />
        </View>
    </>
  );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bgColor,
        padding: 10,
        flex: 1
    },
    messageFriendsContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: "100%",
    },
    everythingBesidesButtonContainer: {
        width: '100%'
    },
    friendsTitle: {
        fontFamily: FONTS.Poppins_600,
        marginBottom: 10,
        fontSize: 15
    },
    title: {
        fontFamily: FONTS.Poppins_700,
        marginBottom: 10,
        fontSize: 16
    },
    bar: {
        width: "100%",
        height: 1,
        borderRadius: 50,
        backgroundColor: COLORS.grey,
        marginBottom: 10,
        paddingLeft: 20,
        paddingRight: 20
    },
    shiftRight: {
        marginRight: 'auto'
    },
    createGroupContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: '100%'
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.grey,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 10,
        marginBottom: 10,
        backgroundColor: COLORS.green,
        fontFamily: FONTS.Poppins_500,
        fontSize: 15,
        maxHeight: 100,
        paddingTop: 10,
    },
    directMessagesTitle: {
        fontFamily: FONTS.Poppins_500,
        marginBottom: 10,
        fontSize: 15
    },
});

export default CreateChatScreen;
