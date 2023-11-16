import React, { useState, useEffect } from 'react';
import { Text, TextInput, StyleSheet, View, SafeAreaView, KeyboardAvoidingView, Keyboard } from 'react-native';
import { COLORS, FONTS } from '../constants';
import * as Haptics from 'expo-haptics';
import { useSelector } from 'react-redux';

const WriteAMessage = ({ appendMessage, lastMsgSendId }) => {
  const [isPressed, setIsPressed] = useState(false);
  const [message, setMessage] = useState('');
  const [flex, setFlex] = useState(0);
  const [prevHeight, setPrevHeight] = useState(0);
  const user = useSelector(state => state.user);

  const handleOnTouchStart = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsPressed(true);
    handleSend();
  };

  const handleSend = () => {
    const newMessage = {
        id: ++lastMsgSendId, // replace with your logic for generating unique IDs
        username: user.username, // replace with the sender's name
        url: 'bs',
        msgSent: message,
        sentDate: new Date().toLocaleString(),
      };
  
      // Call the function passed as a prop to append the new message
      appendMessage(newMessage);
  
      // Clear the input field after sending the message
      setMessage('');
  }

  const handleOnTouchEnd = () => {
    setIsPressed(false);
  };

  const handleInputChange = (text) => {
    setMessage(text);
  };

  const handleChangeInFlex = () => {
    let currentFlex = 0;

    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            currentFlex += 0.1;
            setFlex(currentFlex);
        }, 20);
    }
  };

    const increaseFlexOnReturn = () => {
        if(isPressed) return;
        let currentFlex = flex;
        // console.log(currentFlex);
        if(currentFlex >= 2) return;

        setTimeout(() => {
            currentFlex += 0.1;
            setFlex(currentFlex);
        }, 20);
    }

    const decreaseFlexOnDeletion = () => {
        if(isPressed) return;
        let currentFlex = flex;
        // console.log(currentFlex);
        if(currentFlex <= 0.7) return;

        setTimeout(() => {
            currentFlex -= 0.1;
            setFlex(currentFlex);
        }, 20);
    }

    const handleContentSizeChange = (contentHeight) => {
        if(contentHeight === 22.5 && !isPressed){
            setPrevHeight(contentHeight);
            return;
        }
        
        if(contentHeight === prevHeight + 22.5 && contentHeight <= 67.5){
            console.log(contentHeight);
            setPrevHeight(contentHeight);
            increaseFlexOnReturn();
        }

        if(contentHeight === prevHeight - 22.5 && contentHeight >= 45){
            console.log(contentHeight);
            console.log(" here in delete");
            setPrevHeight(contentHeight);
            decreaseFlexOnDeletion();
        }
    };

    return (
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ display: 'flex', flex: 0, zIndex: 1, backgroundColor: COLORS.bgColor }}>
            {/* <SafeAreaView style={{ backgroundColor: COLORS.bgColor }}> */}
                <TextInput
                    style={styles.input}
                    placeholder="Type your message here ..."
                    placeholderTextColor={COLORS.black}
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
            {/* </SafeAreaView> */}
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
        borderColor: COLORS.grey,
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