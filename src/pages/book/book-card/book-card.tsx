import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { countStars } from '../../../helpers/stars-helper';
import catBook from '../../../assets/images/books/bookCat.svg';
import { Button } from '../../../common/button';
import { AppDispatch } from '../../../redux-toolkit/store';
import {  sortRating } from '../../../redux-toolkit/books/books-reducer';
import { Books } from '../../../redux-toolkit/books/books-type';

import s from './book-card.module.scss';


const Hightlight: React.FC<HightlightType> = ({ filter, str }) => {

    if (!filter) return str;
    const regexp = new RegExp(filter, 'ig');
    const matchValue = str.match(regexp);
    if (matchValue) {
        return str.split(regexp).map((notCoincidence: any, index: number, array: string | any[]) => {

            if (index < array.length - 1) {

                const coincidence = matchValue.shift();

                return <span key={Math.random()}>{notCoincidence}
                    <mark data-test-id="highlight-matches"
                          className={s.redLetter}>{coincidence}</mark></span>;
            }
            return notCoincidence;
        });
    }
    return str;
};

export const BookCard: React.FC<Book> = ({
                                             isSortingList,
                                             isRatingSort,
                                             books,
                                             category,
                                             searchText,
                                             setNumberBookingBookUserId,
                                             handleSetBookingId,
                                             toggleBookingModule,
                                             setIdCard,
                                             userId,
                                             selectCurrentBookDate
                                         }) => {

    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        dispatch(sortRating({
            category,
            isSorting: isRatingSort
        }));
    }, [category, dispatch, isRatingSort, books]);


    const ligth = useCallback((str: string) => <Hightlight filter={searchText}
                                                           str={str} />, [searchText]);

    return (
        <div
            className={`${s.book} ${isSortingList && s.bookList} ${!isSortingList && s.bookSquare}`}>
            {books.map((book) => {
                const stars = countStars(book.rating);


                return (
                    <div className={s.bookWrapper} key={book.id}>

                            <div data-test-id="card" key={book.id} className={s.BookItem}>
                                <NavLink to={`/books/${category}/${book.id}`}>
                                <div className={s.cover}>
                                    <img alt="cover"
                                         src={book.image ? `https://strapi.cleverland.by${book.image.url}` : catBook} />
                                </div> </NavLink>
                                <div className={s.wrapper}>    <NavLink to={`/books/${category}/${book.id}`}>
                                    <div className={s.stars}>
                                        {' '}
                                        { book.rating === null ?  <span className={s.noStars}>ещё нет оценок</span> :  stars.map((star) => (
                                            <div key={star.id} className={s.star}>
                                                {' '}
                                                <img src={star.star} alt="star" />{' '}
                                            </div>
                                        ))  }{' '}
                                    </div>
                                    <div className={s.info}>
                                        <div className={s.name}>
                                            {ligth(book.title)}
                                        </div>
                                        <div className={s.author}>
                                            {book.authors}, {book.issueYear}
                                        </div>
                                    </div>
                                </NavLink>
                                    <div className={s.button}>
                                        <Button isUserBooked={userId === book.booking?.customerId } delivery={book.delivery} isDisabled={ userId === book.booking?.customerId  ? true : book.booking ? false : !book.delivery} isActive={book.booking  ? false : !book.delivery} clickEvent={ ()=> {
                                            toggleBookingModule();
                                            setIdCard(book.id)
                                            setNumberBookingBookUserId(book.booking?.customerId )
                                            selectCurrentBookDate(book.booking?.dateOrder )
                                            handleSetBookingId(book.booking?.id)
                                        } } booking={book.booking} />
                                    </div>
                                </div>
                            </div>

                    </div>
                );
            })}
        </div>
    );
};


type HightlightType = {
    filter: string,
    str: string | any
}

type Book = {
    isSortingList: boolean;
    isRatingSort: boolean
    books: Books[],
    category
        :
        string | undefined
    toggleBookingModule: ()=> void
    searchText: string
    setIdCard: (idCard:number)=> void
    setNumberBookingBookUserId: (idUser:number | null)=> void
    selectCurrentBookDate: (date:string | null)=> void
    userId: number | undefined
    handleSetBookingId: (bookingId: number | null )=> void

};
