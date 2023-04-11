import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError, AxiosResponse } from "axios";
import { AppDispatch, AppStateType } from "../store";
import { ProfileType, userApi } from "../../api/user";
import { EditUserProfilePhotoType, EditUserProfileType } from "./profile-type";


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
export const editProfileUser = createAppAsyncThunk(
    'users/id',
    async (data:EditUserProfileType, { rejectWithValue }) => {
        try {

            const response  = await userApi.editProfileUser(data.id, data.profile).then( (res)=> res.data);

            return response
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue( String(err.message));
        }
    }
);
export const editProfilePhoto = createAppAsyncThunk(
    'upload',
    async (data:EditUserProfilePhotoType, { rejectWithValue }) => {
        try {



            const response  = await userApi.sendPhoto(data.photo).then(   (res)=> userApi.editProfileUser(data.id  ,  { avatar:res.data[0].id   }).then(   (res:AxiosResponse<ProfileType>)=>
                 res.data
            )    );

            return response
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue( String(err.message));
        }
    }
);
