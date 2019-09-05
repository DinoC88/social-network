import {
	ProfileState,
	ActionTypes,
	GET_PROFILE,
	PROFILE_LOADING,
	GET_PROFILES,
	GET_EDUCATION,
	GET_EXPERIENCE,
	CLEAR_CURRENT_USER
} from '../types/types';

const initialState: ProfileState = {
	profiles: [],
	isLoading: true,
	profiletest: [],
	education: [],
	experience: [],
	currentProfile: []
};

export default function(state = initialState, action: ActionTypes) {
	switch (action.type) {
		case PROFILE_LOADING:
			return {
				...state,
				isLoading: true
			};
		case GET_PROFILES:
			return {
				...state,
				isLoading: false,
				profiles: [ action.payload ]
			};
		case GET_PROFILE:
			return {
				...state,
				isLoading: false,
				profiletest: [ action.payload ]
			};
		case GET_EDUCATION:
			return {
				...state,
				isLoading: false,
				education: [ action.payload ]
			};

		case GET_EXPERIENCE:
			return {
				...state,
				isLoading: false,
				experience: [ action.payload ]
			};
		case CLEAR_CURRENT_USER:
			return {
				...state,
				currentProfile: []
			};
		default:
			return state;
	}
}
