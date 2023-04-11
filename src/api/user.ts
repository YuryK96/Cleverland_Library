
import { AxiosResponse } from "axios";
import { authAxios, instance } from './api';



export const userApi = {
    getUser() {
        return instance.get('users/me').then((res:AxiosResponse<ProfileType>) => res)  },
    editProfileUser (id: number,data:EditProfileType | EditProfilePhotoType) {
        return instance.put( `users/${id}`, data ).then((res:AxiosResponse<ProfileType>) => res)
    },
    sendPhoto(photo: string | Blob) {
        const formData = new FormData();
        formData.append('files', photo)
        return instance.post('upload',  formData  ).then( (res:AxiosResponse<SendPhotoResponseType[]>)=> res )
    }

};


type SendPhotoResponseType = {
    id: number,
    name: string,
    alternativeText: null,
    caption: null,
    width: number,
    height: number,
    formats: {
        thumbnail:PhotoFormatType,
        large: PhotoFormatType,
        medium: PhotoFormatType,
        small: PhotoFormatType
    }
    hash: string,
    ext: string,
    mime: string,
    url: string,
    preview: null,
    provider: string,
    provider_metadata: number,
    createdAt: string,
    updateAt: string,
}

type PhotoFormatType = {
    name: string,
    hash: string,
    ext: string,
    mime: string,
    path: null,
    width: number,
    height: number,
    size: number,
    url: string,
}

export type EditProfileType = {
    username: string,
    password: string
    firstName: string,
    lastName: string
    phone: string
    email: string
}

type EditProfilePhotoType = {
    avatar: number
}

export type ProfileType = {
    id: number,
    username: string,
    email: string,
    confirmed: boolean,
    blocked: boolean,
    createdAt: string,
    updateAt: string,
    firstName: string,
    lastName: string,
    phone: string,
    role: {
        id: number,
        name: string,
        description: string,
        type: string,
    },
    comments: CommentType[],
    avatar: string,
    booking: {
        id: number,
        order: boolean,
        dateOrder: string,
        book: BookType
    }
    delivery: {
        id: number,
        handed: boolean,
        dateHandedFrom: string,
        dateHandedTo: string,
        book: BookType
    },
    history: {
        id: number,
        books: BookType[]
    }
}


type BookType = {
    id: number,
    title: string,
    rating: number,
    issueYear: string,
    authors: string[],
    image: string | null
}

type CommentType = {
    id: number,
    rating: number,
    text: string | null,
    bookId: number
}
