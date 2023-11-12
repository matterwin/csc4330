import React, { useState } from 'react';
import { Text, StyleSheet, View, Vibration } from 'react-native';
import { COLORS, FONTS } from '../constants';
import { useDispatch } from 'react-redux';
import { GestureHandlerRootView, LongPressGestureHandler, State } from 'react-native-gesture-handler';
import UserImageIcon from './UserImageIcon';
import { toggleSheet } from '../redux/sheet/sheetActions';

const DMBox = ({ navigation, name, lastMsg, whoSentLastMsg }) => {
    const [isPressed, setIsPressed] = useState(false);
    const dispatch = useDispatch();

    const vibratePattern = () => {
        // Your custom vibration pattern
        const pattern = [0, 10]; // Example: [delay, vibrate, delay, vibrate, delay, vibrate, ...]
        Vibration.vibrate(pattern, false); // The 'false' argument means do not repeat the pattern
    };

    const onLongPress = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            vibratePattern();
            dispatch(toggleSheet());
        }
    };

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
    };

    const eventContainerStyle = {
        backgroundColor: isPressed ? 'rgba(0, 0, 0, 0.1)' : '#fff', // Change the background color when pressed
    };

    return (
        <GestureHandlerRootView style={{ width: '100%' }}>
            <LongPressGestureHandler
                onHandlerStateChange={onLongPress}
                minDurationMs={400}
                style={{ width: '100%' }}
            >
                <View style={[styles.eventContainer, eventContainerStyle]} onTouchStart={handlePressIn} onTouchEnd={handlePressOut}>
                    <View style={styles.nameCard}>
                        <View style={styles.nameAndPicContainer}>
                            <UserImageIcon />
                            <View>
                                <Text style={styles.username}>{name}</Text>
                                <Text style={styles.lastMsg}>{whoSentLastMsg}: {lastMsg}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </LongPressGestureHandler>
        </GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
    eventContainer: {
        width: '100%',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    nameAndPicContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    username: {
        fontSize: 16,
        fontFamily: FONTS.Poppins_600
    },
    lastMsg: {
        fontSize: 13,
        color: COLORS.grey,
        fontFamily: FONTS.Poppins_400
    },
});

export default DMBox;
