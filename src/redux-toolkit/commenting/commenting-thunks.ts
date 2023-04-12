import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { AppDispatch, AppStateType } from "../store";
import { CommentType } from "./commenting-type";
import { commentingAPI } from "../../api/commenting";



const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppStateType
    dispatch: AppDispatch
    rejectValue: string
    extra?: { s: string; n: number }
}>();


export const sendComment = createAppAsyncThunk(
    "comment",
    async (data: CommentType, { rejectWithValue, dispatch }) => {
        try {

            const response = await commentingAPI.sendComment(data).then((res) => res.data
            );


            return response;

        } catch (error) {
            const err = error as AxiosError;

            return rejectWithValue(String(err.message));
        }
    }
);


export const changeComment = createAppAsyncThunk(
    "comments/commentId",
    async (data: { data: CommentType, commentId: number| null }, { rejectWithValue, dispatch }) => {
        try {

            const response = await commentingAPI.changeComment(data.data, data.commentId).then((res) => res.data
            );


            return response;

        } catch (error) {
            const err = error as AxiosError;

            return rejectWithValue(String(err.message));
        }
    }
);
