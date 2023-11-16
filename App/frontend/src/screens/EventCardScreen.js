import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native";
import ScrollContainer from "../components/containers/ScrollContainer";
import Container from "../components/containers/Container";
import EventCard from "../components/EventCard";

const EventCardScreen = ({ route, navigation }) => {
  const {
    username,
    titleOfEvent,
    place,
    exactLocation,
    timeOfEvent,
    desc,
    privacyType,
  } = route.params;

  return (
    <>
      <ScrollContainer>
        <Container>
          <EventCard
            navigation={navigation}
            noNav={true}
            username={username}
            titleOfEvent={titleOfEvent}
            place={place}
            exactLocation={exactLocation}
            timeOfEvent={timeOfEvent}
            desc={desc}
            privacyType={privacyType}
          />
        </Container>
      </ScrollContainer>
    </>
  );
}

const styles = StyleSheet.create({
  // Your styles here
});

export default EventCardScreen;
