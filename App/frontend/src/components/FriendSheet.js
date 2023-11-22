import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import Animated, { SlideInDown, SlideOutDown, } from 'react-native-reanimated';
import { COLORS, FONTS } from '../constants';
import { useSelector } from 'react-redux';
import * as Haptics from 'expo-haptics';
import { removeFriend } from '../api/handleFriend';
import { toggleSheet } from '../redux/sheet/sheetActions';
import { useDispatch } from 'react-redux';
import { setInfo } from '../redux/info/infoActions';
import { setFetchFlag } from '../redux/fetch/fetchActions';

const FriendSheet = () => {
  const id = useSelector(state => state.info.id);
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);
  const [loading, setLoading] = useState(false);

  const handleOnTouchEnd = () => {
    setLoading(true);
    delFriend(id);
  }

  const handleOnTouchStart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
  }

  const delFriend = async (username) => {
    try {
      const res = await removeFriend(token, username);

      if (res.status === 200) {
        dispatch(setInfo(null));
        dispatch(toggleSheet());
        dispatch(setFetchFlag('Friends'));
        dispatch(setFetchFlag('FriendsList'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Animated.View style={[styles.sheet]} entering={SlideInDown} exiting={SlideOutDown}>
      <SafeAreaView>
        <View style={styles.messageFriendsContainer}>
          <Text style={styles.title}>{id}</Text>
          <View style={styles.bar}></View>
          <View 
            style={[ styles.sendBtn, { backgroundColor: COLORS.danger },]} 
              onTouchStart={handleOnTouchStart}
              onTouchEnd={handleOnTouchEnd}
          >
            <Text style={styles.btnText}>Remove Friend</Text>
          </View>
          {loading && 
            <View style={{ display: 'flex', marginTop: 'auto', marginBottom: 30 }}>
              <ActivityIndicator size="large" color={COLORS.black}/>
            </View> 
          }
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
    height:"30%",
    position: "absolute",
    bottom: -20 * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },
  messageFriendsContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: "100%",
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
  sendBtn: {
    borderRadius: 10,
    paddingVertical: 13,
    alignItems: 'center',
    width: '100%'
  },
  btnText: {
    fontFamily: FONTS.Poppins_600,
    color: '#fff',
    fontSize: 15,
  },
});

export default FriendSheet;