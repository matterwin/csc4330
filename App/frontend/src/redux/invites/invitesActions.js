export const ADD_INVITED_USER = 'ADD_INVITED_USER';
export const REMOVE_INVITED_USER = 'REMOVE_INVITED_USER';
export const RESET_INVITED_USERS = 'RESET_INVITED_USERS';

export const addInvitedUser = (username) => ({
    type: ADD_INVITED_USER,
    payload: { username },
});

export const removeInvitedUser = (username) => ({
    type: REMOVE_INVITED_USER,
    payload: { username },
});

export const resetInvitedUsers = () => ({
    type: RESET_INVITED_USERS,
});