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

export const GET_PROFILES = 'GET_PROFILES';
export const PROFILE_LOADING = 'PROFILE_LOADING';
export const GET_PROFILE = 'GET_PROFILE';
export const GET_EDUCATION = 'GET_EDUCATION';
export const GET_EXPERIENCE = 'GET_EXPERIENCE';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const CLEAR_CURRENT_USER = 'CLEAR_CURRENT_USER';
export const GET_ERROR = 'GET_ERROR';
export const GET_POSTS = 'GET_POSTS';
export const ADD_POST = 'ADD_POST';
export const DELETE_POST = 'DELETE_POST';
export const POST_LOADING = 'POST_LOADING';

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
