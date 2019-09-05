import isEmpty from '../validation/is-empty';
import { ActionTypes, SET_CURRENT_USER, AuthState } from '../types/types';

const initialState: AuthState = {
	isAuthenticated: false,
	user: {}
};

export default function(state = initialState, action: ActionTypes) {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				isAuthenticated: !isEmpty(action.payload),
				user: action.payload
			};
		default:
			return state;
	}
}
