import axios from 'axios';

import {
  GET_MESSAGES,
  POST_MESSAGE,
  DELETE_MESSAGE,
  MESSAGE_ERROR
} from './types';

// Get messages
export const getMessages = roomId => async dispatch => {
  try {
    const res = await axios.get(`/api/messages/${roomId}`);
    dispatch({ type: GET_MESSAGES, payload: res.data });
  } catch (err) {
    dispatch({ type: MESSAGE_ERROR });
  }
};

// Post message
export const postMessage = (roomId, content) => async dispatch => {
  const config = { headers: { 'Content-Type': 'application/json' } };

  const body = JSON.stringify({ content });

  try {
    await axios.post(`/api/messages/${roomId}`, body, config);
    dispatch({ type: POST_MESSAGE });

    const res = await axios.get(`/api/messages/${roomId}`);
    dispatch({ type: GET_MESSAGES, payload: res.data });
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsObj = {};
    errors.map(err => (errorsObj[err.param] = err.msg));

    dispatch({ type: MESSAGE_ERROR, payload: errorsObj });
  }
};

// Delete message
export const deleteMessage = (roomId, msgId) => async dispatch => {
  try {
    await axios.delete(`/api/messages/${roomId}/${msgId}`);
    dispatch({ type: DELETE_MESSAGE });

    const res = await axios.get(`/api/messages/${roomId}`);
    dispatch({ type: GET_MESSAGES, payload: res.data });
  } catch (err) {
    dispatch({ type: MESSAGE_ERROR, payload: err });
  }
};
