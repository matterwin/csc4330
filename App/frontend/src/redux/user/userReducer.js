import { SET_USER_DATA } from './userActions';
import { LOGOUT } from '../auth/authActions';

const initialState = {
  username: '',
  realname: '',
  email: '',
  profilePic: '',
  bio: '',
  location: '',
  createdAt: '',
  events: [],
  hobbies: [],
  friends: [],
  sentFriendRequests: [],
  receivedFriendRequests: [],
  directmessages: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      console.log(action.payload);
      return {
        ...state,
        ...action.payload,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export default userReducer;