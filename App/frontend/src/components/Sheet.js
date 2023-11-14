import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import Animated, { SlideInDown, SlideOutDown} from 'react-native-reanimated';
import FriendList from './FriendList';
import { COLORS, FONTS } from '../constants';
import Btn from './Btn';

const Sheet = () => {
  const [chosenFriends, setChosenFriends] = useState(0);

  return (
    <Animated.View style={[styles.sheet]} entering={SlideInDown} exiting={SlideOutDown}>
      <SafeAreaView>
        <View style={styles.messageFriendsContainer}>
          <Text style={styles.friendsTitle}>Friends</Text>
          <View style={styles.bar}></View>
          <FriendList chosenFriends={chosenFriends} setChosenFriends={setChosenFriends} />
          <View style={{ width: "100%", marginBottom: 20 }}>
            <Btn words={"Create Chat"} chosenFriends={chosenFriends}/>
          </View>
        </View>
      </SafeAreaView>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: COLORS.white,
    padding: 10,
    width: "100%",
    height:"90%",
    position: "absolute",
    bottom: -20 * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
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
    fontFamily: FONTS.Poppins_500,
    marginBottom: 10,
    fontSize: 18
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
});

export default Sheet;
