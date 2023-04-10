import { EditProfileType, ProfileType } from "../../api/user";


export type InitialStateType = {
    user: null | ProfileType,
    profileError: null | string,
    profileStatus: null | string,
    editProfileError: null | string,
    editProfileStatus: null | string,

}


export type EditUserProfileType = {
    id: number,
    profile: EditProfileType
}
