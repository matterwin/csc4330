import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import userReducer from './user/userReducer';
import sheetReducer from './sheet/sheetReducer';
import notificationReducer from './notification/notificationReducer';
import infoReducer from './info/infoReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  sheet: sheetReducer,
  note: notificationReducer,
  info: infoReducer
});

export default rootReducer;
