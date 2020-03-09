import axios from 'axios';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  USER_RETRIEVED,
  RETRIEVAL_FAIL,
  AUTH_ERROR,
  LOGOUT,
  UPDATE_SUCCESS,
  UPDATE_FAIL,
  DELETE_SUCCESS,
  DELETE_FAIL
} from './types';
import setAuthToken from '../utils/setAuthToken';

// Load User
export const loadUser = () => async dispatch => {
  if (localStorage.token) setAuthToken(localStorage.token);

  try {
    const res = await axios.get('/api/auth/current');
    dispatch({ type: USER_LOADED, payload: res.data });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const retrieveUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/auth');
    dispatch({ type: USER_RETRIEVED, payload: res.data });
  } catch (err) {
    dispatch({ type: RETRIEVAL_FAIL });
  }
};

// Register User
export const register = (name, email, password) => async dispatch => {
  const config = { headers: { 'Content-Type': 'application/json' } };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/users', body, config);

    dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsObj = {};
    errors.map(err => (errorsObj[err.param] = err.msg));

    dispatch({ type: REGISTER_FAIL, payload: errorsObj });
  }
};

// Login User
export const login = (email, password) => async dispatch => {
  const config = { headers: { 'Content-Type': 'application/json' } };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsObj = {};
    errors.map(err => (errorsObj[err.param] = err.msg));

    dispatch({ type: LOGIN_FAIL, payload: errorsObj });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};

// Update User
export const updateUser = (name, email, password) => async dispatch => {
  const config = { headers: { 'Content-Type': 'application/json' } };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.put('/api/auth', body, config);

    dispatch({ type: UPDATE_SUCCESS, payload: res.data });
    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;
    const errorsObj = {};
    errors.map(err => (errorsObj[err.param] = err.msg));

    dispatch({ type: UPDATE_FAIL, payload: errorsObj });
  }
};

// Delete User
export const deleteUser = () => async dispatch => {
  try {
    await axios.delete('/api/auth');

    dispatch({ type: DELETE_SUCCESS });
    window.location = '/Auth/login';
  } catch (err) {
    dispatch({ type: DELETE_FAIL, payload: err });
  }
};
