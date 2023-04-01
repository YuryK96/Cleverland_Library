import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AppDispatch, AppStateType } from "../store";
import { userApi } from "../../api/user";


const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppStateType
    dispatch: AppDispatch
    rejectValue: string
    extra?: { s: string; n: number }
}>();



export const getUser = createAppAsyncThunk(
    'user/me',
    async (_, { rejectWithValue }) => {
        try {

            const response  = await userApi.getUser().then( (res)=> res.data);

            return response
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue( String(err.message));
        }
    }
);
