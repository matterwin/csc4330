import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import defaultImage from '../../assets/images/circle_grey.png'

const ProfileImage = ({ width, height }) => {
    const user = useSelector(state => state.user);
    return (
        <Image
            source={ defaultImage }
            style={{ width: width, height: height }}
        />
    );
};

export default ProfileImage;
