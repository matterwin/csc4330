import React from 'react';
import { View, StyleSheet } from 'react-native';
import { COLORS } from '../constants';

const ScreenContainer = ({ bgColor, children }) => {
  return (
    <View style={[styles.container, { backgroundColor: bgColor }]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ScreenContainer;
