import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { NotFoundBooks } from '../../common/not-found-books';
import {
    getAllBooks,
    getBooksStatus,
    getCategoriesStatus, getCategoryArrayBooksLength, getSearchArrayBooksLength
} from '../../redux-toolkit/books/books-selectos';
import { StatusRequestEnum } from '../../redux-toolkit/books/books-type';
import { BookCard } from '../book/book-card';

import { SearchPanel } from './search-panel';

import s from './homePage.module.scss';
import { BookBooking } from '../book/book-booking';
import { getBooks, getCategories } from '../../redux-toolkit/books/books-thunks';
import { AppDispatch } from '../../redux-toolkit/store';
import { getUserId } from '../../redux-toolkit/auth/auth-selectos';
import { clearStatusTimeOutTrue } from '../../redux-toolkit/booking/booking-reducer';


export const HomePage = () => {
    const [isSortingList, setIsSortingList] = useState<boolean>(false);
    const [isRatingSort, setIsRatingSort] = useState<boolean>(true);
    const [cardId, setCardId] = useState<null | number | undefined>(null);
    const [bookingBookUserId, setBookingBookUserId] = useState<null | number >(null);
    const [bookingId, setBookingId] = useState<null | number >(null);
    const [selectedBookDate, setSelectedBookDate] = useState<null | string >(null);
    const [searchText, setSearchText] = useState('');
    const { category } = useParams();
    const searchArrayBooksLength = useSelector(getSearchArrayBooksLength);
    const categoryArrayBooksLength = useSelector(getCategoryArrayBooksLength(category));
    const books = useSelector(getAllBooks(category));
    const status = useSelector(getBooksStatus);
    const dispatch = useDispatch<AppDispatch>();
    const [isBooking, setIsBooking] = useState<boolean>(false);
    const categoryStatus = useSelector(getCategoriesStatus);
    const userId = useSelector(getUserId);


    const reloadBooksPage = async ()=> {
         await   dispatch(getBooks()).then( ()=> dispatch(clearStatusTimeOutTrue()) )
    }
    const setIdCard = (number:number)=> {
        setCardId(number)
    }
    const handleSetBookingId = (number:number | null)=> {
        setBookingId(number);
    }
    const setNumberBookingBookUserId = (number:number | null)=> {
            setBookingBookUserId(number);
    }
    const selectCurrentBookDate = (date:string | null)=> {
        setSelectedBookDate(date);
    }
    const removeSearchText = () => {
        setSearchText('');
    };
    const addSearchText = (text: string) => {
        setSearchText(text);
    };
    const handleSetIsSortingList = (boolean: boolean) => {
        setIsSortingList(boolean);
    };
    const toggleRatingSort = () => {
        setIsRatingSort(!isRatingSort);
    };

    const toggleBookingModule = () => {
        setIsBooking(!isBooking);
    };

    return (

        <section className={s.homePage}>
            {isBooking && <div className={s.bookingWrapper}> <BookBooking
                bookingId={bookingId}
                selectedBookDate={selectedBookDate}
                isUserBooked={userId === bookingBookUserId }
                reloadPage={reloadBooksPage} bookId={cardId} margin='0 0 0 0' toggleBookingModule={toggleBookingModule} /> </div>}

            {status === StatusRequestEnum.Success && categoryStatus === StatusRequestEnum.Success && <React.Fragment>
                <SearchPanel removeSearchText={removeSearchText} addSearchText={addSearchText}
                             category={category} toggleRatingSort={toggleRatingSort}
                             isSortingList={isSortingList}
                             handleSetIsSortingList={handleSetIsSortingList} />
                {searchArrayBooksLength === 0 && searchText || categoryArrayBooksLength === 0 ?
                    <NotFoundBooks
                        id={categoryArrayBooksLength === 0 ? 'empty-category' : 'search-result-not-found'}
                        title={categoryArrayBooksLength === 0 ? 'В этой категории книг ещё нет' : 'По запросу ничего не найдено'} /> :
                    <BookCard setIdCard={setIdCard}
                              handleSetBookingId={handleSetBookingId}
                              selectCurrentBookDate={selectCurrentBookDate}
                              setNumberBookingBookUserId={setNumberBookingBookUserId}
                              userId={userId}
                              toggleBookingModule={toggleBookingModule} searchText={searchText}
                              books={books} category={category} isRatingSort={isRatingSort}
                              isSortingList={isSortingList} />} </React.Fragment>}
        </section>
    );
};
