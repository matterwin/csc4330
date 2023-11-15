import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import UserImageIcon from './UserImageIcon';

const UploadImage = () => {
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
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
                <UserImageIcon me={true} height={85} width={85} />
            </View>
        }
        {image && 
            <View onTouchStart={pickImage}>
                <UserImageIcon url={image} height={85} width={85} />
            </View>
        }
    </View>
  );
}

export default UploadImage;