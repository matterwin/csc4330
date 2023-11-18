import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS, FONTS } from '../constants';
import UserImageIcon from './UserImageIcon';
import * as Haptics from 'expo-haptics';
import Icon from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView, LongPressGestureHandler, State } from 'react-native-gesture-handler';
import { toggleSheet } from '../redux/sheet/sheetActions';
import { useDispatch } from 'react-redux';

const ActualFriendsBox = ({ navigation, username, firstName, lastName, chosenFriends, setChosenFriends, isTitle, numFriends }) => {
    const [chosenPressed, setChosenPressed] = useState(false);
    const dispatch = useDispatch();
    
    const handlePressIn = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setChosenPressed(prev => !prev);
    };

    const onLongPress = (event) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            setTimeout(() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy)
            }, 30);
            dispatch(toggleSheet());
        }
    };

    const handlePressOut = () => {
        if(chosenPressed) {
            setChosenFriends(prev => [...prev, username])
        } else {
            setChosenFriends(chosenFriends.filter((f) => f !== username));
        }
    };
    
    return (
        <>
        {isTitle ? (
            <View style={[styles.eventContainer, { backgroundColor: 'transparent', borderBottomWidth: 0 }]} >
                <View style={styles.nameAndPicContainer}>
                    <Text style={styles.directMessagesTitle}>Friends - {numFriends-1}</Text>
                </View>
            </View>
        ) : (
            <GestureHandlerRootView style={{ width: '100%' }}>
                <LongPressGestureHandler
                    onHandlerStateChange={onLongPress}
                    onTouchEnd={handlePressOut}
                    minDurationMs={300}
                    style={{ width: '100%' }}
                >
                    <View 
                        style={[styles.eventContainer, { backgroundColor: 'transparent' }]} 
                        onTouchCancel={handlePressOut} 
                        onTouchStart={handlePressIn} 
                        onTouchEnd={handlePressOut}
                    >
                        <View style={styles.nameAndPicContainer}>
                            <UserImageIcon me={true} height={40} width={40} />
                            <View style={{marginLeft: 5}}>
                                <Text style={styles.username}>{username}</Text>
                                <View style={styles.firstLastContainer}>
                                    <Text style={styles.realName}>{firstName}</Text>
                                    <Text style={styles.realName}>{lastName}</Text>
                                </View>
                            </View>
                            <View 
                                style={[
                                    styles.chosenVisual, 
                                    { 
                                        backgroundColor: chosenPressed ? COLORS.primaryLight : 'transparent', 
                                        padding: chosenPressed ? 2 : 12,
                                        borderColor: chosenPressed ? COLORS.primaryLight : COLORS.grey
                                    }
                                ]}
                            >
                                {chosenPressed && <Icon name="checkmark" size={22} color="white" /> }
                            </View>
                        </View>
                    </View>
                </LongPressGestureHandler>
            </GestureHandlerRootView>
        )}
        </>
    );
};

export default ActualFriendsBox;

const styles = StyleSheet.create({
    eventContainer: {
        width: '100%',
        padding: 10,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderColor: COLORS.greySuperLight
    },
    nameAndPicContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%'
    },
    username: {
        fontSize: 16,
        fontFamily: FONTS.Poppins_600
    },
    realName: {
        fontSize: 13,
        color: COLORS.darkgrey,
        fontFamily: FONTS.Poppins_400
    },
    firstLastContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    chosenVisual: {
        borderRadius: 50,
        borderWidth: 2,
        backgroundColor: 'transparent',
        marginLeft: 'auto'
    },
    directMessagesTitle: {
        fontFamily: FONTS.Poppins_500,
        // marginBottom: 10,
        fontSize: 15
    },
});