import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants';

const RoomBox = ({ focused }) => {
    const user = useSelector(state => state.user);
    const borderColor = focused ? 'transparent' : 'transparent'

    return ( 
        <View style={styles.iconContainer}>
            <View style={[styles.border, { borderColor }]}>
                <Image
                    source={user.profilePic ? { uri: user.profilePic } : null}
                    style={styles.profileIcon}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        width: 100,
        height: 150,
        overflow: 'hidden',
        borderRadius: 10,
        margin: 10,
        marginTop: 0,
        marginLeft: 0,
        backgroundColor: '#fff'
    },
    border: {
        flex: 1,
        borderWidth: 3,
    },
    profileIcon: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        objectFit: 'cover',
    }
});

export default RoomBox;
