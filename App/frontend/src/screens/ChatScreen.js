import React from "react";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { COLORS, FONTS, ROUTES } from '../constants';
import Container from "../components/containers/Container";
import DMList from "../components/DMList";

const ChatScreen = ({ navigation }) => {
    return (
      <>
        <Container>
          <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%' }}>
            <Text style={styles.directMessagesTitle}>Direct Messages</Text>
            <DMList />
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
