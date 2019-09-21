import {
  ADD_POST_REQUEST,
  GET_POSTS_REQUEST,
  POST_LOADING,
  GET_POSTS,
  ADD_POST,
  DELETE_POST_REQUEST,
  DELETE_POST
} from '../types/types';

export const getPostsRequest = () => ({ type: GET_POSTS_REQUEST });
export const setPostLoading = () => ({ type: POST_LOADING });
export const getPostsSuccess = (data: any) => ({ type: GET_POSTS, payload: data });
export const addPostRequest = (postData: any) => ({ type: ADD_POST_REQUEST, postData });
export const addPostSuccess = (postData: any) => ({ type: ADD_POST, payload: postData });
export const deletePostRequest = (id: any) => ({ type: DELETE_POST_REQUEST, id });
export const deletePostSuccess = (id: any) => ({ type: DELETE_POST, payload: id });
