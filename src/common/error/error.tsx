import { FC, useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import error from '../../assets/images/error/error-sign.svg';
import cross from '../../assets/images/error/cross.svg';
import success from '../../assets/images/error/success.svg';

import s from './error.module.scss';
import {
    clearStatusBooking,
    clearStatusTimeOut
} from "../../redux-toolkit/booking/booking-reducer";
import {
    clearStatusComment,
    clearStatusTimeOutComment
} from "../../redux-toolkit/commenting/commenting-reducer";
import { StatusRequestEnum } from '../../redux-toolkit/books/books-type';
import { getBooksStatus } from '../../redux-toolkit/books/books-selectos';
import { getBookingTimeOutStatus } from '../../redux-toolkit/booking/booking-selectos';
import { clearStatusAuth } from "../../redux-toolkit/auth/auth-reducer";
import { clearStatusBook } from "../../redux-toolkit/books/books-reducer";
import { clearStatusProfile } from "../../redux-toolkit/profile/profile-reducer";

export const Error:FC<ErrorType> = ({isError = true, text= 'Что-то пошло не так. Обновите страницу через некоторое время.',isTimeOut = false,isEstimate=false, idError = '', idCross= ''}) => {
    const [isClose, setIsClose]= useState(false)
    const dispatch = useDispatch()
    const status = useSelector(getBooksStatus);
    const TimeOutStatus = useSelector(getBookingTimeOutStatus);



    const clearStatusNotification = ()=> {
        dispatch(clearStatusAuth())
        dispatch(clearStatusBooking())
        dispatch(clearStatusBook())
        dispatch(clearStatusProfile())
        dispatch(clearStatusComment())
    }

    const closeError = ()=> {
        setIsClose(true)
    }

    useEffect( ()=>{
       if (isTimeOut && TimeOutStatus &&  status === StatusRequestEnum.Success || isTimeOut &&  TimeOutStatus &&  status === null )

        {

          setTimeout(() => {
                dispatch(clearStatusTimeOut())
                dispatch(clearStatusTimeOutComment())
            }, 4000);


        }

    }, [isTimeOut,dispatch,status,TimeOutStatus] )

    return <div className={`${s.error} ${isEstimate && s.error_fixed}
    ${isClose && s.error_close}
     `} data-test-id='error'>

        <div className={`${s.error__container} ${!isError && s.success}`}>

            <div className={s.error__item}>
                    <div className={s.error__wrapper}>
                <div className={s.error__signIcon}> <img src={isError ? error : success} alt='error-icon'  /> </div>
                <div className={s.error__text}>  <p>{text}</p>  </div></div>
                <div data-test-id={idCross} role='presentation' onClick={()=> {
                    closeError()
                    if(isTimeOut) {
                        dispatch(clearStatusTimeOut());
                    }
                    clearStatusNotification()
                }} className={s.error__crossIcon}> <img src={cross} alt='cross-icon'  /> </div>
            </div>
        </div>

    </div>;
};


type ErrorType = {
    isError?: boolean
    text?: string
    isTimeOut? : boolean
    isEstimate? : boolean
    idError? : string
    idCross?: string
}
