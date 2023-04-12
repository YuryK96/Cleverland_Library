/* eslint-disable */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CommentType, InitialStateType, StatusRequestEnum } from './books-type';
import { getBook, getBooks, getCategories } from "./books-thunks";
import { findBooksFromCategory } from "../../helpers/find-books-from-category-helper";


const booksSlice = createSlice({
        name: "books",
        initialState: {
            books: [],
            book: null,
            bookStatus: null,
            bookError: null,
            categories: [],
            searchBooks: [],
            status: null,
            categoriesStatus: null,
            error: null,
            categoryError: null
        } as InitialStateType,
        reducers: {
            clearStatusBook: (state)=> {

                state.bookStatus = null
                state.bookError = null

            },
            sortRating(state, action: PayloadAction<{ category: string | undefined; isSorting: boolean }>) {
                if (state.searchBooks) {
                    if (action.payload.isSorting) {
                        if (action.payload.category === "all") {
                            state.searchBooks.sort((a, b) => sortingUp(a.rating, b.rating));
                        }
                        state.searchBooks.sort((a, b) => sortingUp(a.rating, b.rating));
                    }
                    if (!action.payload.isSorting) {
                        if (action.payload.category === "all") {
                            state.searchBooks.sort((a, b) => sortingDown(a.rating, b.rating));
                        }
                        state.searchBooks.sort((a, b) => sortingDown(a.rating, b.rating));
                    }
                } else {

                    if (action.payload.isSorting) {
                        if (action.payload.category === "all") {
                            state.books.sort((a, b) => sortingUp(a.rating, b.rating));
                        }
                        findBooksFromCategory(state.categories, action.payload.category)?.books.sort((a, b) => sortingUp(a.rating, b.rating));
                    }
                    if (!action.payload.isSorting) {
                        if (action.payload.category === "all") {
                            state.books.sort((a, b) => sortingDown(a.rating, b.rating));
                        }
                        findBooksFromCategory(state.categories, action.payload.category)?.books.sort((a, b) => sortingDown(a.rating, b.rating));
                    }
                }

            },
            searchBooks(state, action: PayloadAction<{ search: string, category: string | undefined }>) {

                if (action.payload.category === "all") {
                    state.searchBooks = state.books.filter((book) => book.title.toLowerCase().includes(action.payload.search.toLowerCase())
                    );


                } else {
                    const foundBooks = findBooksFromCategory(state.categories, action.payload.category)?.books.filter((book) => book.title.toLowerCase().includes(action.payload.search.toLowerCase())
                    );

                    state.searchBooks = foundBooks ? foundBooks : [];
                }

            },

        },
        extraReducers: (builder) => {
            builder
                .addCase(getBooks.fulfilled, (state, action) => {
                    state.status = StatusRequestEnum.Success;
                    state.books = action.payload;
                    state.error = null;

                    state.categories.forEach((item)=> item.books = [] )
                    state.categories.forEach((item) => {
                            state.books.forEach((book) => {
                                if (book.categories) {
                                    book.categories.forEach((category) => {
                                        if (item.name === category) {
                                            item.books.push(book);
                                        }
                                    });
                                }
                            });
                    });

                })
                .addCase(getCategories.fulfilled, (state, action) => {
                    state.categoriesStatus = StatusRequestEnum.Success;
                    if (state.categories.length !== action.payload.length) {
                        action.payload.forEach((item) => {
                            return state.categories.push({
                                ...item, books: []
                            });
                        });
                    }

                    state.categoryError = null;


                })
                .addCase(getBook.fulfilled, (state, action) => {
                    state.book = { ...state.book, ...action.payload };
                    state.bookStatus = StatusRequestEnum.Success;
                    state.bookError = null;
                })
                .addCase(getBook.rejected, (state, action) => {
                    state.bookStatus = StatusRequestEnum.Error;
                    state.bookError = action.payload as string;

                })
                .addCase(getCategories.rejected, (state, action) => {
                    state.categoriesStatus = StatusRequestEnum.Error;
                    state.categoryError = action.payload as string;
                })
                .addCase(getBooks.rejected, (state, action) => {
                    state.status = StatusRequestEnum.Error;
                    state.error = action.payload as string;
                })
                .addCase(getBooks.pending, (state, action) => {
                    state.status = StatusRequestEnum.Pending;
                    state.error = null;
                }).addCase(getCategories.pending, (state, action) => {
                state.categoriesStatus = StatusRequestEnum.Pending;
                state.categoryError = null;
            }).addCase(getBook.pending, (state, action) => {
                state.bookStatus = StatusRequestEnum.Pending;
                state.bookError = null;
            });

        }

    }
);

const sortingUp = (a: number | null, b: number | null) => (b != null ? b : -Infinity) - (a != null ? a : -Infinity);
const sortingDown = (a: number | null, b: number | null) => (a != null ? a : -Infinity) - (b != null ? b : -Infinity);


export const { sortRating, searchBooks,clearStatusBook } = booksSlice.actions;
export default booksSlice.reducer;

