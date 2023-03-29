import { FC, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import s from './book-booking.module.scss';
import { Button } from '../../../common/button';
import { getUserId } from '../../../redux-toolkit/auth/auth-selectos';
import { AppDispatch } from '../../../redux-toolkit/store';
import { Calendar } from './calendar';
import {
    booking,
    changeBookingDate,
    deleteBookingDate
} from '../../../redux-toolkit/booking/booking-thunks';
import { clearStatusTimeOutTrue } from '../../../redux-toolkit/booking/booking-reducer';


export const BookBooking: FC<BookEstimateType> = ({
                                                      toggleBookingModule,
                                                      margin,
                                                      bookId,
                                                      isUserBooked,
    reloadPage,
                                                      bookingId,
                                                      selectedBookDate

                                                  }) => {


    const userId = useSelector(getUserId);
    const [selectedDay, setSelectedDay] = useState<number | null>(selectedBookDate && new Date(selectedBookDate).getDate() || null);

    const dispatch = useDispatch<AppDispatch>();
    const date = new Date();

    const bookingBook = async () => {
        if(bookId && selectedDay)
      await  dispatch(booking({

                order: true,
                dateOrder: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                    selectedDay, date.getUTCHours(),
                    date.getUTCMinutes(), date.getUTCSeconds())).toISOString(),
                book: String(bookId),
                customer: String(userId)

        })).then(   ()=> {
          toggleBookingModule()
          reloadPage();
      }  )
    };
   const deleteBookDate = async () => {
        if(bookId && selectedDay)
      await  dispatch(deleteBookingDate(String(bookingId))).then(   ()=> {
          toggleBookingModule()
          reloadPage();
      }  )
    };
   const  changeBookDate = async () => {
        if(bookId && selectedDay && bookingId)
      await  dispatch(changeBookingDate({

             data: {   order: true,
                dateOrder: new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(),
                    selectedDay, date.getUTCHours(),
                    date.getUTCMinutes(), date.getUTCSeconds())).toISOString(),
                book: String(bookId),
                customer: String(userId)},
          bookingId :  String(bookingId)

        })).then(   ()=> {
          toggleBookingModule()
          reloadPage();
      }  )
    };


    const handleSetSelectedDay = (day: number) => {
        setSelectedDay(day);
    };
    const handleClearSelectedDay = () => {
        setSelectedDay(null);
    };

    return <div style={margin ? { margin } : {}} role="presentation" data-test-id="modal-outer"
                className={s.bookLayout}>
        <div role="presentation" onClick={toggleBookingModule} className={s.exitCover} />
        <div data-test-id="modal-rate-book" className={s.container}>
            <div role="presentation" data-test-id="modal-close-button"
                 onClick={toggleBookingModule} className={s.closeButton}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="24" fill="#F9F9FA" />
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M30.7071 17.2929C31.0976 17.6834 31.0976 18.3166 30.7071 18.7071L18.7071 30.7071C18.3166 31.0976 17.6834 31.0976 17.2929 30.7071C16.9024 30.3166 16.9024 29.6834 17.2929 29.2929L29.2929 17.2929C29.6834 16.9024 30.3166 16.9024 30.7071 17.2929Z"
                          fill="url(#paint0_linear_25102_7177)" />
                    <path fillRule="evenodd" clipRule="evenodd"
                          d="M17.2929 17.2929C17.6834 16.9024 18.3166 16.9024 18.7071 17.2929L30.7071 29.2929C31.0976 29.6834 31.0976 30.3166 30.7071 30.7071C30.3166 31.0976 29.6834 31.0976 29.2929 30.7071L17.2929 18.7071C16.9024 18.3166 16.9024 17.6834 17.2929 17.2929Z"
                          fill="url(#paint1_linear_25102_7177)" />
                    <defs>
                        <linearGradient id="paint0_linear_25102_7177" x1="23.7479" y1="-9.03125"
                                        x2="-30.36" y2="33.8817"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F83600" />
                            <stop offset="1" stopColor="#F9D423" />
                        </linearGradient>
                        <linearGradient id="paint1_linear_25102_7177" x1="23.7479" y1="-9.03125"
                                        x2="-30.36" y2="33.8817"
                                        gradientUnits="userSpaceOnUse">
                            <stop stopColor="#F83600" />
                            <stop offset="1" stopColor="#F9D423" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
            <div data-test-id="modal-title" className={s.title}>
                <span>{ isUserBooked ? 'Изменение даты бронирования' : 'Выбор даты бронирования'}</span></div>

            <div className={s.calendar_wrapper}>

                <Calendar handleSetSelectedDay={handleSetSelectedDay}
                          handleClearSelectedDay={handleClearSelectedDay}
                          selectedDay={selectedDay} />

            </div>

            <div className={s.button}>
                <Button id="button-comment"
                        clickEvent={ isUserBooked ? ()=> changeBookDate() : ()=>  bookingBook() }
                        isDisabled={isUserBooked && selectedBookDate && selectedDay === new Date(selectedBookDate).getDate() ? false : !!selectedDay }
                        isActive={isUserBooked && selectedBookDate && selectedDay === new Date(selectedBookDate).getDate() ? false : !!selectedDay }
                        textClass="textClassEstimate" height="52px" margin="0"
                        bookPageText="ЗАБРОНИРОВАТЬ" />

            {isUserBooked &&
               <div style={ {marginTop:'16px'} }> <Button id="button-comment"
                        clickEvent={ ()=> {  deleteBookDate()  } }
                                                          isUserBooked={true}
                        textClass="textClassEstimate" height="52px" margin="0"
                             bookPageText="ОТМЕНИТЬ БРОНЬ" /> </div> }</div>

        </div>



    </div>;
};


type BookEstimateType = {
    toggleBookingModule: () => void;
    margin?: string
    bookId: string | undefined | null | number,
    isUserBooked: boolean
    reloadPage: ()=> void
    selectedBookDate: string | null
    bookingId?: number | null | undefined
}
