import { AppStateType } from '../store';

export const getUserProfile = (state: AppStateType) => state.profileBranch.user;
export const getProfileStatus = (state: AppStateType) => state.profileBranch.profileStatus;
export const getProfileError = (state: AppStateType) => state.profileBranch.profileError;
export const getProfileEditStatus = (state: AppStateType) => state.profileBranch.editProfileStatus;
export const getProfileEditError = (state: AppStateType) => state.profileBranch.editProfileError;
