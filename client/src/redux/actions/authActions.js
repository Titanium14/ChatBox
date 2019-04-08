import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { GET_ERRORS, GET_USERS, SET_CURRENT_USER } from './types';

// Get users
export const getUsers = () => dispatch => {
  axios
    .get('/api/users')
    .then(res => {
      dispatch({ type: GET_USERS, payload: res.data });
    })
    .catch(err => dispatch({ type: GET_ERRORS, payload: err.response.data }));
};

// Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post('/api/users/register', userData)
    .then(res => {
      history.push('/Auth/login');
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Login user
export const loginUser = userData => dispatch => {
  axios
    .post('/api/users/login', userData)
    .then(res => {
      // Retrieve token from request response
      const { token } = res.data;
      // Sets the token retrieved from local storage
      localStorage.setItem('jwtToken', token);
      setAuthToken(token);
      // Decodes token and retrieves user's info and token expiration
      const decoded = jwt_decode(token);
      // Sets user and authenticates user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = history => dispatch => {
  // Removes token from local storage
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  // This will set isAuthenticated to false, i.e. the user is now a guest user
  dispatch(setCurrentUser({}));
  // Send user to the login page
  if (history !== null) {
    history.push('/Auth/login');
  }
};
