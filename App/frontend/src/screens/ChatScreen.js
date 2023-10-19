import React from "react";
import { useDispatch } from 'react-redux';
import { COLORS, ROUTES } from '../constants';
import GestureRecognizer from 'react-native-swipe-gestures';
import ScreenContainer from "../components/ScreenContainer";
import ChatRoomList from "../components/ChatRoomList";
import { Text, StyleSheet, View, ScrollView } from 'react-native';

const ChatScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const onSwipeLeft = () => {
    navigation.navigate(ROUTES.FRIEND);
  };

  const config = {
    velocityThreshold: 0.0,
    directionalOffsetThreshold: 80,
  };

  // sample data
  const data = [
    { key: 'View 1' },
    { key: 'View 2' },
    { key: 'View 3' },
  ];

  return (
    <>
      <ScreenContainer bgColor={COLORS.primary}>
      <Text>Chats</Text>
        <ChatRoomList data={data} />
        <ScrollView>
        <GestureRecognizer
          onSwipeLeft={onSwipeLeft}
          config={config}
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
        </GestureRecognizer>
        </ScrollView>
        <Text>Direct Messages</Text>
      </ScreenContainer>
    </>
  );
}

const styles = StyleSheet.create({});

export default ChatScreen;
