import React from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../constants';
import * as Haptics from 'expo-haptics';
import { toggleSheet } from '../redux/sheet/sheetActions';
import { useDispatch } from 'react-redux';

const CircleBtn = ({ children, homeBtn, chatBtn, navigation }) => {
  const dispatch = useDispatch();

  const handleOnTouchStart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if(homeBtn) 
      navigation.navigate("CreateEventCard");
    else if(chatBtn) {
      console.log("pressed");
      navigation.navigate("CreateChatScreen");
    }
    // else 
    //   dispatch(toggleSheet());
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
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 2,
    paddingLeft: 4
  },
});

export default CircleBtn;
