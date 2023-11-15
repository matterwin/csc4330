import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import Container from "../components/containers/Container";
import CircleBtn from "../components/CircleBtn";
import Icon from 'react-native-vector-icons/Ionicons';
import EventList from "../components/EventList";

const DiscoverScreen = ({ navigation }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <Container>
      <EventList />
      <View style={styles.addButtonContainer}>
      <CircleBtn>
        <Icon name="create" size={24} color="white" />
      </CircleBtn>
    </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    marginLeft: 'auto',
  },
});

export default DiscoverScreen;
