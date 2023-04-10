/* eslint-disable */
import { createSlice } from "@reduxjs/toolkit";

import { StatusRequestEnum } from "../books/books-type";
import { InitialStateType } from "./profile-type";
import { editProfileUser, getUser } from "./profile-thunks";


const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        user: null,
        profileError: null,
        profileStatus: null,
        editProfileError: null,
        editProfileStatus: null,
    } as InitialStateType,

    reducers: {
    },
    extraReducers: (builder) => {
        builder.addCase(getUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.profileStatus = StatusRequestEnum.Success;
            state.profileError = null;
        }).addCase(getUser.pending, (state, action) => {
            state.profileStatus = StatusRequestEnum.Pending;
            state.profileError = null;
        }).addCase(getUser.rejected, (state, action) => {
            state.profileStatus = StatusRequestEnum.Error;
            state.profileError = action.payload as string
        }).addCase(editProfileUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.editProfileStatus = StatusRequestEnum.Success;
            state.editProfileError = null;
        }).addCase(editProfileUser.pending, (state, action) => {
            state.editProfileStatus = StatusRequestEnum.Pending;
            state.editProfileError = null;
        }).addCase(editProfileUser.rejected, (state, action) => {
            state.editProfileStatus = StatusRequestEnum.Error;
            state.editProfileError = action.payload as string
        })
    }
});
export const { } = profileSlice.actions;
export default profileSlice.reducer;
