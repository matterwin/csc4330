import { SET_USER_DATA } from './userActions';
import { LOGOUT } from '../auth/authActions';

const initialState = {
  username: '',
  email: '',
  profilePic: '',
  firstName: '',
  lastName: '',
  desc: '',
  location: '',
  joinedDate: '',
  stats: {
    friends: [],
    hobbies: [],
    events: []
  }
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