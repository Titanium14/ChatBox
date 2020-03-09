import { combineReducers } from 'redux';
import auth from './auth';
import room from './room';
import messages from './messages';
import error from './error';

export default combineReducers({
  auth: auth,
  room: room,
  messages: messages,
  error: error
});
