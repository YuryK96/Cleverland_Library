
import { StatusRequestEnum } from '../books/books-type';

export enum StatusTypeBookingEnum {
    changeBooking = "changeBooking",
    deleteBooking = "deleteBooking",
}
export type InitialStateType = {
  status: StatusRequestEnum | null,
    error: string | null
    timeOutStatus: boolean,
    type: null | StatusTypeBookingEnum
}


