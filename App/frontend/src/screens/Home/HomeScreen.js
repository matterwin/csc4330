import React from "react";
import { StyleSheet, View } from "react-native";
import EventList from "../../components/Home/EventList";
import ContainerNoMargin from "../../components/containers/ContainerNoMargin";

const HomeScreen = ({ navigation }) => {
  return (
    <>
      <ContainerNoMargin>
          <EventList navigation={navigation} />
      </ContainerNoMargin>
    </>
  );
}

const styles = StyleSheet.create({
  addButtonContainer: {
    marginLeft: 'auto',
  },
});

export default HomeScreen;
