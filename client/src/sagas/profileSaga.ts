import { call, put, takeLatest } from 'redux-saga/effects';
import {
  receiveProfiles,
  profileLoading,
  receiveProfile,
  receiveEducation,
  receiveExperience
} from '../actions/profileActions';
import { errorAction } from '../actions/errorActions';
import {
  REQUEST_PROFILES,
  REQUEST_PROFILE,
  REQUEST_PROFILE_TOKEN,
  ADD_EDU_REQUEST,
  ADD_EXP_REQUEST,
  CREATE_PROFILE,
  DELETE_EXP_REQUEST,
  DELETE_EDU_REQUEST,
  DELETE_ACC_REQUEST,
  REQUEST_PROFILE_BY_ID,
  REQUEST_EDU_ID,
  REQUEST_EXP_ID,
  REQUEST_EDU_TOKEN,
  REQUEST_EXP_TOKEN
} from '../types/types';
import {
  deleteAccountApi,
  deleteEducationApi,
  deleteExperienceApi,
  fetchProfiles,
  fetchProfileByHandle,
  fetchProfileByToken,
  createProfileApi,
  addEducationApi,
  addExperienceApi,
  getProfileByIdApi,
  getEduByIdApi,
  getExpByIdApi,
  getEduByTokenApi,
  getExpByTokenApi
} from './api';
import { loginSuccess } from '../actions/authActions';
import setAuthToken from '../utils/setAuthToken';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getProfiles() {
  try {
    // do api call
    yield put(profileLoading());
    const data = yield call(fetchProfiles);
    yield put(receiveProfiles(data));
  } catch (e) {
    console.log(e);
  }
}

export function* profilesSaga() {
  yield takeLatest(REQUEST_PROFILES, getProfiles);
}

function* getProfile(handle: any) {
  try {
    // do api call
    yield put(profileLoading());
    const data = yield call(fetchProfileByHandle, handle.handle);
    yield put(receiveProfile(data));
  } catch (e) {
    console.log(e);
  }
}

export function* profileByHandleSaga() {
  yield takeLatest(REQUEST_PROFILE, getProfile);
}

function* getProfileById(id: any) {
  try {
    // do api call
    yield put(profileLoading());
    const data = yield call(getProfileByIdApi, id.id);
    yield put(receiveProfile(data.data));
  } catch (e) {
    console.log(e);
  }
}

export function* profileByIdSaga() {
  yield takeLatest(REQUEST_PROFILE_BY_ID, getProfileById);
}

function* getEduById(id: any) {
  try {
    // do api call
    yield put(profileLoading());
    const data = yield call(getEduByIdApi, id.id);
    yield put(receiveEducation(data.data));
  } catch (e) {
    console.log(e);
  }
}

export function* getEduByIdSaga() {
  yield takeLatest(REQUEST_EDU_ID, getEduById);
}

function* getExpById(id: any) {
  try {
    // do api call
    yield put(profileLoading());
    const data = yield call(getExpByIdApi, id.id);
    yield put(receiveExperience(data.data));
  } catch (e) {
    console.log(e);
  }
}

export function* getExpByIdSaga() {
  yield takeLatest(REQUEST_EXP_ID, getExpById);
}

function* getProfileByToken() {
  try {
    yield put(profileLoading());
    const data = yield call(fetchProfileByToken);
    yield put(receiveProfile(data.data));
  } catch (e) {
    yield put(receiveProfile(e.response.data));
  }
}

export function* profileByTokenSaga() {
  yield takeLatest(REQUEST_PROFILE_TOKEN, getProfileByToken);
}

function* getEduByToken() {
  try {
    yield put(profileLoading());
    const data = yield call(getEduByTokenApi);
    yield put(receiveEducation(data.data));
  } catch (e) {
    yield put(receiveEducation([]));
  }
}

export function* getEduByTokenSaga() {
  yield takeLatest(REQUEST_EDU_TOKEN, getEduByToken);
}

function* getExpByToken() {
  try {
    yield put(profileLoading());
    const data = yield call(getExpByTokenApi);
    yield put(receiveExperience(data.data));
  } catch (e) {
    yield put(receiveExperience([]));
  }
}

export function* getExpByTokenSaga() {
  yield takeLatest(REQUEST_EXP_TOKEN, getExpByToken);
}

function* addEducation(eduData: any) {
  try {
    yield call(addEducationApi, eduData.eduData);
    eduData.history.push('/dashboard');
  } catch (e) {
    yield put(errorAction(e.response.data));
  }
}

export function* addEducationSaga() {
  yield takeLatest(ADD_EDU_REQUEST, addEducation);
}

function* addExperience(expData: any) {
  try {
    yield call(addExperienceApi, expData.expData);
    expData.history.push('/dashboard');
  } catch (e) {
    yield put(errorAction(e.response.data));
  }
}

export function* addExperienceSaga() {
  yield takeLatest(ADD_EXP_REQUEST, addExperience);
}

function* createProfile(profileData: any) {
  try {
    yield call(createProfileApi, profileData.profileData);
    profileData.history.push('/dashboard');
  } catch (e) {
    yield put(errorAction(e.response.data));
  }
}

export function* createProfileSaga() {
  yield takeLatest(CREATE_PROFILE, createProfile);
}

function* deleteExp(id: any) {
  try {
    const data = yield call(deleteExperienceApi, id.id);
    yield put(receiveExperience(data.data));
  } catch (e) {
    yield put(errorAction(e.response.data));
  }
}

export function* deleteExpSaga() {
  yield takeLatest(DELETE_EXP_REQUEST, deleteExp);
}

function* deleteEdu(id: any) {
  try {
    const data = yield call(deleteEducationApi, id.id);
    yield put(receiveEducation(data.data));
  } catch (e) {
    yield put(errorAction(e.response.data));
  }
}

export function* deleteEduSaga() {
  yield takeLatest(DELETE_EDU_REQUEST, deleteEdu);
}

function* deleteAcc() {
  try {
    yield call(deleteAccountApi);
    //remove token from localstorage
    localStorage.removeItem('jwtToken');
    //remove auth header for future request
    setAuthToken(false);
    //Set current user to empty object which will set isAuthenticated to false
    yield put(loginSuccess({}));
  } catch (e) {
    yield put(errorAction(e.response.data));
  }
}

export function* deleteAccountSaga() {
  yield takeLatest(DELETE_ACC_REQUEST, deleteAcc);
}
