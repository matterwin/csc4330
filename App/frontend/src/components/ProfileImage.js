import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import grey from '../../assets/images/circle_grey.png'
import purple from '../../assets/images/circle_purple.png'

const ProfileImage = ({ width, height, focused }) => {
    const user = useSelector(state => state.user);
    return (
        <Image
            source={ focused ? purple : grey }
            style={{ width: width, height: height }}
        />
    );
};

export default ProfileImage;
