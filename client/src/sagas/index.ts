import { all } from 'redux-saga/effects';
import {
  deleteAccountSaga,
  profilesSaga,
  profileByHandleSaga,
  profileByTokenSaga,
  deleteExpSaga,
  deleteEduSaga,
  createProfileSaga,
  addEducationSaga,
  addExperienceSaga,
  profileByIdSaga,
  getEduByIdSaga,
  getExpByIdSaga,
  getEduByTokenSaga,
  getExpByTokenSaga
} from './profileSaga';
import { loginUserSaga, logoutUserSaga, registerUserSaga } from './authSaga';
import { getPostsSaga, addPostSaga, deletePostSaga } from './postSaga';
function* rootSaga() {
  yield all([
    profilesSaga(),
    profileByHandleSaga(),
    profileByTokenSaga(),
    profileByIdSaga(),
    getEduByIdSaga(),
    getExpByIdSaga(),
    getEduByTokenSaga(),
    getExpByTokenSaga(),
    addEducationSaga(),
    addExperienceSaga(),
    loginUserSaga(),
    createProfileSaga(),
    deleteExpSaga(),
    deleteEduSaga(),
    deleteAccountSaga(),
    logoutUserSaga(),
    registerUserSaga(),
    getPostsSaga(),
    addPostSaga(),
    deletePostSaga()
  ]);
}

export default rootSaga;
