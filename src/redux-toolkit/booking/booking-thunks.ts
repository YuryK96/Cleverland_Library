import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { AppDispatch, AppStateType } from '../store';
import { bookingAPI, BookingDataChangeType, BookingDataType } from '../../api/booking';


const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppStateType
    dispatch: AppDispatch
    rejectValue: string
    extra?: { s: string; n: number }
}>();


export const booking = createAppAsyncThunk(
    'booking',
    async (data: BookingDataType, { rejectWithValue }) => {
        try {
            const response = await bookingAPI.booking(data);
            return response.data;

        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(String(err.message));
        }
    }
);

export const changeBookingDate = createAppAsyncThunk(
    'booking/change',
    async (data: BookingDataChangeType, { rejectWithValue }) => {
        try {
            const response = await bookingAPI.changeBookingDate(data);
            return response.data;

        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(String(err.message));
        }
    }
);
export const deleteBookingDate = createAppAsyncThunk(
    'booking/delete',
    async (bookId: string, { rejectWithValue }) => {
        try {
            const response = await bookingAPI.deleteBookingDate(bookId);
            return response.data;

        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(String(err.message));
        }
    }
);

