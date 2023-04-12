/* eslint-disable */
import { createSlice } from '@reduxjs/toolkit';

import { StatusRequestEnum } from '../books/books-type';

import { InitialStateType, StatusTypeBookingEnum } from './booking-type';
import { booking, changeBookingDate, deleteBookingDate } from './booking-thunks';

const bookingSlice = createSlice({
    name: 'booking',
    initialState: {
        status: null,
        error: null,
        timeOutStatus: false,
        type: null,
    } as InitialStateType,

    reducers: {
        clearStatusTimeOutTrue: (state)=> {
            state.timeOutStatus = true
        },
        clearStatusTimeOut: (state)=> {
            state.timeOutStatus = false
            state.status = null;
            state.error = null

        },
        clearStatusBooking(state) {
            state.status = null;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(booking.fulfilled, (state, action) => {
            state.status = StatusRequestEnum.Success;
            state.type = null
            state.error = null;
        }).addCase(booking.pending, (state, action) => {
            state.status = StatusRequestEnum.Pending;
            state.error = null;
        }).addCase(booking.rejected, (state, action) => {
            state.status = StatusRequestEnum.Error;
            state.type = null
            state.error = action.payload as string
        }).addCase(changeBookingDate.fulfilled, (state, action) => {
            state.status = StatusRequestEnum.Success;
            state.type = StatusTypeBookingEnum.changeBooking
            state.error = null;
        }).addCase(changeBookingDate.pending, (state, action) => {
            state.status = StatusRequestEnum.Pending;
            state.error = null;
        }).addCase(changeBookingDate.rejected, (state, action) => {
            state.status = StatusRequestEnum.Error;
            state.type = StatusTypeBookingEnum.changeBooking
            state.error = action.payload as string
        }).addCase(deleteBookingDate.fulfilled, (state, action) => {
            state.status = StatusRequestEnum.Success;
            state.type = StatusTypeBookingEnum.deleteBooking
            state.error = null;
        }).addCase(deleteBookingDate.pending, (state, action) => {
            state.status = StatusRequestEnum.Pending;
            state.error = null;
        }).addCase(deleteBookingDate.rejected, (state, action) => {
            state.status = StatusRequestEnum.Error;
            state.type = StatusTypeBookingEnum.deleteBooking
            state.error = action.payload as string
        })
    }
});
export const {clearStatusTimeOut,clearStatusTimeOutTrue,clearStatusBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
