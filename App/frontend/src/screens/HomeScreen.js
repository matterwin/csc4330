import React from "react";
import { StyleSheet, View } from "react-native";
import Container from "../components/containers/Container";
import CircleBtn from "../components/CircleBtn";
import Icon from 'react-native-vector-icons/Ionicons';
import EventList from "../components/EventList";

const HomeScreen = ({ navigation }) => {
  return (
    <Container>
      <EventList navigation={navigation} />
      <View style={styles.addButtonContainer}>
      {/* <CircleBtn>
        <Icon name="create" size={24} color="white" />
      </CircleBtn> */}
    </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    marginLeft: 'auto',
  },
});

export default HomeScreen;
