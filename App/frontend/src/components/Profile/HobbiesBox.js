import React, { useState } from 'react';
import { Text, StyleSheet, View, Dimensions } from 'react-native';
import { COLORS, FONTS } from '../../constants';
import UserImageIcon from '../Upload/UserImageIcon';
import * as Haptics from 'expo-haptics';
import Icon from 'react-native-vector-icons/Ionicons';
import { GestureHandlerRootView, LongPressGestureHandler, State } from 'react-native-gesture-handler';
import { toggleSheet } from '../../redux/sheet/sheetActions';
import { useDispatch } from 'react-redux';

const HobbiesBox = ({ navigation, chosenFriends, setChosenFriends, hobby, url }) => {
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
    
    return (
        <>
            <View
                style={styles.item}
            >
                <Text style={styles.itemText}>{hobby}</Text>
            </View>
        </>
    );
};

export default HobbiesBox;

const styles = StyleSheet.create({
    item: {
        backgroundColor: COLORS.darkgrey,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 1,
        height: Dimensions.get('window').width / 3,
    },
    itemText: {
        color: '#fff',
        fontFamily: FONTS.Poppins_400
    },
});