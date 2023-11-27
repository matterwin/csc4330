import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../../constants';

const ProfileIcon = ({ focused }) => {
    const user = useSelector(state => state.user);
    const backgroundColor = focused ? COLORS.primary : COLORS.grey;

    return ( 
        <View style={[styles.iconContainer, { backgroundColor }]}>
            <Image
                source={user.profilePic ? { uri: user.profilePic } : null}
                style={styles.profileIcon}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        width: 50,
        height: 50,
        borderRadius: 50,
        overflow: 'hidden',
        backgroundColor: COLORS.grey
    },
    profileIcon: {
        width: '100%',
        height: '100%',
        borderRadius: 50,
        objectFit: 'contain',
    }
});

export default ProfileIcon;
