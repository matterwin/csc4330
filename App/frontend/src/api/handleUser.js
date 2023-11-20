import { API_IP_ADDRESS } from './apiConfig';

const baseURL = `http://${API_IP_ADDRESS}/user`;

export const profile = async (token) => {
    try {
        const res = await fetch(`${baseURL}/profile`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await res.json();
        // if(data) console.log(data.user);
        return { status: res.status, data };

    } catch (err) {
        console.error(err);
        return { status: 500, error: err.message };
    }
}

export const profilePic = async (token) => {
    try {
        const res = await fetch(`${baseURL}/profilePic`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await res.json();
        return { status: res.status, data };

    } catch (err) {
        console.error(err);
        return { status: 500, error: err.message };
    }
}