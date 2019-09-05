import { GET_ERROR, ActionTypes } from '../types/types';

const initialState = {};

export default function(state = initialState, action: ActionTypes) {
	switch (action.type) {
		case GET_ERROR:
			return action.payload;
		default:
			return state;
	}
}
