import {  UserType } from '../../api/auth';
import { StatusRequestEnum } from '../books/books-type';


export type InitialStateType = {
  status: StatusRequestEnum | null,
    error: string | null
    changeEstimateStatus: StatusRequestEnum | null,
}

export type CommentType = {
    text: string,
    book: string | undefined,
    user: string,
    rating: number
    userLastName?: string | undefined
    userFirstName?: string | undefined
}


export type DefaultResponseTypes= {
    jwt: string;
    user: UserType;

    data: {
        jwt: string,
        user: UserType,
    }
    config: any,
    headers: any,
    request: any,
    status: number,
    statusText: string,
};
