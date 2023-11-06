import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { ROUTES } from '../constants';
import Spacer from "../components/containers/Spacer";
import Container from "../components/containers/Container";
import ScrollContainer from "../components/containers/ScrollContainer";
import DMBox from "../components/DMBox";

const ChatScreen = ({ navigation }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const onSwipeRight= () => {
        navigation.navigate(ROUTES.HOME);
    };

    return (
      <>
        <ScrollContainer>
          <Container>
            <DMBox name="huahwi"/>
            <DMBox name="peter"/>
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
