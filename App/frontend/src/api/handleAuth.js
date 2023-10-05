import { API_IP_ADDRESS } from './apiConfig';

const baseURL = `http://${API_IP_ADDRESS}auth`;

export const login = async (username, password) => {
    try {
        const res = await fetch(`${baseURL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });

        const data = await res.json();
        return { status: res.status, data };

    } catch (err) {
        console.error(err);
        return { status: 500, error: err.message };
    }
};

export const register = async (username, email, password) => {
    try {
        const res = await fetch(`${baseURL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();
        return { status: res.status, data };

    } catch (err) {
        console.error(err);
        return { status: 500, error: err.message };
    }
};
