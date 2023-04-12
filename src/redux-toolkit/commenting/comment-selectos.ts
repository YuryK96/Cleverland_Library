import { AppStateType } from '../store';


export const getCommentStatus = (state: AppStateType) => state.commentsBranch.status;
export const getChangeEstimateStatus = (state: AppStateType) => state.commentsBranch.changeEstimateStatus;
export const getCommentError = (state: AppStateType) => state.commentsBranch.error;
