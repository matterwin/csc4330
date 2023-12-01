import React from "react";
import { StyleSheet } from "react-native";
import ScrollContainer from "../../components/containers/ScrollContainer";
import EventCard from "../../components/Home/EventCard";
import ContainerNoMargin from "../../components/containers/ContainerNoMargin";
import FocusedEventCardList from "../../components/Home/FocusedEventCardList";

const EventCardScreen = ({ route, navigation }) => {
  const {
    eventId
  } = route.params;

  navigation.removeListener();

  return (
    <>
      <ContainerNoMargin>
        <FocusedEventCardList eventId={eventId} navigation={navigation} />
      </ContainerNoMargin>
    </>
  );
}

const styles = StyleSheet.create({

});

export default EventCardScreen;
