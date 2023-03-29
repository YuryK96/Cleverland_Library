

export enum StatusRequestEnum {
    Pending = "pending",
    Success = "resolved",
    Error = "rejected",
}

export type InitialStateType = {
    books:   Books[] ,
    book: Book | null;
    categories: CategoryType[]  ;
    searchBooks: Books[];
    categoriesStatus : StatusRequestEnum | null,
    bookStatus: StatusRequestEnum |  null,
    bookError:string | null
    status: StatusRequestEnum | null;
    error: string | null;
    categoryError : string | null
};

export type Books = {
    issueYear: string | null;
    rating: number | null;
    title: string ;
    authors: string[] | null;
    image: { url: string | null; };
    categories: string[] | null;
    id: number;
    booking: BookingType,
    delivery: DeliveryType,
    histories: Array<{ id: number | null, userId: number | null }>

};

export type Book = {
    id: number;
    title: string;
    rating: number | null;
    issueYear: string | null;
    description: string | null;
    publish: string | null;
    pages: string | null;
    cover: string | null;
    weight: string | null;
    format: string | null;
    ISBN: string | null;
    producer: string | null;
    authors: string[] | null;
    images: Array<{ url: string | null; }>;
    categories: string[] ,
    comments: CommentType[],
    booking: BookingType,
    delivery: DeliveryType,
    histories: Array<{ id: number | null, userId: number | null }>

};
export type CommentType = {
    id: number,
    rating: number,
    text: string | null,
    createdAt: string,
    user: {
        commentUserId: number,
        firstName: string,
        lastName: string,
        avatarUrl: string | null
    }

}

export type BookingType = {
    id: number,
    order: boolean,
    dateOrder: string | null,
    customerId: number | null,
    customerFirstName: string | null,
    customerLastName: string | null,

}

export type DeliveryType = {
    id: number,
    handed: boolean,
    dateHandedFrom: string | null,
    dateHandedTo: string | null,
    recipientId: number | null,
    recipientFirstName: string | null,
    recipientLastName: string | null,
}

type ErrorType = {
    data: null,
    error: {
        status: number,
        name: string,
        message: string,
        details: object
    }
}


export type CategoryType = {
    name: string,
    path: string,
    id: number
    books: Books[]

}
