/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
import { StatusRequestEnum } from '../../redux-toolkit/books/books-type';
import { Button } from '../../common/button';
import { getBook } from '../../redux-toolkit/books/books-thunks';
import { BreadCrumbs } from './bread-crumbs';

import s from './book-page.module.scss';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import './swiper-style.scss';
import { BookComments } from './book-comments';
import { AppDispatch } from '../../redux-toolkit/store';
import bookCat from '../../assets/images/books/bookCat.svg';
import { useWindowSize } from '../../hooks/window-size-hook';
import { countStars } from '../../helpers/stars-helper';
import {
    getBookComments,
    getBookCommentsReverse,
    getBookStatus,
    getChosenBook
} from '../../redux-toolkit/books/books-selectos';
import { Error } from '../../common/error';
import { BookEstimate } from './book-estimate';
import { getUserId } from '../../redux-toolkit/auth/auth-selectos';
import { usePrevious } from '../../hooks/prev-state';
import { BookBooking } from './book-booking';
import { clearStatusTimeOutTrue } from '../../redux-toolkit/booking/booking-reducer';


export const BookPage: React.FC = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
    const [isEstimate, setIsEstimate] = useState<boolean>(false);
    const [isBooking, setIsBooking] = useState<boolean>(false);
    const dispatch = useDispatch<AppDispatch>();
    const { pathname } = useLocation();
    const { width1000 } = useWindowSize();
    const { bookId } = useParams();
    const book = useSelector(getChosenBook);
    const status = useSelector(getBookStatus);
    const userId = useSelector(getUserId);
    const commentsReverse = useSelector(getBookCommentsReverse);
    const [isUserComment, setIsUserComment] = useState(false);
    const comments = useSelector(getBookComments);
    const prevComments = usePrevious(comments);


    useEffect(() => {

        if (JSON.stringify(comments) !== JSON.stringify(prevComments) && prevComments || comments && prevComments === undefined) {

            if (comments)
                setIsUserComment(comments.some((comment) => comment.user.commentUserId === userId));

        }

    }, [comments]);


    const toggleEstimateModule = () => {
        setIsEstimate(!isEstimate);
    };
    const toggleBookingModule = () => {
        setIsBooking(!isBooking);
    };


    const reloadBookPage = async () => {
        if (bookId)
            await dispatch(getBook(bookId)).then(() => dispatch(clearStatusTimeOutTrue()));
    };

    useEffect(() => {
        if (bookId) {
            dispatch(getBook(bookId));
        }
    }, [pathname, dispatch]);


    const stars = countStars(book?.rating);

    return (
        <section className={s.bookPage}>
            {isEstimate &&
                <BookEstimate reloadBookPage={reloadBookPage} bookId={bookId}
                              toggleEstimateModule={toggleEstimateModule} />
            }
            {status === StatusRequestEnum.Error && <div className={s.wrapperError}><Error /></div>}


            {isBooking && <BookBooking
                bookingId = {book?.booking?.id}
                selectedBookDate={book?.booking?.dateOrder || null}
                isUserBooked={userId === book?.booking?.customerId}
                reloadPage={reloadBookPage} bookId={bookId}
                toggleBookingModule={toggleBookingModule} />}

            <BreadCrumbs />

            {book &&
                StatusRequestEnum.Success && <div className={s.content}>
                    <div className={s.cover}>
                        {!book?.images ? (
                            <div className={s.nonCover}>
                                {' '}
                                <img src={bookCat} alt="cat book" />{' '}
                            </div>
                        ) : book.images.length === 1 ? (
                            <div className={s.oneCover}>
                                {' '}
                                <img loading="lazy"
                                     src={`https://strapi.cleverland.by${book.images[0].url}`}
                                     alt="cover" />{' '}
                            </div>
                        ) : (
                            <>
                                {' '}
                                <Swiper
                                    data-test-id="slide-big"
                                    loop={true}
                                    style={
                                        {
                                            '--swiper-navigation-color': '#fff',
                                            '--swiper-pagination-color': '#363636'
                                        } as React.CSSProperties
                                    }
                                    spaceBetween={10}
                                    navigation={true}
                                    thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                                    modules={[Navigation, Thumbs, Pagination]}
                                    pagination={!width1000 && { clickable: true }}
                                    className="mySwiper2"
                                >
                                    {book.images.map((item, index) => (
                                        <SwiperSlide data-test-id="slide-mini" key={index}>
                                            {' '}
                                            <img alt="cover"
                                                 src={`https://strapi.cleverland.by${item.url}`} />{' '}
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                                {width1000 && (
                                    <Swiper
                                        onSwiper={setThumbsSwiper}
                                        spaceBetween={20}
                                        slidesPerView={5}
                                        scrollbar={{
                                            hide: true,
                                            horizontalClass: 'swiper-scrollbar-horizontal',
                                            dragClass: 'swiper-scrollbar-drag',
                                            draggable: true
                                        }}
                                        modules={[Scrollbar]}
                                        className="mySwiper"
                                    >
                                        {book.images.map((item, index) => (
                                            <SwiperSlide data-test-id="slide-mini" key={index}>
                                                {' '}
                                                <img alt="cover"
                                                     src={`https://strapi.cleverland.by${item.url}`} />{' '}
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                )}
                            </>
                        )}
                    </div>
                    <div className={s.infoWrapper}>
                        <div className={s.info}>
                            <div data-test-id="book-title" className={s.name}>{book?.title}</div>
                            <div className={s.author}>
                                {book?.authors} {book?.issueYear}
                            </div>
                            <div className={s.button}>

                                <Button isUserBooked={userId === book.booking?.customerId}
                                        delivery={book.delivery}
                                        isDisabled={userId === book.booking?.customerId ? true : book.booking ? false : !book.delivery}
                                        isActive={book.booking ? false : !book.delivery}
                                        clickEvent={() => toggleBookingModule()} isBookPage={true}
                                        booking={book.booking} />
                            </div>
                        </div>
                        <div className={s.about}>
                            <div className={s.title}> О книге</div>
                            <div className={s.aboutContent}>{book?.description}</div>

                        </div>
                    </div>

                    <div className={s.rating}>
                        <div className={s.ratingTitle}>Рейтинг</div>
                        <div
                            className={`${s.starsWrapper} ${book?.rating === 0 && s.starsWrapperZero} `}>
                            <div className={s.stars}>
                                {' '}
                                {stars.map((star) => (
                                    <div key={star.id} className={s.star}>
                                        {' '}
                                        <img src={star.star} alt="star" />{' '}
                                    </div>
                                ))}{' '}
                            </div>
                            <div
                                className={s.ratingNumber}>{book?.rating === 0 || !book.rating ? 'ещё нет оценок' : Math.round(book.rating)}</div>
                        </div>
                    </div>

                    <div className={s.dopInfo}>
                        <div className={s.dopInfo__title}>Подробная информация</div>

                        <div className={s.dopInfo__wrapper}>
                            <div className={s.dopInfo__column}>
                                <div className={s.dopInfo__optionWrapper}>
                                    <span className={s.dopInfo__option}>Издательство</span>
                                    <span className={s.dopInfo__descr}>{book?.publish}</span>
                                </div>
                                <div className={s.dopInfo__optionWrapper}>
                                    <span className={s.dopInfo__option}>Год издания</span>{' '}
                                    <span className={s.dopInfo__descr}>{book?.issueYear}</span>
                                </div>
                                <div className={s.dopInfo__optionWrapper}>
                                    <span className={s.dopInfo__option}>Страниц</span>{' '}
                                    <span className={s.dopInfo__descr}>{book?.pages}</span>
                                </div>
                                <div className={s.dopInfo__optionWrapper}>
                                    <span className={s.dopInfo__option}>Переплёт</span>{' '}
                                    <span className={s.dopInfo__descr}>{book?.cover}</span>
                                </div>
                                {' '}
                                <div className={s.dopInfo__optionWrapper}>
                                    <span className={s.dopInfo__option}>Формат</span>{' '}
                                    <span className={s.dopInfo__descr}>{book?.format}</span>
                                </div>
                            </div>
                            <div className={s.dopInfo__column}>
                                <div className={s.dopInfo__optionWrapper}>
                                    <span className={s.dopInfo__option}>Жанр</span> <span
                                    className={s.dopInfo__descr}>{book?.categories}</span>
                                </div>
                                <div className={s.dopInfo__optionWrapper}>
                                    <span className={s.dopInfo__option}>Вес</span> <span
                                    className={s.dopInfo__descr}>{book?.weight}</span>
                                </div>
                                <div className={s.dopInfo__optionWrapper}>
                                    <span className={s.dopInfo__option}>ISBN</span> <span
                                    className={s.dopInfo__descr}>{book?.ISBN}</span>
                                </div>
                                <div className={s.dopInfo__optionWrapper}>
                                    <span className={s.dopInfo__option}>Изготовитель</span>{' '}
                                    <span className={s.dopInfo__descr}>{book?.producer}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <BookComments isUserComment={isUserComment}
                                  toggleEstimateModule={toggleEstimateModule}
                                  comments={commentsReverse} />


                </div>}
        </section>
    );
};
