import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import Animated, { SlideInUp, SlideOutUp } from 'react-native-reanimated';
import { COLORS, FONTS } from '../constants';
import UploadImage from '../components/UploadImage';
import FriendList from '../components/FriendList';

const CreateChatScreen = () => {
  const [chosenFriends, setChosenFriends] = useState(0);
  const [message, setMessage] = useState('');

  const handleInputChange = (text) => {
    if (text.length <= 30) {
        setMessage(text);
    }
  };

  return (
    <>
        <View style={styles.container}>
            { chosenFriends > 1 &&
                <View style={[styles.createGroupContainer]}>
                    <Animated.View style={{ display: 'flex', width: '30%' }} entering={SlideInUp} exiting={SlideOutUp}>
                        <UploadImage />
                    </Animated.View>
                    <Animated.View style={{ display: 'flex', width: '70%', marginTop: 20 }} entering={SlideInUp} exiting={SlideOutUp}>
                        <TextInput
                            placeholder='Enter Group Name'
                            style={styles.input}
                            placeholderTextColor={COLORS.black}
                            onChangeText={handleInputChange}
                            value={message}
                        />
                        <Text style={styles.namLen}>{message.length}/30</Text>
                    </Animated.View>
                </View>
            }
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
    namLen: {
        marginLeft: 'auto',
        fontFamily: FONTS.Poppins_400,
        margin: 7
    },
    createGroupContainer: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        marginBottom: 20
    },
    input: {
        padding: 10,
        backgroundColor: COLORS.white,
        fontFamily: FONTS.Poppins_400,
        fontSize: 15,
        maxHeight: 100,
        paddingTop: 10,
        borderRadius: 50
    },
});

export default CreateChatScreen;
