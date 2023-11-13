import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, View, SafeAreaView, KeyboardAvoidingView, Pressable, Keyboard } from 'react-native';
import { COLORS, FONTS } from '../constants';
import * as Haptics from 'expo-haptics';

const WriteAMessage = () => {
  const [isPressed, setIsPressed] = useState(false);
  const [message, setMessage] = useState('');
  const [flex, setFlex] = useState(0);
  const [isKeyboardActive, setIsKeyboardActive] = useState(false);
  const [prevHeight, setPrevHeight] = useState(0);

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
        // console.log(currentFlex);
        if(currentFlex >= 1.05) return;

        setTimeout(() => {
            currentFlex += 0.17;
            setFlex(currentFlex);
        }, 20);
    }

    const decreaseFlexOnDeletion = () => {
        let currentFlex = flex;
        // console.log(currentFlex);
        if(currentFlex <= 0.8) return;

        setTimeout(() => {
            currentFlex -= 0.17;
            setFlex(currentFlex);
            if(currentFlex <= 0.8) return;
        }, 20);
    }

    const handleContentSizeChange = (contentHeight) => {
        // console.log(contentHeight);
        if (contentHeight === prevHeight + 22.5 && flex < 0.79 && flex != 0) {
            console.log("wtf is this");
            console.log(flex);
          increaseFlexOnReturn();
        } else if ( prevHeight === contentHeight - 22.5 ) {  decreaseFlexOnDeletion();}
        setPrevHeight(contentHeight);
    };

  return (
    <>
        <Pressable style={styles.backdrop} onPress={() => Keyboard.dismiss()} />
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: flex, zIndex: 2, }}>
            <SafeAreaView style={{ backgroundColor: COLORS.white, flex: 0 }}>
                <TextInput
                    style={styles.input}
                    placeholder="Message"
                    value={message}
                    onChangeText={handleInputChange}
                    onTouchEnd={handleChangeInFlex}
                    onBlur={() => setFlex(0)}
                    multiline={true}
                    onContentSizeChange={(e) =>
                        handleContentSizeChange(e.nativeEvent.contentSize.height)
                    } 
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
    </>
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
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 1,
        backgroundColor: 'transparent'
    },
});