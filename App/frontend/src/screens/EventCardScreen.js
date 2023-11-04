import React, { useEffect } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { ROUTES, COLORS } from '../constants';
import { setUserData } from "../redux/user/userActions";
import GestureRecognizer from 'react-native-swipe-gestures';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollContainer from "../components/containers/ScrollContainer";
import Container from "../components/containers/Container";
import EventCard from "../components/EventCard";

const EventScreen = ({ navigation }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    navigation.setOptions({ title: 'Updated!' }); // Set the header title
  }, []); // Ensure it only runs once

  return (
    <>
      <ScrollContainer>
        <Container>
          <EventCard navigation={navigation} />
        </Container>
      </ScrollContainer>
    </>
  );
}

const styles = StyleSheet.create({
  // Your styles here
});

export default EventScreen;
