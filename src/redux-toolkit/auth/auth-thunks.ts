import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError, AxiosResponse } from 'axios';
import { AppDispatch, AppStateType } from '../store';
import {
    authAPI,
    AuthorizationType,
    CreateNewUserType,
    ResetPasswordType,
    UserType
} from '../../api/auth';
import { DefaultResponseTypes } from './auth-type';


const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppStateType
    dispatch: AppDispatch
    rejectValue: string
    extra?: { s: string; n: number }
}>();


export const registration = createAppAsyncThunk(
    'auth/local/register',
    async (data: CreateNewUserType, { rejectWithValue }) => {
        try {

            const response = await authAPI.createNewUser(data);
            return response.data.user;
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue( String(err.response?.status));
        }
    }
);
export const authorization = createAppAsyncThunk(
    'auth/local',
    async (data: AuthorizationType, { rejectWithValue }) => {
        try {

            const response:UserType  = await authAPI.authorization(data).then( (res)=> {
                localStorage.setItem('token',  res.data.jwt);

                // Adding user in Local Storage
                localStorage.setItem('user',  JSON.stringify(res.data.user));

                return res.data.user;
            });

           return response
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue( String(err.response?.status));
        }
    }
);
export const sendEmail = createAppAsyncThunk(
    'auth/forgot-password',
    async (data: {email: string}, { rejectWithValue }) => {
        try {

            const response  = await authAPI.sendEmail(data).then( (res)=> res.data);

            return response
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue( String(err.message));
        }
    }
);
export const resetPassword = createAppAsyncThunk(
    'auth/reset-password',
    async (data: ResetPasswordType, { rejectWithValue }) => {
        try {

            const response  = await authAPI.resetPassword(data).then( (res)=> res.data);

            return response
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue( String(err.message));
        }
    }
);
