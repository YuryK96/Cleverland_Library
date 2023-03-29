import { AppStateType } from '../store';


export const getBookingStatus = (state:AppStateType)=> state.bookingBranch.status
export const getBookingError = (state:AppStateType)=> state.bookingBranch.error
export const getBookingTimeOutStatus = (state:AppStateType)=> state.bookingBranch.timeOutStatus
export const getBookingTypeStatus = (state:AppStateType)=> state.bookingBranch.type
