import { API_IP_ADDRESS } from './apiConfig';
import { getToken } from './token';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSelector } from 'react-redux';

const baseURL = `http://${API_IP_ADDRESS}/event`;

export const allPublicExcludingFriendsEvents = async (token, page, limit) => {
    const stdlimit = limit === null ? 5 : limit;

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

export const allYourFriendsEvents = async (token, page, limit) => {
    const stdlimit = limit === null ? 5 : limit;

    try {
        const res = await fetch(`${baseURL}/allYourFriendsEvents?page=${page}&limit=${stdlimit}`, {
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

export const allSearchedUserEvents = async (token, page, limit, searchedUser) => {
    const stdlimit = limit === null ? 5 : limit;

    try {
        const res = await fetch(`${baseURL}/allSearchedUserEvents?page=${page}&limit=${stdlimit}&searchedUser=${searchedUser}`, {
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

export const allYourEvents = async (token, page, limit) => {
    const stdlimit = limit === null ? 5 : limit;

    try {
        const res = await fetch(`${baseURL}/allYourEvents?page=${page}&limit=${stdlimit}`, {
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

export const singleEvent = async (token, eventId) => {

    try {
        const res = await fetch(`${baseURL}/singleEvent/${eventId}`, {
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

export const showParticipants = async (token, eventId) => {

    try {
        const res = await fetch(`${baseURL}/showParticipants/${eventId}`, {
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

export const createEvent = async (token, event) => {

    try {
        const res = await fetch(`${baseURL}/createEvent`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({ 
                privacyType: event.privacyType,
                titleOfEvent: event.titleOfEvent,
                place: event.place,
                exactLocation: event.exactLocation,
                description: event.description,
                dateAndTimeOfEvent: event.dateAndTimeOfEvent,
                invitedUsers: event.invitedUsers
            }),
        });

        const data = await res.json();
        return { status: res.status, data };

    } catch (err) {
        return { status: 500, error: err.message };
    }
}

export const joinEvent = async (token, eventId) => {

    try {
        const res = await fetch(`${baseURL}/joinEvent/${eventId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        const data = await res.json();
        return { status: res.status, data };

    } catch (err) {
        return { status: 500, error: err.message };
    }
}

export const unJoinEvent = async (token, eventId) => {

    try {
        const res = await fetch(`${baseURL}/unJoinEvent/${eventId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });

        const data = await res.json();
        return { status: res.status, data };

    } catch (err) {
        return { status: 500, error: err.message };
    }
}