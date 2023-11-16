import React, { useState } from 'react';
import { Text, StyleSheet, View } from "react-native";
import { COLORS, FONTS } from '../constants';
import * as Haptics from 'expo-haptics';

const Btn = ({ words, chosenFriends, setClickedCreateChatBtn}) => {
    const [isPressed, setIsPressed] = useState(false);

    const handleOnTouchStart = () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
      setIsPressed(true);
      if(chosenFriends.length === 0) return;
      setClickedCreateChatBtn(true);
    }

    const handleOnTouchEnd = () => {
        setIsPressed(false);
    }

    const backgroundColor = chosenFriends.length === 0 ? 'rgba(0, 0, 0, 0.3)' : isPressed ? COLORS.primary : COLORS.primaryLight;
    
    return (
        <View 
            style={[ styles.sendBtn, { backgroundColor: backgroundColor },]} 
            onTouchStart={handleOnTouchStart} onTouchEnd={handleOnTouchEnd}
        >
            <Text style={styles.btnText}>{words}</Text>
        </View>
    )
}

export default Btn;

const styles = StyleSheet.create({
    sendBtn: {
        borderRadius: 10,
        paddingVertical: 13,
        alignItems: 'center',
    },
    btnText: {
        fontFamily: FONTS.Poppins_600,
        color: '#fff',
        fontSize: 15,
    },
});