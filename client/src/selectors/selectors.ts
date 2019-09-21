export function selectProfile(state: any) {
  return state.profile.profiletest[0];
}
export function selectEducation(state: any) {
  return state.profile.education[0];
}
export function selectExperience(state: any) {
  return state.profile.experience[0];
}
export function selectIsProfileLoading(state: any) {
  return state.profile.isLoading;
}

export function selectProfiles(state: any) {
  return state.profile.profiles[0];
}

export function selectErrors(state: any) {
  return state.error;
}

export function selectPost(state: any) {
  return state.post;
}

export function selectIsAuth(state: any) {
  return state.auth.isAuthenticated;
}

export function selectPosts(state: any) {
  return state.posts.posts;
}

export function selectIsLoadingPosts(state: any) {
  return state.posts.isLoading;
}

export function selectUser(state: any) {
  return state.auth.user;
}

export function selectAuth(state: any) {
  return state.auth;
}
