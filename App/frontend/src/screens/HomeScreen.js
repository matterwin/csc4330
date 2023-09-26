import React from "react";
import { Text, StyleSheet, View } from "react-native";

function HomeScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default HomeScreen;