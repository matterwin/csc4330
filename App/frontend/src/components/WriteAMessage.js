import React, { useState } from 'react';
import { Text, TextInput, StyleSheet, View, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { COLORS, FONTS } from '../constants';
import * as Haptics from 'expo-haptics';

const WriteAMessage = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [message, setMessage] = useState('');
  const [flex, setFlex] = useState(0);

  const handleOnTouchStart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsPressed(true);
  };

  const handleOnTouchEnd = () => {
    setIsPressed(false);
  };

  const handleInputChange = (text) => {
    setMessage(text);
  };

  const handleChangeInFlex = () => {
    let currentFlex = 0;

    for (let i = 0; i < 8; i++) {
        setTimeout(() => {
            currentFlex += 0.1;
            setFlex(currentFlex);
        }, 20);
    }
  };

    const increaseFlexOnReturn = () => {
        let currentFlex = flex;
        if(currentFlex >= 1.15) return;

        for (let i = 0; i < 1; i++) {
            setTimeout(() => {
                currentFlex += 0.13;
                setFlex(currentFlex);
            }, 20);
        }
    }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: flex }}>
        <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 0 }}>
            <TextInput
                style={styles.input}
                placeholder="Message"
                value={message}
                onChangeText={handleInputChange}
                onTouchStart={handleChangeInFlex}
                onBlur={() => setFlex(0)}
                onKeyPress={(event) => {
                    if (event.nativeEvent.key === 'Enter') {
                        increaseFlexOnReturn();
                    }
                }}
                multiline={true}
            />
            <View
                style={[ styles.sendBtn, { backgroundColor: isPressed ? COLORS.primary : COLORS.primaryLight },]}
                onTouchStart={handleOnTouchStart}
                onTouchEnd={handleOnTouchEnd}
            >
                <Text style={styles.btnText}>Send</Text>
            </View>
        </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default WriteAMessage;

const styles = StyleSheet.create({
    sendBtn: {
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    btnText: {
        fontFamily: FONTS.Poppins_600,
        color: '#fff',
        fontSize: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.greyLight,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        padding: 10,
        marginBottom: 10,
        width: '100%',
        backgroundColor: COLORS.white,
        fontFamily: FONTS.Poppins_400,
        fontSize: 15,
        maxHeight: 100,
        paddingTop: 10
    },
});