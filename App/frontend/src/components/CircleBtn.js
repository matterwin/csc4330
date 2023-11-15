import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../constants';
import * as Haptics from 'expo-haptics';
import { toggleSheet } from '../redux/sheet/sheetActions';
import { useDispatch } from 'react-redux';

const CircleBtn = ({ children }) => {
  const dispatch = useDispatch();

  const handleOnTouchStart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    console.log("pressed");
    dispatch(toggleSheet());
  };

  return (
    <View style={styles.buttonContainer} onTouchStart={handleOnTouchStart}>
        {children}
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 50,
    width: 55,
    height: 55,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 2,
  },
});

export default CircleBtn;
