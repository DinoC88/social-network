import axios from 'axios';
import { GET_POSTS, POST_LOADING, AppActions, DELETE_POST, GET_ERROR, ADD_POST } from '../types/types';
import { Dispatch } from 'redux';

//get post
export const getPosts = () => (dispatch: Dispatch<AppActions>) => {
  dispatch({
    type: POST_LOADING
  });
  axios
    .get('/api/posts')
    .then((res) =>
      dispatch({
        type: GET_POSTS,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    );
};

//Add post
export const addPost = (postData: any) => (dispatch: Dispatch<AppActions>) => {
  axios
    .post('/api/posts', postData)
    .then((res) =>
      dispatch({
        type: ADD_POST,
        payload: res.data
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};

//delete post
export const deletePost = (id: number) => (dispatch: Dispatch<AppActions>) => {
  axios
    .delete(`/api/posts/${id}`)
    .then((res) =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch((err) =>
      dispatch({
        type: GET_ERROR,
        payload: err.response.data
      })
    );
};

// set loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
