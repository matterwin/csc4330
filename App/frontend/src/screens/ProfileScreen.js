import React from "react";
import { Text, StyleSheet, View } from "react-native";
import { useDispatch } from 'react-redux';
import Spacer from "../components/Spacer";
import GestureRecognizer from 'react-native-swipe-gestures';
import ProfileImage from "../components/ProfileImage";

const ProfileScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  const onSwipeRight = () => {
    navigation.navigate("Map");
  };

  const config = {
    velocityThreshold: 0.0,
    directionalOffsetThreshold: 80,
  };

  return (
    <GestureRecognizer
      onSwipeRight={onSwipeRight}
      config={config}
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Profile Screen</Text>
        <ProfileImage width={150} height={150} />
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

export default ProfileScreen;
