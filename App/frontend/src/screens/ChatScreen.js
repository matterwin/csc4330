import React, { useRef } from "react";
import { Text, StyleSheet, View, Button, PanResponder } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, ROUTES } from '../constants';
import Container from "../components/containers/Container";
import ScrollContainer from "../components/containers/ScrollContainer";
import DMBox from "../components/DMBox";

const ChatScreen = ({ navigation }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    return (
      <>
        <ScrollContainer >
          <Container>
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', width: '100%' }}>
              <Text style={{ marginBottom: 10 }}>Direct Messages</Text>
              <DMBox name="huahwi"/>
              <DMBox name="peter"/>
            </View>
          </Container>
        </ScrollContainer>
      </>
    );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
});

export default ChatScreen;
