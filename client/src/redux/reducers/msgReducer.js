import { GET_MESSAGES, EMPTY_MESSAGES } from '../actions/types';

const initialState = {
  messages: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case EMPTY_MESSAGES:
      return {
        ...state,
        messages: {}
      };
    default:
      return state;
  }
}
