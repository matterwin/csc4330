import { API_IP_ADDRESS } from './apiConfig';

const baseURL = `http://${API_IP_ADDRESS}/hobby`;

export const showUsersHobbies = async (token, username) => {

    try {
        const res = await fetch(`${baseURL}/showUsersHobbies/${username}`, {
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
