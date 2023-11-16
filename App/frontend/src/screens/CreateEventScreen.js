import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import { ROUTES } from '../constants';
import Spacer from "../components/containers/Spacer";
import Container from "../components/containers/Container";

const CreateEventScreen = ({ navigation }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const onSwipeRight= () => {
        navigation.navigate(ROUTES.HOME);
    };

    return (
        <Container>
            <Text>Create Event Screen</Text>
            <Spacer height={10} />
        </Container>
    );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
});

export default CreateEventScreen;
