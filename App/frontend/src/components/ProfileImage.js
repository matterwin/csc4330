import React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';

const ProfileImage = ({ width, height }) => {
    const user = useSelector(state => state.user);
    return (
        <Image
            source={user.profilePic ? { uri: user.profilePic } : null}
            style={{ width: width, height: height }}
        />
    );
};

export default ProfileImage;
