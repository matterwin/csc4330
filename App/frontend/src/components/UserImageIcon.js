import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import { COLORS } from '../constants';
import defaultImage from '../../assets/images/circle_grey.png'

const UserImageIcon = ({ focused }) => {
    const user = useSelector(state => state.user);

    return ( 
        <>
            <View>
                
            </View>
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
        width: 70,
        height: 70,
        borderRadius: 50,
        overflow: 'hidden',
    },
    profileIcon: {
        width: '100%',
        height: '100%',
        objectFit: 'contain',
    }
});

export default UserImageIcon;
