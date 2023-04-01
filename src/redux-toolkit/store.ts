import { combineReducers, configureStore } from '@reduxjs/toolkit';

import booksSlice from './books/books-reducer';
import authSlice from './auth/auth-reducer';
import commentingSlice from './commenting/commenting-reducer';
import bookingSlice from './booking/booking-reducer';
import profileSlice from './profile/profile-reducer';

const rootReducer = combineReducers({
  booksBranch: booksSlice,
    authBranch: authSlice,
    commentsBranch: commentingSlice,
    bookingBranch: bookingSlice,
    profileBranch: profileSlice

});

export const store = configureStore({
  reducer: rootReducer,
});
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;
export type AppDispatch = typeof store.dispatch
