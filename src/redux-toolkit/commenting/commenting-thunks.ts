import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AppDispatch, AppStateType } from '../store';
import { CommentType } from './commenting-type';
import { commentingAPI } from '../../api/commenting';
import { addComment } from '../books/books-reducer';


const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppStateType
    dispatch: AppDispatch
    rejectValue: string
    extra?: { s: string; n: number }
}>();


export const sendComment = createAppAsyncThunk(
    'comment',
    async (data: CommentType, { rejectWithValue, dispatch }) => {
        try {

            const response = await commentingAPI.sendComment(data).then( (res)=> {
                    dispatch(addComment({
                        id: data.user,
                        rating: res.data.attributes.rating,
                        text: res.data.attributes.text || '',
                        createdAt: res.data.attributes.createdAt,
                        user: {
                            commentUserId: res.data.id,
                            avatarUrl: null,
                            firstName: data.userFirstName || '',
                            lastName: data.userLastName || ''
                        }
                    }));
                    return res.data;
                }

            );


            return response

        } catch (error) {
            const err = error as AxiosError;

            return rejectWithValue(String(err.message));
        }
    }
);
