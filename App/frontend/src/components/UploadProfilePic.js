import React, { useState } from 'react';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import EditProfilePic from './EditProfilePic';

const UploadProfilePic = ({ image, setImage }) => {

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
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
                <EditProfilePic width={130} height={130} />
            </View>
        }
        {image && 
            <View onTouchStart={pickImage}>
                <EditProfilePic url={image} width={130} height={130} />
            </View>
        }
    </View>
  );
}

export default UploadProfilePic;