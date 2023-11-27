import { combineReducers } from 'redux';
import authReducer from './auth/authReducer';
import userReducer from './user/userReducer';
import sheetReducer from './sheet/sheetReducer';
import notificationReducer from './notification/notificationReducer';
import infoReducer from './info/infoReducer';
import eventReducer from './event/eventReducer';
import fetchReducer from './fetch/fetchReducer';
import eventInfoReducer from './participants/eventInfoReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  sheet: sheetReducer,
  note: notificationReducer,
  info: infoReducer,
  event: eventReducer,
  fetch: fetchReducer,
  eventInfo: eventInfoReducer
});

export default rootReducer;
