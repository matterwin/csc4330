import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants';

const ProfileIcon = ({ focused }) => {
    const user = useSelector(state => state.user);
    const borderColor = focused ? COLORS.primary : COLORS.grey;

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
        width: 35,
        height: 35,
        borderRadius: 50,
        overflow: 'hidden',
    },
    border: {
        flex: 1,
        borderWidth: 3,
        borderRadius: 50,
    },
    profileIcon: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        objectFit: 'cover',
    }
});

export default ProfileIcon;
