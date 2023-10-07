import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useDispatch } from 'react-redux';
import Spacer from "../components/Spacer";
import GestureRecognizer from 'react-native-swipe-gestures';

const ChatScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const onSwipeLeft = () => {
    navigation.navigate("Home");
  };

  const config = {
    velocityThreshold: 0.0,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer
      onSwipeLeft={onSwipeLeft}
      config={config}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Chat Screen</Text>
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

export default ChatScreen;
