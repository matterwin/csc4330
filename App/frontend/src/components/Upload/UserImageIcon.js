import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { useSelector } from 'react-redux';
import defaultImage from '../../../assets/images/circle_default.png'

const UserImageIcon = ({ url, me, height, width }) => {
    const user = useSelector(state => state.user);

    return ( 
        <View style={[styles.iconContainer, { width: width, height: height }]}>
            <Image
                source={url ? { uri: url } : me ? {uri: user.profilePic} : defaultImage}
                style={[styles.profileIcon, { height: me ? "100%" : "165%" }]}
                resizeMode='cover'
            />
        </View>
    );
};

const styles = StyleSheet.create({
    iconContainer: {
        borderRadius: "100%",
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    },
    profileIcon: {
        width: "100%",
        height: "165%",
    }
});

export default UserImageIcon;
