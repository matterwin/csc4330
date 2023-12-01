import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import SentFriendRequestList from '../../components/Friend/SentFriendRequestList';
import ReceivedFriendRequestList from '../../components/Friend/ReceivedFriendRequestList';

const chosenOnes = [];

const FriendScreen = ({ navigation }) => {
  const [chosenFriends, setChosenFriends] = useState(chosenOnes);
  const [image, setImage] = useState(null);
  const [clickedCreateChatBtn, setClickedCreateChatBtn] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.listContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.directMessagesTitle}>Received Requests</Text>
          </View>
          <ReceivedFriendRequestList navigation={navigation} chosenFriends={chosenFriends} setChosenFriends={setChosenFriends} setClickedCreateChatBtn={setClickedCreateChatBtn} />
          <View style={styles.titleContainer}>
            <Text style={styles.directMessagesTitle}>Sent Requests</Text>
          </View>
          <SentFriendRequestList navigation={navigation} chosenFriends={chosenFriends} setChosenFriends={setChosenFriends} setClickedCreateChatBtn={setClickedCreateChatBtn} />
        </View>
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
  listContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems:'flex-start',
  },
  titleContainer: {
    display: 'flex',
    margin: 10,
  },
  directMessagesTitle: {
    fontFamily: FONTS.Poppins_500,
    fontSize: 15,
  },
});