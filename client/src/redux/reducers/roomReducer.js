import { GET_ROOMS, CREATE_ROOM, EDIT_ROOM } from '../actions/types';

const initialState = {
  room: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ROOMS:
      return {
        ...state,
        room: action.payload
      };
    case CREATE_ROOM:
      return {
        ...state,
        room: action.payload
      };
    case EDIT_ROOM:
      return {
        ...state,
        room: action.payload
      };
    default:
      return state;
  }
}
