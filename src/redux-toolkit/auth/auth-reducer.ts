/* eslint-disable */
import { AnyAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { StatusRequestEnum } from '../books/books-type';
import { authorization, registration, resetPassword, sendEmail } from './auth-thunks';
import { InitialStateType } from './auth-type';
import { getBook } from '../books/books-thunks';
import { UserType } from '../../api/auth';


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        authError: null,
        authStatus: null,
        isAuth: false,
    } as InitialStateType,

    reducers: {
        clearAuthError(state ) {
            state.authError = null
        },
        addedUser(state, action:PayloadAction<UserType>){

            state.user = action.payload;
        },
        clearStatusAuth(state) {
            state.authStatus = null
        },
    },

    extraReducers: (builder) => {
        builder.addCase(registration.fulfilled, (state, action) => {
            state.user = action.payload;
            state.authStatus = StatusRequestEnum.Success;
            state.authError = null;
        }).addCase(authorization.fulfilled, (state, action) => {
            if (action.payload) {
                state.user = action.payload;
                state.authStatus = StatusRequestEnum.Success;
                state.authError = null;
            }
        }) .addCase(sendEmail.fulfilled, (state, action) => {
            if (action.payload) {
                state.authStatus = StatusRequestEnum.Success;
                state.authError = null;
            }
        }).addCase(resetPassword.fulfilled, (state, action) => {
            if (action.payload) {
                state.authStatus = StatusRequestEnum.Success;
                state.authError = null;
            }
        }).addCase(registration.pending, (state, action) => {
            state.authStatus = StatusRequestEnum.Pending;
            state.authError = null;
        }).addCase(resetPassword.pending, (state, action) => {
            state.authStatus = StatusRequestEnum.Pending;
            state.authError = null;
        }).addCase(authorization.pending, (state, action) => {
            state.authStatus = StatusRequestEnum.Pending;
            state.authError = null;
        }) .addCase(sendEmail.pending, (state, action) => {
            state.authStatus = StatusRequestEnum.Pending;
            state.authError = null;

        }).addCase(registration.rejected, (state, action) => {
            state.authStatus = StatusRequestEnum.Error;
            state.authError = action.payload as string
        }).addCase(authorization.rejected, (state, action) => {
            state.authStatus = StatusRequestEnum.Error;
            state.authError = action.payload as string
        }) .addCase(sendEmail.rejected, (state, action) => {
            state.authStatus = StatusRequestEnum.Error;
            state.authError = action.payload as string

        }).addCase(resetPassword.rejected, (state, action) => {
            state.authStatus = StatusRequestEnum.Error;
            state.authError = action.payload as string

        })
    }
});
export const { clearAuthError,addedUser,clearStatusAuth } = authSlice.actions;
export default authSlice.reducer;
