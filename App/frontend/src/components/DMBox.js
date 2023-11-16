import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS, FONTS } from '../constants';
import { useDispatch } from 'react-redux';
import { GestureHandlerRootView, LongPressGestureHandler, State } from 'react-native-gesture-handler';
import UserImageIcon from './UserImageIcon';
import { toggleSheet } from '../redux/sheet/sheetActions';
import * as Haptics from 'expo-haptics';

const DMBox = ({ navigation, dmID, username, lastMsg, whoSentLastMsg, isTitle }) => {
    const [isPressed, setIsPressed] = useState(false);
    const dispatch = useDispatch();

    const onLongPress = (event) => {
        setIsPressed(false);
        if (event.nativeEvent.state === State.ACTIVE) {
            setTimeout(() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            }, 30);
            dispatch(toggleSheet());
        }
    };

    const handlePressIn = () => {
        setIsPressed(true);
    };

    const handlePressOut = () => {
        setIsPressed(false);
        navigation.navigate("ChattingDrawer", { dmID, username, lastMsg, whoSentLastMsg });
    };

    return (
        <>
        {isTitle ? (
            <View style={{ width: '100%' }}>
                <View style={{ width: '100%' }}>
                    <View style={[styles.eventContainer, { backgroundColor: COLORS.bgColor, marginBottom: 0, }]}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.directMessagesTitle}>Direct Messages</Text>
                        </View>
                    </View>
                </View>
            </View>
        ) : (
            <GestureHandlerRootView style={{ width: '100%' }}>
                <LongPressGestureHandler
                    onHandlerStateChange={onLongPress}
                    onTouchEnd={handlePressOut}
                    minDurationMs={400}
                    style={{ width: '100%' }}
                >
                    <View style={[styles.eventContainer, { backgroundColor: COLORS.white }]} onTouchStart={handlePressIn} onTouchEnd={handlePressOut}>
                        <View style={styles.nameAndPicContainer}>
                            <UserImageIcon me={true} height={40} width={40} />
                            <View style={{marginLeft: 5}}>
                                <Text style={styles.username}>{username}</Text>
                                <Text style={styles.lastMsg}>{whoSentLastMsg}: {lastMsg}</Text>
                            </View>
                        </View>
                    </View>
                </LongPressGestureHandler>
            </GestureHandlerRootView>
        )}
    </>
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
    directMessagesTitle: {
        fontFamily: FONTS.Poppins_500,
        fontSize: 15,
    },
});

export default DMBox;
