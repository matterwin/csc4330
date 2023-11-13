import React, { useEffect } from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { COLORS, FONTS, ROUTES } from '../constants';
import Container from "../components/containers/Container";
import DMList from "../components/DMList";
import ChattingScreen from "./ChattingScreen";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useDispatch } from 'react-redux';
import { showBottomNav, hideBottomNav } from '../redux/nav/navActions';

const ChatScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(showBottomNav());
  // }, []);

  const handleLeavePage = () => {
    // dispatch(hideBottomNav());
    navigation.navigate("ChattingDrawer");
  }

  return (
    <>
      <Container>
        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%' }}>
          <Text style={styles.directMessagesTitle}>Direct Messages</Text>
          <DMList />
          <TouchableOpacity onPress={handleLeavePage}><Text>chatting</Text></TouchableOpacity>
        </View>
      </Container>
    </>
  );
}

const styles = StyleSheet.create({
  directMessagesTitle: {
    fontFamily: FONTS.Poppins_500,
    marginBottom: 10,
    fontSize: 15
  },
});

export default ChatScreen;
