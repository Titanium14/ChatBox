import { combineReducers } from 'redux';
import authReducer from './authReducer';
import roomReducer from './roomReducer';
import messageReducer from './msgReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  auth: authReducer,
  room: roomReducer,
  messages: messageReducer,
  errors: errorReducer
});
