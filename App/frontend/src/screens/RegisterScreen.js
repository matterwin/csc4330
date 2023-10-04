import React from "react";
import { Text, StyleSheet, View } from "react-native";

const RegisterScreen = ({ navigation }) => {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Register Screen</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 30,
  },
});

export default RegisterScreen;