import React, { useState } from 'react';
import { Text, StyleSheet, View, Image, Vibration } from 'react-native';
import { COLORS, ROUTES } from '../constants';
import ProfileImage from './ProfileImage';
import { GestureHandlerRootView, LongPressGestureHandler, State } from 'react-native-gesture-handler';

const DMBox = ({ navigation, name }) => {
    const [isPressed, setIsPressed] = useState(false);
    const onLongPress = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            Vibration.vibrate(0);
          alert(`I've been pressed for 800 milliseconds for ${name}`);
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
                            <ProfileImage width={70} height={70}/>
                            <View>
                                <Text style={styles.username}>{name}</Text>
                                <Text style={styles.lastMsg}>You: just making sure everything is fine</Text>
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
        fontSize: 14,
    },
    lastMsg: {
        fontSize: 12,
        color: COLORS.grey,
    },
});

export default DMBox;
