import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { SlideOutDown, SlideInDown } from 'react-native-reanimated';

const Sheet = () => {
  return (
    <Animated.View style={styles.sheet} entering={SlideInDown} leaving={SlideOutDown}>
      <Text>Hi there</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: "white",
    padding: 16,
    height: 220,
    width: "100%",
    position: "absolute",
    bottom: -20 * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },
});

export default Sheet;
