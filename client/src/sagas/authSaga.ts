import { call, put, takeLatest } from 'redux-saga/effects';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';

import { loginUserApi, registerUserApi } from './api';
import { errorAction } from '../actions/errorActions';
import { loginSuccess } from '../actions/authActions';
import { LOGIN_REQUEST, LOGOUT_REQUEST, REGISTER_REQUEST } from '../types/types';

function* loginUser(userData: any) {
  try {
    const res = yield call(loginUserApi, userData.data);
    const { token } = res.data;
    localStorage.setItem('jwtToken', token);
    // Set token to Auth header
    setAuthToken(token);
    // Decode token to get user data
    const decoded = jwt_decode(token);
    yield put(loginSuccess(decoded));
    userData.history.push('/dashboard');
  } catch (e) {
    yield put(errorAction(e.response.data));
  }
}

export function* loginUserSaga() {
  yield takeLatest(LOGIN_REQUEST, loginUser);
}

function* logoutUser() {
  try {
    //remove token from localstorage
    localStorage.removeItem('jwtToken');
    //remove auth header for future request
    setAuthToken(false);
    //Set current user to empty object which will set isAuthenticated to false
    yield put(loginSuccess({}));
  } catch (e) {
    console.log(e);
  }
}

export function* logoutUserSaga() {
  yield takeLatest(LOGOUT_REQUEST, logoutUser);
}

function* registerUserGen(regData: any) {
  try {
    yield call(registerUserApi, regData.data);
    yield put(errorAction({}));
    regData.history.push('/login');
  } catch (e) {
    yield put(errorAction(e.response.data));
  }
}

export function* registerUserSaga() {
  yield takeLatest(REGISTER_REQUEST, registerUserGen);
}
