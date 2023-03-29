import { AppStateType } from '../store';
import {  CategoryType } from './books-type';
import { findBooksFromCategory } from '../../helpers/find-books-from-category-helper';

export const getAllBooks = (categoryParams: string | undefined) => (state: AppStateType) => {

    if (state.booksBranch.searchBooks ){
        return  state.booksBranch.searchBooks
    }
  const foundBooks:CategoryType | undefined = findBooksFromCategory(state.booksBranch.categories, categoryParams)

   return  foundBooks ? foundBooks.books : state.booksBranch.books

}

export const getSearchArrayBooksLength = (state: AppStateType)=> state.booksBranch.searchBooks.length
export const getCategoryArrayBooksLength = (categoryParams: string | undefined)=> (state: AppStateType)=> {

    if (categoryParams === 'all'){
        return state.booksBranch.books.length
    }
    const foundBooks: number | undefined = findBooksFromCategory(state.booksBranch.categories, categoryParams)?.books.length;

    return foundBooks ? foundBooks : 0;
}

export const getBookName = (state: AppStateType) => state.booksBranch.book?.title;
export const getCategories = (state: AppStateType) => state.booksBranch.categories;
export const getBookCommentsReverse = (state: AppStateType) => {
   if (state.booksBranch.book?.comments) {
     const commentReverse =  state.booksBranch.book?.comments

       return  [...commentReverse].reverse()
   }
   return null
}

export const getBookComments =  (state: AppStateType )=> state.booksBranch.book?.comments
export const getChosenBook = (state: AppStateType) => state.booksBranch.book;
export const getBooksStatus = (state: AppStateType) => state.booksBranch.status;
export const getBookStatus = (state: AppStateType) => state.booksBranch.bookStatus;
export const getCategoriesStatus = (state: AppStateType) => state.booksBranch.categoriesStatus;
