import { AxiosResponse } from 'axios';
import { authAxios, instance } from './api';




export const bookingAPI = {
    booking(  data:BookingDataType ) {
        return instance.post ('bookings', { data}).then((res:AxiosResponse<ResponseType>) => res);
    }  ,
    changeBookingDate (data:BookingDataChangeType) {
        return instance.put(`bookings/${data.bookingId}`, { data : data.data } ).then( (res: AxiosResponse<ResponseType>) => res )
    },
    deleteBookingDate (bookId: string) {
        return instance.delete(`bookings/${bookId}`).then( (res: AxiosResponse<ResponseType>) => res )
    },


};



export type BookingDataType = {

        order: boolean
        dateOrder: string
        book: string
        customer: string

    }
export type BookingDataChangeType = {

     data: { order: boolean
        dateOrder: string
        book: string
        customer: string},
    bookingId : string

}


type ResponseType = {
    data: {
        id: 7,
        attributes: {
            order: boolean,
            createdAt: string,
            updatedAt: string,
            publishedAt: string,
            dateOrder: string
        }
    },
    meta: object

}
