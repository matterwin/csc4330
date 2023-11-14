import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { COLORS, FONTS } from '../constants';
import UserImageIcon from './UserImageIcon';
import * as Haptics from 'expo-haptics';

const FriendBox = ({ navigation, name, firstName, lastName, chosenFriends, setChosenFriends }) => {
    const [isPressed, setIsPressed] = useState(false);
    const [chosenPressed, setChosenPressed] = useState(false);

    const handlePressIn = () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setIsPressed(true);
        setChosenPressed(prev => !prev);
    };

    const handlePressOut = () => {
        setIsPressed(false);
        setChosenFriends(prev => (chosenPressed ? prev + 1 : prev - 1));
    };

    return (
        <View 
            style={[styles.eventContainer, { backgroundColor: isPressed ? COLORS.primaryLight : 'rgba(0, 0, 0, 0.1)' }]} 
            onTouchCancel={handlePressOut} 
            onTouchStart={handlePressIn} 
            onTouchEnd={handlePressOut}
        >
            <View style={styles.nameAndPicContainer}>
                <UserImageIcon me={true} height={40} width={40} />
                <View style={{marginLeft: 5}}>
                    <Text style={styles.username}>{name}</Text>
                    <View style={styles.firstLastContainer}>
                        <Text style={styles.realName}>{firstName}</Text>
                        <Text style={styles.realName}>{lastName}</Text>
                    </View>
                </View>
                <View style={[styles.chosenVisual, { backgroundColor: chosenPressed ? COLORS.primaryLight : 'transparent' }]}></View>
            </View>
        </View>
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
        padding: 15,
        borderRadius: 5,
        borderColor: COLORS.darkgrey,
        borderWidth: 1,
        backgroundColor: 'transparent',
        marginLeft: 'auto'
    },
});

export default FriendBox;
