import React from "react";
import { Text, StyleSheet, View } from "react-native";
import Spacer from "../components/Spacer";
import ProfileImage from "../components/ProfileImage";

const LoadingScreen = () => {

  return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <ProfileImage width={150} height={150} />
            <Text>Loading</Text>
            <Spacer height={10} />
        </View>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
    marginBottom: 20,
  },
});

export default LoadingScreen;
