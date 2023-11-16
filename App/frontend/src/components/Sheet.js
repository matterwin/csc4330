import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity } from 'react-native';
import Animated, { SlideInDown, SlideOutDown, SlideInUp, SlideOutUp, SlideInLeft, SlideOutLeft, FadeOut, SlideInRight } from 'react-native-reanimated';
import FriendList from './FriendList';
import { COLORS, FONTS } from '../constants';
import Btn from './Btn';
import UploadImage from './UploadImage';

const Sheet = () => {
  const [chosenFriends, setChosenFriends] = useState(0);
  const [titleSheet, setTitleSheet] = useState("Direct Message");
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if(chosenFriends > 1) setTitleSheet("Group Channel");
    else setTitleSheet("Direct Message");
  }, [chosenFriends])

  return (
    <Animated.View style={[styles.sheet]} entering={SlideInDown} exiting={SlideOutDown}>
      <SafeAreaView>
        <View style={styles.messageFriendsContainer}>
          <Text style={styles.title}>{titleSheet}</Text>
          <View style={styles.bar}></View>
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
          <View style={styles.shiftRight}>
            <Text style={styles.friendsTitle}>Friends</Text>
          </View>
          <FriendList chosenFriends={chosenFriends} setChosenFriends={setChosenFriends} />
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
});

export default Sheet;



// if the chosenFriends > 1, then bring up another page to create a channel where you would give the channel a name and shit like that



// maybe just have a insert channel name text input above the friendslist, like on insta gram if chosenFriends > 1
// else just keep it as is, since the header title would be either the individual friend or group name



// add in checkbox inside the container for the friends chat selection <ion-icon name="checkbox"></ion-icon>