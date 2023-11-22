import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
import EditEventImage from './EditEventImage';

const { width: screenWidth } = Dimensions.get('window');

const UploadEventImage = ({ image, setImage }) => {
  const [imageSize, setImageSize] = useState(null);

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);

      // Get the size of the selected image
      const fileInfo = await FileSystem.getInfoAsync(result.assets[0].uri);
      setImageSize(fileInfo.size);
    }
  };

  useEffect(() => {
    // Log the size of the image whenever it changes
    if (imageSize !== null) {
      const imageSizeInMB = (imageSize / (1024 * 1024)).toFixed(2);
      console.log(`Selected image size: ${imageSizeInMB} MB`);
    }
  }, [imageSize]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {!image && 
            <View onTouchStart={pickImage}>
                <EditEventImage width={screenWidth} height={screenWidth * 9 / 16} image={image} />
            </View>
        }
        {image && 
            <View onTouchStart={pickImage}>
                <EditEventImage url={image} width={screenWidth} height={screenWidth * 9 / 16} image={image}/>
            </View>
        }
    </View>
  );
}

export default UploadEventImage;