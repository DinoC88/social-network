import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { Dispatch } from 'redux';
import { AppActions, SET_CURRENT_USER, CLEAR_CURRENT_USER, GET_ERROR } from '../types/types';

//Register user
export const registerUser = (userData: any, history: any) => (dispatch: Dispatch<AppActions>) => {
  axios.post('/api/users/register', userData).then((res) => history.push('/login')).catch((err) => {
    dispatch({
      type: GET_ERROR,
      payload: err.response.data
    });
  });
};

// Login - Get User Token
export const loginUser = (userData: any, history: any) => (dispatch: Dispatch<AppActions>) => {
  axios
    .post('/api/users/login', userData)
    .then((res) => {
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem('jwtToken', token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch({
        type: SET_CURRENT_USER,
        payload: decoded
      });
    })
    .then((res) => history.push('/dashboard'))
    .catch((err) => {
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      });
    });
};

//Logout User
export const logoutUser = () => (dispatch: Dispatch<AppActions>) => {
  //remove token from localstorage
  localStorage.removeItem('jwtToken');
  //remove auth header for future request
  setAuthToken(false);
  //Set current user to empty object which will set isAuthenticated to false
  dispatch({
    type: SET_CURRENT_USER,
    payload: {}
  });
  dispatch({
    type: CLEAR_CURRENT_USER,
    payload: {}
  });
};

// Set logged in user
export const setCurrentUser = (decoded: any) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
