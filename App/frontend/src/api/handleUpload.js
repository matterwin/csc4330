import { API_IP_ADDRESS } from './apiConfig';
import * as ImagePicker from 'expo-image-picker';

const baseURL = `http://${API_IP_ADDRESS}/upload`;

export const uploadEventImage = async (token, image, eventId) => {
    try {
        const formData = new FormData();
        formData.append('image', {
          uri: image,
          type: 'image/jpeg', // or 'image/png' depending on your allowedMimeTypes
          name: 'event_image.jpg', // or use result.fileName if available
        })

        const res = await fetch(`${baseURL}/eventImage/${'655be766e476bf025ba0ee9b'}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`,
            },
            body: formData
        });

        const data = await res.json();
        return { status: res.status, data };

    } catch (err) {
        return { status: 500, error: err.message };
    }
}