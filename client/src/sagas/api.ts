import axios from 'axios';

export const fetchProfiles = async () => {
  try {
    const response = await axios.get('/api/profile/all');
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchProfileByHandle = async (handle: string) => {
  try {
    const response = await axios.get(`/api/profile/handle/${handle}`);
    return response.data;
  } catch (error) {
    return error;
  }
};

export const fetchProfileByToken = async () => {
  return await axios.get('/api/profile');
};

export const getEduByTokenApi = () => axios.get('/api/profile/education');

export const getExpByTokenApi = () => axios.get('/api/profile/experience');

export const getProfileByIdApi = (id: any) => {
  return axios.get(`/api/profile/${id}`);
};

export const getEduByIdApi = (id: number) => {
  return axios.get(`/api/profile/educationbyid/${id}`);
};

export const getExpByIdApi = (id: number) => {
  return axios.get(`/api/profile/experiencebyid/${id}`);
};

export const loginUserApi = async (userData: any) => {
  return axios.post('/api/users/login', userData);
};

//Register user
export const registerUserApi = (userData: any) => {
  return axios.post('/api/users/register', userData);
};

//Add education
export const addEducationApi = async (eduData: any) => {
  return await axios.post('/api/profile/education', eduData);
};

//Add exp
export const addExperienceApi = async (expData: any) => {
  return await axios.post('/api/profile/experience', expData);
};

export const createProfileApi = (profileData: any) => {
  return axios.post('/api/profile', profileData);
};

export const deleteExperienceApi = (id: string | number) => {
  return axios.delete(`/api/profile/experience/${id}`);
};

export const deleteEducationApi = (id: string | number) => {
  return axios.delete(`/api/profile/education/${id}`);
};

//Delete account & profile
export const deleteAccountApi = () => {
  return axios.delete('/api/users');
};

export const getPostsApi = () => {
  return axios.get('/api/posts');
};

//Add post
export const addPostApi = (postData: any) => {
  return axios.post('/api/posts', postData);
};

//delete post
export const deletePostApi = (id: string | number) => {
  return axios.delete(`/api/posts/${id}`);
};
