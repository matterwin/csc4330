import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants';
import defaultImage from '../../assets/images/circle_grey.png'

const UserImageIcon = ({ url}) => {
    const user = useSelector(state => state.user);

    return ( 
        <View style={styles.iconContainer}>
            <Image
                source={url ? { uri: url } : defaultImage}
                style={styles.profileIcon}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        width: 50,
        height: 50,
        overflow: 'hidden',
        backgroundColor: 'red',
        borderRadius: 50,
    },
    profileIcon: {
        width: '100%',
        height: '100%',
        objectFit: 'fill',
        aspectRatio: 1
    }
});

export default UserImageIcon;
