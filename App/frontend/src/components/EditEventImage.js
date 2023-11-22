import React from 'react';
import { Image, StyleSheet, View, Text } from 'react-native';
import defaultImage from '../../assets/images/circle_default.png';
import Icon from 'react-native-vector-icons/Ionicons';
import { COLORS, FONTS } from '../constants';

const EditEventImage = ({ url, height, width, image }) => {
  return (
    <View style={[styles.iconContainer, { width: width, height: height }]}>
      <View style={styles.imageContainer}>
        <Image
          source={url ? { uri: url } : defaultImage}
          style={[styles.profileIcon, { height: url ? "100%" : "165%", opacity: image ? 1.0 : 0.8 }]}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
            <Icon name="camera" size={50} color={COLORS.white} />
        </View>
        {image === null &&
          <View style={styles.overlayTextContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.overlayText}>Choose Event Image</Text>
              <Text style={styles.overlaySubText}>(Not required)</Text>
            </View>
          </View>
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
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
  overlayTextContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)'
  },
  overlayText: {
    color: COLORS.white,
    fontFamily: FONTS.Poppins_600,
    fontSize: 18,
  },
  overlaySubText: {
    color: COLORS.white,
    fontFamily: FONTS.Poppins_400,
    fontSize: 14,
  },
});

export default EditEventImage;
