import axios from 'axios';

import {
  GET_ROOMS,
  GET_SELECTED_ROOM,
  CREATE_ROOM,
  EDIT_ROOM,
  DELETE_ROOM,
  ROOM_ERROR
} from './types';

// Get rooms
export const getRooms = () => async dispatch => {
  try {
    const res = await axios.get('/api/rooms');

    dispatch({ type: GET_ROOMS, payload: res.data });
  } catch (err) {
    console.log(err);
    dispatch({ type: ROOM_ERROR, payload: err.response.data });
  }
};

// Get rooms of user
export const getUserRooms = () => async dispatch => {
  try {
    const res = await axios.get('/api/rooms/user');

    dispatch({ type: GET_ROOMS, payload: res.data });
  } catch (err) {
    dispatch({ type: ROOM_ERROR, payload: err.response.data });
  }
};

// Get room by ID
export const getRoomById = roomId => async dispatch => {
  try {
    const res = await axios.get(`/api/rooms/${roomId}`);

    dispatch({ type: GET_SELECTED_ROOM, payload: res.data });
  } catch (err) {
    dispatch({ type: ROOM_ERROR, payload: err.response.data });
  }
};

// Creates room
export const createRoom = (room_name, history) => async dispatch => {
  const config = { headers: { 'Content-Type': 'application/json' } };

  const body = JSON.stringify({ room_name });

  try {
    await axios.post('/api/rooms', body, config);
    dispatch({ type: CREATE_ROOM });

    const res = await axios.get('/api/rooms');
    dispatch({ type: GET_ROOMS, payload: res.data });

    if (history.location.pathname !== '/Rooms') history.push('/Rooms');
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsObj = {};
    errors.map(err => (errorsObj[err.param] = err.msg));

    dispatch({ type: ROOM_ERROR, payload: errorsObj });
  }
};

// Edits room
export const editRoom = (roomId, room_name, history) => async dispatch => {
  const config = { headers: { 'Content-Type': 'application/json' } };

  const body = JSON.stringify({ room_name });

  try {
    await axios.put(`/api/rooms/${roomId}`, body, config);
    dispatch({ type: EDIT_ROOM });

    const res = await axios.get('/api/rooms');
    dispatch({ type: GET_ROOMS, payload: res.data });

    if (history.location.pathname !== '/Rooms') history.push('/Rooms');
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsObj = {};
    errors.map(err => (errorsObj[err.param] = err.msg));

    dispatch({ type: ROOM_ERROR, payload: errorsObj });
  }
};

// Deletes room
export const deleteRoom = (roomId, history) => async dispatch => {
  try {
    await axios.delete(`/api/rooms/${roomId}`);
    dispatch({ type: DELETE_ROOM });

    const res = await axios.get('/api/rooms');
    dispatch({ type: GET_ROOMS, payload: res.data });

    if (history.location.pathname !== '/Rooms') history.push('/Rooms');
  } catch (err) {
    dispatch({ type: ROOM_ERROR, payload: err });
  }
};
