import { ProfileType } from "../../api/user";


export type InitialStateType = {
    user: null | ProfileType,
    profileError: null | string,
    profileStatus: null | string,

}


