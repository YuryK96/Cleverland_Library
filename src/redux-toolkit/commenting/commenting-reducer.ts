/* eslint-disable */
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StatusRequestEnum } from '../books/books-type';

import { InitialStateType } from './commenting-type';
import { sendComment } from './commenting-thunks';



const commentingSlice = createSlice({
    name: 'commenting',
    initialState: {
        status: null,
        error: null,

    } as InitialStateType,

    reducers: {
        clearStatusTimeOutComment: (state)=> {
            state.status = null;
            state.error = null

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

        })
    }
});
export const { clearStatusTimeOutComment} = commentingSlice.actions;
export default commentingSlice.reducer;
