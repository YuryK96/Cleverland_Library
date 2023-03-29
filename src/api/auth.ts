import { authAxios, instance } from './api';
import { DefaultResponseTypes } from '../redux-toolkit/auth/auth-type';


export const authAPI = {
    createNewUser(  data:CreateNewUserType ) {
        return authAxios.post<DefaultResponseTypes> ('auth/local/register', {...data}).then((res) => res);
    }  ,
    authorization(  data:AuthorizationType ) {
        return authAxios.post<DefaultResponseTypes> ('auth/local', {...data}).then((res) => res);
    },
    sendEmail(  data: {email: string} ) {
        return authAxios.post<DefaultResponseTypes> ('auth/forgot-password', {...data}).then((res) => res);
    }, resetPassword(  data: ResetPasswordType ) {
        return authAxios.post<DefaultResponseTypes> ('auth/reset-password', {...data}).then((res) => res);
    }
};

export type CreateNewUserType = {
    username: string,
        password: string,
        firstName: string,
        lastName: string,
        phone: string,
        email: string
}
export type UserType = {
    blocked: boolean,
    confirmed: boolean,
    createdAt: string,
    id: number,
    provider: string,
    updatedAt: string,
    username: string,
        password?: string,
        firstName: string,
        lastName: string,
        phone: string,
        email: string
}

export type AuthorizationType = {
    identifier: string,
    password: string
}

export type ResetPasswordType = {
    password: string,
    passwordConfirmation: string,
    code: string
}
