
import { AxiosResponse } from "axios";
import { authAxios, instance } from './api';



export const userApi = {
    getUser() {
        return instance.get('users/me').then((res:AxiosResponse<ProfileType>) => res)  }

};


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
