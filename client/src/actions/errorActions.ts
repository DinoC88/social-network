import { GET_ERROR } from '../types/types';

export const errorAction = (data: any) => ({ type: GET_ERROR, payload: data });
