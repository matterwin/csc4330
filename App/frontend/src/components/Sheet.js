import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import Animated, { SlideInDown, SlideOutDown} from 'react-native-reanimated';
import FriendList from './FriendList';
import { COLORS, FONTS } from '../constants';
import Btn from './Btn';
import CreateGroup from './CreateGroup';

const Sheet = () => {
  const [chosenFriends, setChosenFriends] = useState(0);
  const [titleSheet, setTitleSheet] = useState("Direct Message")

  useEffect(() => {
    console.log(chosenFriends);
    if(chosenFriends > 1) setTitleSheet("Group Channel");
    else setTitleSheet("Direct Message");
  }, [chosenFriends])

  return (
    <Animated.View style={[styles.sheet]} entering={SlideInDown} exiting={SlideOutDown}>
      <SafeAreaView>
        <View style={styles.messageFriendsContainer}>
          <Text style={styles.friendsTitle}>{titleSheet}</Text>
          <View style={styles.bar}></View>
          <View>
            <TextInput 
              placeholder='Enter Group Name'
            />
          </View>
          <View style={styles.shiftRight}>
            <Text style={styles.friendsTitle}>Friends</Text>
          </View>
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
  createChannelNameInput: {

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
    fontFamily: FONTS.Poppins_700,
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
  shiftRight: {
    marginRight: 'auto'
  },
});

export default Sheet;



// if the chosenFriends > 1, then bring up another page to create a channel where you would give the channel a name and shit like that



// maybe just have a insert channel name text input above the friendslist, like on insta gram if chosenFriends > 1
// else just keep it as is, since the header title would be either the individual friend or group name



// add in checkbox inside the container for the friends chat selection <ion-icon name="checkbox"></ion-icon>