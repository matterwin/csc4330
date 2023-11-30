import { ADD_INVITED_USER, REMOVE_INVITED_USER, RESET_INVITED_USERS } from './invitesActions';

const initialState = {
    invitedUsers: [],
};

const invitesReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_INVITED_USER:
            return {
                ...state,
                invitedUsers: [...state.invitedUsers, action.payload.username],
            };
        case REMOVE_INVITED_USER:
            return {
                ...state,
                invitedUsers: state.invitedUsers.filter(
                    (username) => username !== action.payload.username
                ),
            };
        case RESET_INVITED_USERS:
                return {
                    ...state,
                    invitedUsers: [],
                };
        default:
            return state;
    }
};

export default invitesReducer;
