import axios from 'axios';

import { GET_ERRORS, GET_ROOMS, CREATE_ROOM } from './types';

// Get rooms
export const getRooms = () => dispatch => {
  axios
    .get('/api/rooms')
    .then(res => {
      dispatch({ type: GET_ROOMS, payload: res.data });
      console.log(res.data);
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Creates room
export const createRoom = (roomData, history) => dispatch => {
  axios
    .post('/api/rooms', roomData)
    .then(res => {
      dispatch({ type: CREATE_ROOM, payload: res.data });
      dispatch({ type: GET_ERRORS, payload: {} });
      history.push('/JoinRoom');
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};
