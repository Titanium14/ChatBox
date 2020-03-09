import { GET_MESSAGES, POST_MESSAGE, DELETE_MESSAGE } from '../actions/types';

const initialState = {
  messages: null
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case POST_MESSAGE:
    case DELETE_MESSAGE:
      return {
        ...state
      };
    default:
      return state;
  }
}
