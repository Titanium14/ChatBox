import axios from 'axios';

import {
  GET_MESSAGES,
  POST_MESSAGE,
  EMPTY_MESSAGES,
  GET_ERRORS
} from './types';

// Get messages
export const getMessages = roomId => dispatch => {
  axios.get(`/api/messages/${roomId}`).then(res => {
    dispatch({ type: GET_MESSAGES, payload: res.data });
  });
};

// Post messages
export const postMessage = (roomId, msgData, history) => dispatch => {
  axios
    .post(`/api/messages/${roomId}`, msgData)
    .then(res => {
      dispatch({ type: POST_MESSAGE, payload: res.data });
      history.push('/');
      history.push(`/JoinRoom#${roomId}`);
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Empty out the messages array
export const emptyMessages = () => dispatch => {
  dispatch({ type: EMPTY_MESSAGES, payload: {} });
};
