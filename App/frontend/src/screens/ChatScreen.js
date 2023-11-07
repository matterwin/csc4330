import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { COLORS, ROUTES } from '../constants';
import Spacer from "../components/containers/Spacer";
import Container from "../components/containers/Container";
import ScrollContainer from "../components/containers/ScrollContainer";
import DMBox from "../components/DMBox";
import { TouchableOpacity } from "react-native-gesture-handler";
import RoomBox from "../components/RoomBox";
import RoomList from "../components/RoomList";

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
            <View style={styles.roomContainer}>
              <TouchableOpacity style={styles.btn}><Text>Messages</Text></TouchableOpacity>
              <TouchableOpacity style={styles.btn}><Text>Rooms</Text></TouchableOpacity>
            </View>
            <DMBox name="huahwi"/>
            <DMBox name="peter"/>
          </Container>
        </ScrollContainer>
      </>
    );
}

const styles = StyleSheet.create({
  roomContainer: {
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'red'
  },
  btn: {
    flex: 1,
    backgroundColor: COLORS.green,
    borderRadius: 10
  },
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
});

export default ChatScreen;
