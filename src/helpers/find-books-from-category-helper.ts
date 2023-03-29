import { CategoryType } from "../redux-toolkit/books/books-type";


export const findBooksFromCategory = (categories: CategoryType[], categoryParams: string | undefined)=> categories.find( (category)=>category.path === categoryParams )

