import React from 'react';

import s from './button.module.scss';
import '../styles/authorization.scss';
import '../styles/button.scss';
import { BookingType, DeliveryType } from '../../redux-toolkit/books/books-type';


export const Button: React.FC<ButtonType> = ({
                                                 booking,
                                                 isBookPage = false,
                                                 bookPageText = '',
                                                 isBookEstimate = false,
                                                 id,
                                                 width = '100%',
                                                 textClass = '',
                                                 paddingTop = 'auto',
                                                 isDisabled = true,
                                                 height = '40px',
                                                 margin = '18px',
                                                 delivery,
                                                 clickEvent = () => {
                                                 },
                                                 isUserBooked = false,
                                                 isActive = true,

                                             }) => {
   console.log()
    return <button
        style={{ width, paddingTop, margin, height }}
        type="button"
        disabled={!isDisabled}
        data-test-id={id} onClick={clickEvent}
        className={`  ${s.button} ${!booking ? s.buttonActive : s.buttonBlock} ${isBookPage && s.buttonBookPage} ${!isActive && s.buttonBlockSecond}  ${
            isBookEstimate && s.buttonBookPageEstimate
        }  ${textClass}  ${isUserBooked && s.userBooked}`}
    >
        {!bookPageText && !booking && !delivery
            ? <p> ЗАБРОНИРОВАТЬ </p>
            : delivery
                ? <p> ЗАНЯТО ДО {`${delivery.dateHandedTo?.charAt(8)}${delivery.dateHandedTo?.charAt(9) }.${delivery.dateHandedTo?.charAt(5) }${delivery.dateHandedTo?.charAt(6) } `} </p>
                : booking?.order && <p >ЗАБРОНИРОВАНО </p>}
        {!!bookPageText && <p>{bookPageText} </p>}

    </button>;
};
type ButtonType = {
    booking?: null | BookingType;
    isBookPage?: boolean;
    isBookEstimate?: boolean;
    bookPageText?: string;
    id?: string;
    width?: string
    textClass?: string
    paddingTop?: string;
    margin?: string
    height?: string
    isActive?: boolean
    clickEvent?: () => void
    isDisabled?: boolean
    delivery? : DeliveryType
    isUserBooked?: boolean
};
