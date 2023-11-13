import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants';
import defaultImage from '../../assets/images/circle_grey.png'

const UserImageIcon = ({ focused }) => {
    const user = useSelector(state => state.user);

    return ( 
        <>
            <View style={styles.iconContainer}>
                <Image
                    source={user.profilePic ? defaultImage : defaultImage}
                    style={styles.profileIcon}
                />
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        width: 50,
        height: 50,
        overflow: 'hidden',
        margin: 0,
        padding: 0,
    },
    profileIcon: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
        margin: 0,
        padding: 0,
    }
});

export default UserImageIcon;
