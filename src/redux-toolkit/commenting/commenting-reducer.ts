/* eslint-disable */
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StatusRequestEnum } from '../books/books-type';

import { InitialStateType } from './commenting-type';
import { changeComment, sendComment } from "./commenting-thunks";



const commentingSlice = createSlice({
    name: 'commenting',
    initialState: {
        status: null,
        error: null,
        changeEstimateStatus: null

    } as InitialStateType,

    reducers: {
        clearStatusTimeOutComment: (state)=> {
            state.status = null;
            state.changeEstimateStatus = null;
            state.error = null

        },
        clearStatusComment(state){
            state.status = null;
            state.changeEstimateStatus = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(sendComment.fulfilled, (state, action) => {
            state.status = StatusRequestEnum.Success;
            state.error = null;
        }).addCase(sendComment.pending, (state, action) => {
            state.status = StatusRequestEnum.Pending;
            state.error = null;
        }).addCase(sendComment.rejected, (state, action) => {
            state.status = StatusRequestEnum.Error;
            state.error = action.payload as string

        }).addCase(changeComment.fulfilled, (state, action) => {
            state.changeEstimateStatus = StatusRequestEnum.Success;
            state.error = null;
        }).addCase(changeComment.pending, (state, action) => {
            state.changeEstimateStatus = StatusRequestEnum.Pending;
            state.error = null;
        }).addCase(changeComment.rejected, (state, action) => {
            state.changeEstimateStatus = StatusRequestEnum.Error;
            state.error = action.payload as string

        })
    }
});
export const { clearStatusTimeOutComment,clearStatusComment} = commentingSlice.actions;
export default commentingSlice.reducer;
