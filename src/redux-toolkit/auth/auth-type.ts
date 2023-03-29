import {  UserType } from '../../api/auth';


export type InitialStateType = {
    user: null | UserType,
    authError: null | string,
    authStatus: null | string,
    isAuth: boolean
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

