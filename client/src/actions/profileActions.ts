import {
  GET_EDUCATION,
  GET_EXPERIENCE,
  REQUEST_PROFILES,
  REQUEST_PROFILE,
  GET_PROFILE,
  PROFILE_LOADING,
  GET_PROFILES,
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

export const requestProfiles = () => ({ type: REQUEST_PROFILES });
export const profileLoading = () => ({ type: PROFILE_LOADING });
export const receiveProfiles = (data: any) => ({ type: GET_PROFILES, payload: data });
export const requestProfile = (handle: any) => ({ type: REQUEST_PROFILE, handle });
export const requestProfileToken = () => ({ type: REQUEST_PROFILE_TOKEN });
export const requestEduToken = () => ({ type: REQUEST_EDU_TOKEN });
export const requestExpToken = () => ({ type: REQUEST_EXP_TOKEN });

export const receiveProfile = (data: any) => ({ type: GET_PROFILE, payload: data });

export const addEduRequest = (eduData: any, history: any) => ({
  type: ADD_EDU_REQUEST,
  eduData,
  history
});
export const addExpRequest = (expData: any, history: any) => ({
  type: ADD_EXP_REQUEST,
  expData,
  history
});
export const createProfileRequest = (profileData: any, history: any) => ({
  type: CREATE_PROFILE,
  profileData,
  history
});
export const deleteExpRequest = (id: any) => ({ type: DELETE_EXP_REQUEST, id });
export const deleteEduRequest = (id: any) => ({ type: DELETE_EDU_REQUEST, id });
export const deleteAccRequest = () => ({ type: DELETE_ACC_REQUEST });

export const requestProfileById = (id: any) => ({ type: REQUEST_PROFILE_BY_ID, id });
export const requestEduById = (id: any) => ({ type: REQUEST_EDU_ID, id });
export const requestExpById = (id: any) => ({ type: REQUEST_EXP_ID, id });
export const receiveEducation = (data: any) => ({ type: GET_EDUCATION, payload: data });
export const receiveExperience = (data: any) => ({ type: GET_EXPERIENCE, payload: data });
