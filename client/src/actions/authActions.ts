import { SET_CURRENT_USER, LOGIN_REQUEST, LOGOUT_REQUEST, REGISTER_REQUEST } from '../types/types';

export const loginRequest = (data: any, history: any) => ({ type: LOGIN_REQUEST, data, history });
export const loginSuccess = (data: any) => ({ type: SET_CURRENT_USER, payload: data });
export const logoutRequest = () => ({ type: LOGOUT_REQUEST, payload: {} });
export const registerRequest = (data: any, history: any) => ({ type: REGISTER_REQUEST, data, history });
