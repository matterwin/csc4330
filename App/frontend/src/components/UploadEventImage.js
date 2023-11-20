import React, { useState } from 'react';
import { View, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import EditEventImage from './EditEventImage';

const { width: screenWidth } = Dimensions.get('window');

const UploadEventImage = ({ image, setImage }) => {

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {!image && 
            <View onTouchStart={pickImage}>
                <EditEventImage width={screenWidth} height={screenWidth * 9 / 16} />
            </View>
        }
        {image && 
            <View onTouchStart={pickImage}>
                <EditEventImage url={image} width={screenWidth} height={screenWidth * 9 / 16} />
            </View>
        }
    </View>
  );
}

export default UploadEventImage;