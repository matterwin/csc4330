import React, { useState } from 'react';
import { Text, StyleSheet, View } from "react-native";
import { COLORS, FONTS } from '../constants';
import * as Haptics from 'expo-haptics';

const Btn = () => {
    const [isPressed, setIsPressed] = useState(false);

    const handleOnTouchStart = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setIsPressed(true);
    }

    const handleOnTouchEnd = () => {
        setIsPressed(false);
    }

    return (
        <View 
            style={[ styles.sendBtn, { backgroundColor: isPressed ? COLORS.primary : COLORS.primaryLight },]} 
            onTouchStart={handleOnTouchStart} onTouchEnd={handleOnTouchEnd}
        >
            <Text style={styles.btnText}>Send</Text>
        </View>
    )
}

export default Btn;

const styles = StyleSheet.create({
    sendBtn: {
        borderRadius: 10,
        paddingVertical: 10,
        width: '100%',
        backgroundColor: COLORS.primary,
        alignItems: 'center',
    },
    btnText: {
        fontFamily: FONTS.Poppins_600,
        color: '#fff',
        fontSize: 15,
    },
});