import { AppStateType } from '../store';

export const getAuthError = (state: AppStateType) => state.authBranch.authError;
export const getAuthStatus = (state: AppStateType) => state.authBranch.authStatus;
export const getIsAuth = (state: AppStateType) => state.authBranch.isAuth;

export  const getUserId = (state:AppStateType)=> state.authBranch.user?.id

