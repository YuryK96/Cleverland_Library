
import { instance } from "./api";



export const booksAPI = {

    getBooks(){
        return instance.get('books').then( (res)=>res.data )
    },
    getBook(id: string ){
        return instance.get(`books/${id}`).then( (res)=>res.data )
    },
    getCategories( ){
        return instance.get('categories').then( (res)=>res.data )
    },

}



