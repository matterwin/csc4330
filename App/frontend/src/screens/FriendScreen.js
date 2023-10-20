import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { ROUTES } from '../constants';
import { useDispatch } from 'react-redux';
import Spacer from "../components/Spacer";
import GestureRecognizer from 'react-native-swipe-gestures';

const FriendScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const onSwipeLeft = () => {
    navigation.navigate(ROUTES.HOME);
  };

  const onSwipeRight = () => {
    navigation.navigate(ROUTES.CHAT);
  };

  const config = {
    velocityThreshold: 0.0,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      onSwipeRight={onSwipeRight}
      config={config}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Friend Screen</Text>
        <Spacer height={10} />
      </View>
    </GestureRecognizer>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
});

export default FriendScreen;