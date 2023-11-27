import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { SlideInDown } from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';

const RegularSheet = () => {
  const pan = Gesture.Pan();

  return (
    <Animated.View style={styles.sheet} entering={SlideInDown} leaving={SlideInDown}>
      <Text>Hi there</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: "white",
    padding: 16,
    height: 500,
    width: "100%",
    position: "absolute",
    bottom: -20 * 1.1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1,
  },
});

export default RegularSheet;
