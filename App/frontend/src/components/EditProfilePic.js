import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import defaultImage from '../../assets/images/circle_default.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants';

const EditProfilePic = ({ url, height, width }) => {
  return (
    <View style={[styles.iconContainer, { width: width, height: height }]}>
      <View style={styles.imageContainer}>
        <Image
          source={url ? { uri: url } : defaultImage}
          style={[styles.profileIcon, { height: url ? "100%" : "165%", opacity: 0.8 }]}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
            <Icon name="camera" size={50} color={COLORS.green} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: "100%",
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  profileIcon: {
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditProfilePic;
