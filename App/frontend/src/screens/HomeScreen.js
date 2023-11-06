import React from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, ScrollView, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/auth/authActions';
import { ROUTES, COLORS } from '../constants';
import { setUserData } from "../redux/user/userActions";
import Spacer from "../components/containers/Spacer";
import GestureRecognizer from 'react-native-swipe-gestures';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ScrollContainer from "../components/containers/ScrollContainer";
import Container from "../components/containers/Container";
import EventCard from "../components/EventCard";

const HomeScreen = ({ navigation }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  return (
    <>
      <ScrollContainer>
        <Container>
          <EventCard navigation={navigation} />
          <EventCard navigation={navigation} />
        </Container>
      </ScrollContainer>
    </>
  );
}

const styles = StyleSheet.create({

});

export default HomeScreen;
