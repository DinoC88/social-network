import { combineReducers } from 'redux';
import profileReducer from './profileReducer';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import postReducer from './postReducer';

export const rootReducer = combineReducers({
	profile: profileReducer,
	auth: authReducer,
	error: errorReducer,
	posts: postReducer
});

export type AppState = ReturnType<typeof rootReducer>;
