import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import Spacer from "../components/Spacer";
import GestureRecognizer from 'react-native-swipe-gestures';

const MapScreen = ({ navigation }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
    const dispatch = useDispatch();

    const onSwipeLeft = () => {
        isAuthenticated ? navigation.navigate("Friend") : navigation.navigate("Login");
    };

    const onSwipeRight= () => {
        navigation.navigate("Home");
    };

    const config = {
        velocityThreshold: 0.0,
        directionalOffsetThreshold: 80,
    };

    return (
        <GestureRecognizer
        onSwipeLeft={onSwipeLeft}
        onSwipeRight={onSwipeRight}
        config={config}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Map Screen</Text>
            <Spacer height={10} />
        </View>
        </GestureRecognizer>
    );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
});

export default MapScreen;
