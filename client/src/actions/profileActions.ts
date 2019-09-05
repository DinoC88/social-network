import axios from 'axios';
import {
	AppActions,
	GET_PROFILES,
	PROFILE_LOADING,
	GET_PROFILE,
	GET_EDUCATION,
	GET_EXPERIENCE,
	GET_ERROR,
	SET_CURRENT_USER
} from '../types/types';
import { Dispatch } from 'redux';
import { AppState } from '../reducers';

//Get all profiles
export const getProfiles = () => {
	return (dispatch: Dispatch<AppActions>, getState: () => AppState) => {
		dispatch({
			type: PROFILE_LOADING
		});
		axios
			.get('/api/profile/all')
			.then((res) => {
				dispatch({
					type: GET_PROFILES,
					payload: res.data
				});
			})
			.catch((err) => console.log(err));
	};
};

//get profile by id
export const getProfileByid = (id: number) => (dispatch: Dispatch<AppActions>) => {
	dispatch({
		type: PROFILE_LOADING
	});
	axios
		.get(`/api/profile/${id}`)
		.then((res) =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch((err) => console.log(err));
};

//get current education
export const getCurrentEducationById = (id: number) => (dispatch: Dispatch<AppActions>) => {
	dispatch({
		type: PROFILE_LOADING
	});
	axios
		.get(`/api/profile/educationbyid/${id}`)
		.then((res) => {
			dispatch({
				type: GET_EDUCATION,
				payload: res.data
			});
		})
		.catch((err) => console.log(err));
};

//get current experience
export const getCurrentExperienceById = (id: number) => (dispatch: Dispatch<AppActions>) => {
	dispatch({
		type: PROFILE_LOADING
	});
	axios
		.get(`/api/profile/experiencebyid/${id}`)
		.then((res) => {
			dispatch({
				type: GET_EXPERIENCE,
				payload: res.data
			});
		})
		.catch((err) => console.log(err));
};

//get current profile
export const getCurrentProfile = () => (dispatch: Dispatch<AppActions>) => {
	dispatch({
		type: PROFILE_LOADING
	});
	axios
		.get('/api/profile')
		.then((res) =>
			dispatch({
				type: GET_PROFILE,
				payload: res.data
			})
		)
		.catch((err) =>
			dispatch({
				type: GET_PROFILE,
				payload: []
			})
		);
};

//get current education
export const getCurrentEducation = () => (dispatch: Dispatch<AppActions>) => {
	dispatch({
		type: PROFILE_LOADING
	});
	axios
		.get('/api/profile/education')
		.then((res) => {
			dispatch({
				type: GET_EDUCATION,
				payload: res.data
			});
		})
		.catch((err) =>
			dispatch({
				type: GET_EDUCATION,
				payload: []
			})
		);
};

//get current experience
export const getCurrentExperience = () => (dispatch: Dispatch<AppActions>) => {
	dispatch({
		type: PROFILE_LOADING
	});
	axios
		.get('/api/profile/experience')
		.then((res) => {
			dispatch({
				type: GET_EXPERIENCE,
				payload: res.data
			});
		})
		.catch((err) =>
			dispatch({
				type: GET_EXPERIENCE,
				payload: []
			})
		);
};

//Delete education
export const deleteEducation = (id: number) => (dispatch: Dispatch<AppActions>) => {
	axios
		.delete(`/api/profile/education/${id}`)
		.then((res) =>
			dispatch({
				type: GET_EDUCATION,
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

//Delete experience
export const deleteExperience = (id: number) => (dispatch: Dispatch<AppActions>) => {
	axios
		.delete(`/api/profile/experience/${id}`)
		.then((res) =>
			dispatch({
				type: GET_EXPERIENCE,
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

//Delete account & profile
export const deleteAccount = () => (dispatch: Dispatch<AppActions>) => {
	if (window.confirm('Are you sure? This can not be undone')) {
		axios
			.delete('/api/users')
			.then((res) =>
				dispatch({
					type: SET_CURRENT_USER,
					payload: {}
				})
			)
			.catch((err) =>
				dispatch({
					type: GET_ERROR,
					payload: err.response.data
				})
			);
	}
};

//Create profile
export const createProfile = (profileData: any, history: any) => (dispatch: Dispatch<AppActions>) => {
	axios.post('/api/profile', profileData).then((res) => history.push('/dashboard')).catch((err) =>
		dispatch({
			type: GET_ERROR,
			payload: err.response.data
		})
	);
};

//Add experience
export const addExperience = (expData: any, history: any) => (dispatch: Dispatch<AppActions>) => {
	axios.post('/api/profile/experience', expData).then((res) => history.push('/dashboard')).catch((err) =>
		dispatch({
			type: GET_ERROR,
			payload: err.response.data
		})
	);
};

//Add education
export const addEducation = (eduData: any, history: any) => (dispatch: Dispatch<AppActions>) => {
	axios.post('/api/profile/education', eduData).then((res) => history.push('/dashboard')).catch((err) =>
		dispatch({
			type: GET_ERROR,
			payload: err.response.data
		})
	);
};
