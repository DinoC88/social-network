import { ActionTypes, POST_LOADING, GET_POSTS, ADD_POST, DELETE_POST } from '../types/types';

const initialState = {
	posts: [],
	post: [],
	isLoading: false
};

export default function(state = initialState, action: ActionTypes) {
	switch (action.type) {
		case POST_LOADING:
			return {
				...state,
				loading: true
			};
		case GET_POSTS:
			return {
				...state,
				posts: action.payload,
				loading: false
			};
		case ADD_POST:
			return {
				...state,
				posts: action.payload
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post: any) => post.id !== action.payload)
			};
		default:
			return state;
	}
}
