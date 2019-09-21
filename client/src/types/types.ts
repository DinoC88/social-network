import { IProfile, IEducation, IExperience } from '../interface/profile.interface';
import { IErrors } from '../interface/error.interface';

export interface ProfileState {
  profiles: IProfile[];
  isLoading: boolean;
  profiletest: IProfile[];
  education: IEducation[];
  experience: IExperience[];
  currentProfile: any;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: any;
}

export interface ErrorState {
  errors: IErrors;
}

export interface PostsState {
  posts: any;
  post: any;
  isLoading: boolean;
}

export const GET_ERROR = 'GET_ERROR';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER';

export const GET_EDUCATION = 'GET_EDUCATION';
export const GET_EXPERIENCE = 'GET_EXPERIENCE';
export const GET_PROFILES = 'GET_PROFILES';
export const GET_PROFILE = 'GET_PROFILE';
export const PROFILE_LOADING = 'PROFILE_LOADING';
export const PROFILE_NOT_FOUND = 'PROFILE_NOT_FOUND';
export const CLEAR_CURRENT_PROFILE = 'CLEAR_CURRENT_PROFILE';

export const GET_POSTS_REQUEST = 'GET_POSTS_REQUEST';
export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const DELETE_POST_REQUEST = 'DELETE_POST_REQUEST';
export const POST_LOADING = 'POST_LOADING';
export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';

export const REQUEST_PROFILES = 'REQUEST_PROFILES';
export const REQUEST_PROFILE = 'REQUEST_PROFILE';
export const REQUEST_PROFILE_TOKEN = 'REQUEST_PROFILE_TOKEN';
export const ADD_EDU_REQUEST = 'ADD_EDU_REQUEST';
export const ADD_EXP_REQUEST = 'ADD_EXP_REQUEST';
export const CREATE_PROFILE = 'CREATE_PROFILE';
export const DELETE_EXP_REQUEST = 'DELETE_EXP_REQUEST';
export const DELETE_EDU_REQUEST = 'DELETE_EDU_REQUEST';
export const DELETE_ACC_REQUEST = 'DELETE_ACC_REQUEST';
export const REQUEST_PROFILE_BY_ID = 'REQUEST_PROFILE_BY_ID';
export const REQUEST_EDU_ID = 'REQUEST_EDU_ID';
export const REQUEST_EXP_ID = 'REQUEST_EXP_ID';
export const REQUEST_EXP_TOKEN = 'REQUEST_EXP_TOKEN';
export const REQUEST_EDU_TOKEN = 'REQUEST_EDU_TOKEN';

export interface GetPostsAction {
  type: typeof GET_POSTS;
  payload: any;
}

export interface GetPostAction {
  type: typeof ADD_POST;
  payload: any;
}

export interface DeletePostsAction {
  type: typeof DELETE_POST;
  payload: any;
}
export interface PostLoadingAction {
  type: typeof POST_LOADING;
}

export interface GetErrorAction {
  type: typeof GET_ERROR;
  payload: any;
}

export interface SetCurrentUser {
  type: typeof SET_CURRENT_USER;
  payload: any;
}

export interface ClearCurrentUser {
  type: typeof CLEAR_CURRENT_USER;
  payload: any;
}

export interface GetProfilesAction {
  type: typeof GET_PROFILES;
  payload: IProfile;
}
export interface GetProfileAction {
  type: typeof GET_PROFILE;
  payload: any;
}

export interface GetEducationAction {
  type: typeof GET_EDUCATION;
  payload: any;
}

export interface GetExperienceAction {
  type: typeof GET_EXPERIENCE;
  payload: any;
}

export interface ProfileLoading {
  type: typeof PROFILE_LOADING;
}

export type ActionTypes =
  | GetProfilesAction
  | GetEducationAction
  | GetExperienceAction
  | GetProfileAction
  | ProfileLoading
  | SetCurrentUser
  | GetErrorAction
  | ClearCurrentUser
  | GetPostsAction
  | GetPostAction
  | DeletePostsAction
  | PostLoadingAction;

export type AppActions = ActionTypes;
