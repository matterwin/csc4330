import { API_IP_ADDRESS } from './apiConfig';
import * as ImagePicker from 'expo-image-picker';

const baseURL = `http://${API_IP_ADDRESS}/upload`;

export const uploadEventImage = async (token, image, eventId) => {

    try {
        const formData = new FormData();
        const fileType = image.endsWith('.png')
            ? 'image/png'
            : image.endsWith('.jpeg') || image.endsWith('.jpg')
                ? 'image/jpeg'
                : 'image/gif';
        formData.append('image', {
            uri: image,
            type: fileType,
            name: 'event_image',
        });

        const res = await fetch(`${baseURL}/eventImage/${eventId}`, {
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