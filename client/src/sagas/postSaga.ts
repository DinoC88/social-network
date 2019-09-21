import { call, put, takeLatest } from 'redux-saga/effects';
import { setPostLoading, getPostsSuccess, addPostSuccess, deletePostSuccess } from '../actions/postActions';
import { errorAction } from '../actions/errorActions';
import { GET_POSTS_REQUEST, ADD_POST_REQUEST, DELETE_POST_REQUEST } from '../types/types';
import { getPostsApi, addPostApi, deletePostApi } from './api';

function* getPosts() {
  try {
    yield put(setPostLoading());
    const data = yield call(getPostsApi);
    yield put(getPostsSuccess(data.data));
  } catch (e) {
    yield put(getPostsSuccess({}));
  }
}

export function* getPostsSaga() {
  yield takeLatest(GET_POSTS_REQUEST, getPosts);
}

function* addPost(postData: any) {
  try {
    const data = yield call(addPostApi, postData.postData);
    yield put(addPostSuccess(data.data));
  } catch (e) {
    yield put(errorAction(e.response.data));
  }
}

export function* addPostSaga() {
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* deletePost(id: any) {
  try {
    yield call(deletePostApi, id.id);
    yield put(deletePostSuccess(id.id));
  } catch (e) {
    yield put(errorAction(e.response.data));
  }
}

export function* deletePostSaga() {
  yield takeLatest(DELETE_POST_REQUEST, deletePost);
}
