import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, AppStateType } from "../store";
import { booksAPI } from "../../api/books";
import { Book, Books, CategoryType } from "./books-type";


const createAppAsyncThunk = createAsyncThunk.withTypes<{
    state: AppStateType
    dispatch: AppDispatch
    rejectValue: string
    extra?: { s: string; n: number }
}>();
export const getBooks = createAppAsyncThunk(
    "api/books",
    async (_, { rejectWithValue }) => {
        try {
            return await booksAPI.getBooks() as Books[]
        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.message);
        }
    }
);
export const getBook = createAppAsyncThunk(
    "api/book",
    async (id: string , { rejectWithValue }) => {

        try {
            return await booksAPI.getBook(id)  as Book;

        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.message);
        }
    }
);
export const getCategories = createAppAsyncThunk(
    "api/categories",
    async (_, { rejectWithValue }) => {


        try {
            return await booksAPI.getCategories() as CategoryType[];

        } catch (error) {
            const err = error as AxiosError;
            return rejectWithValue(err.message);
        }
    }
);
