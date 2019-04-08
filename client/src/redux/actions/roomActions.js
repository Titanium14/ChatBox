import axios from 'axios';

import {
  GET_ERRORS,
  GET_ROOMS,
  CREATE_ROOM,
  EDIT_ROOM,
  DELETE_ROOM
} from './types';

// Get rooms
export const getRooms = () => dispatch => {
  axios
    .get('/api/rooms')
    .then(res => {
      dispatch({ type: GET_ROOMS, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Get rooms of user
export const getUserRooms = userId => dispatch => {
  axios
    .get(`/api/rooms/${userId}`)
    .then(res => {
      dispatch({ type: GET_ROOMS, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Creates room
export const createRoom = roomData => dispatch => {
  axios
    .post('/api/rooms', roomData)
    .then(res => {
      dispatch({ type: CREATE_ROOM, payload: res.data });
      dispatch({ type: GET_ERRORS, payload: {} });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Edits room
export const editRoom = (roomId, roomData) => dispatch => {
  axios
    .post(`/api/rooms/${roomId}`, roomData)
    .then(res => {
      dispatch({ type: EDIT_ROOM, payload: res.data });
      dispatch({ type: GET_ERRORS, payload: {} });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Deletes room
export const deleteRoom = roomId => dispatch => {
  axios
    .delete(`/api/rooms/${roomId}`)
    .then(res => {
      dispatch({ type: DELETE_ROOM, payload: {} });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
