import { API_IP_ADDRESS } from './apiConfig';
import { getToken } from './token';

const baseURL = `http://${API_IP_ADDRESS}/event`;

export const allYourFriendsEvents = async (token, page, limit) => {
    const stdlimit = limit === null ? 2 : limit;

    try {
        const res = await fetch(`${baseURL}/allPublicExcludingFriendsEvents?page=${page}&limit=${stdlimit}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await res.json();
        return { status: res.status, data };

    } catch (err) {
        return { status: 500, error: err.message };
    }
}