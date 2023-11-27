import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import ActualFriendsList from '../../components/Friend/ActualFriendsList';

const chosenOnes = [];

const FriendScreen = () => {
  const [chosenFriends, setChosenFriends] = useState(chosenOnes);
  const [image, setImage] = useState(null);
  const [clickedCreateChatBtn, setClickedCreateChatBtn] = useState(false);

  return (
    <>
        <View style={styles.container}>
          <ActualFriendsList chosenFriends={chosenFriends} setChosenFriends={setChosenFriends} setClickedCreateChatBtn={setClickedCreateChatBtn} />
        </View>
    </>
  );
};

export default FriendScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.bgColor,
        flex: 1,
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