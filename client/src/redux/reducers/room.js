import {
  GET_ROOMS,
  GET_SELECTED_ROOM,
  CREATE_ROOM,
  EDIT_ROOM,
  DELETE_ROOM,
  ROOM_ERROR
} from '../actions/types';

const initialState = {
  room: null,
  selectedRoom: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ROOMS:
      return {
        ...state,
        room: action.payload,
        selectedRoom: null
      };
    case GET_SELECTED_ROOM:
      return {
        ...state,
        selectedRoom: action.payload
      };
    case CREATE_ROOM:
    case EDIT_ROOM:
    case DELETE_ROOM:
    case ROOM_ERROR:
      return {
        ...state
      };
    default:
      return state;
  }
}
