import { createStore, applyMiddleware, compose } from 'redux';
import thunk, { ThunkMiddleware } from 'redux-thunk';
import { rootReducer, AppState } from './reducers/index';
import { AppActions } from './types/types';
const initialState = {};
const middleWare = [ thunk as ThunkMiddleware<AppState, AppActions> ];

const store = createStore(rootReducer, initialState, compose(applyMiddleware(...middleWare)));

export default store;
