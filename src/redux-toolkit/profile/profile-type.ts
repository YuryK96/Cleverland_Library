import { EditProfileType, ProfileType } from "../../api/user";


export type InitialStateType = {
    user: null | ProfileType,
    profileError: null | string,
    profileStatus: null | string,
    editProfileError: null | string,
    editProfileStatus: null | string,
  editProfilePhotoError: null | string,
    editProfilePhotoStatus: null | string,

}


export type EditUserProfileType = {
    id: number,
    profile: EditProfileType
}
export type EditUserProfilePhotoType = {
    id: number,
    photo: string | Blob
}
