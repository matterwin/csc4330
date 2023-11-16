import React, { useState } from 'react';
import { View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import GroupImageCreation from './GroupImageCreation';

const UploadImage = () => {
  const [image, setImage] = useState(null);

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
                <GroupImageCreation height={85} width={85} />
            </View>
        }
        {image && 
            <View onTouchStart={pickImage}>
                <GroupImageCreation url={image} height={85} width={85} />
            </View>
        }
    </View>
  );
}

export default UploadImage;