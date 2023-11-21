import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import userReducer from './user/userReducer';
import sheetReducer from './sheet/sheetReducer';
import notificationReducer from './notification/notificationReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  sheet: sheetReducer,
  note: notificationReducer,
});

export default rootReducer;
