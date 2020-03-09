import {
  LOGIN_FAIL,
  REGISTER_FAIL,
  UPDATE_FAIL,
  DELETE_FAIL,
  ROOM_ERROR,
  MESSAGE_ERROR
} from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case LOGIN_FAIL:
    case REGISTER_FAIL:
    case UPDATE_FAIL:
    case DELETE_FAIL:
    case ROOM_ERROR:
    case MESSAGE_ERROR:
      return payload;
    default:
      return state;
  }
}
