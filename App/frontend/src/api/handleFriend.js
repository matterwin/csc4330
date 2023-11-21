import { API_IP_ADDRESS } from './apiConfig';
import { getToken } from './token';
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = `http://${API_IP_ADDRESS}/friend`;

export const showAllUsers = async (token) => {

    try {
        const res = await fetch(`${baseURL}/showAllUsers`, {
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

export const showFriends = async (token) => {

    try {
        const res = await fetch(`${baseURL}/showFriends`, {
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

export const showSentFriendRequests = async (token) => {

    try {
        const res = await fetch(`${baseURL}/showSentFriendRequests`, {
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

export const showReceivedFriendRequests = async (token) => {

    try {
        const res = await fetch(`${baseURL}/showReceivedFriendRequests`, {
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

export const removeFriend = async (token, username) => {

    try {
        const res = await fetch(`${baseURL}/removeFriend`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                removeFriend: username
            }),
        });

        const data = await res.json();
        return { status: res.status, data };

    } catch (err) {
        return { status: 500, error: err.message };
    }
}

export const sendFriendRequest = async (token, username) => {

    try {
        const res = await fetch(`${baseURL}/sendFriendRequest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                sendFriendRequestTo: username
            }),
        });

        const data = await res.json();
        return { status: res.status, data };

    } catch (err) {
        return { status: 500, error: err.message };
    }
}

export const acceptFriendRequest = async (token, username) => {

    try {
        const res = await fetch(`${baseURL}/acceptFriendRequest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                acceptFriendRequestFrom: username
            }),
        });

        const data = await res.json();
        return { status: res.status, data };

    } catch (err) {
        return { status: 500, error: err.message };
    }
}

export const denyFriendRequest = async (token, username) => {

    try {
        const res = await fetch(`${baseURL}/denyFriendRequest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                denyFriendRequestFrom: username
            }),
        });

        const data = await res.json();
        return { status: res.status, data };

    } catch (err) {
        return { status: 500, error: err.message };
    }
}

export const cancelFriendRequest = async (token, username) => {

    try {
        const res = await fetch(`${baseURL}/cancelFriendRequest`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                cancelFriendRequestTo: username
            }),
        });

        const data = await res.json();
        return { status: res.status, data };

    } catch (err) {
        return { status: 500, error: err.message };
    }
}