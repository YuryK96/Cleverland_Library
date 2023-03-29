import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../button';
import "../styles/authorization.scss";
import { useWindowSize } from '../../hooks/window-size-hook';
import { FormValue } from '../../pages/auth/registration/registration';

import { AppDispatch } from '../../redux-toolkit/store';
import { clearAuthError } from '../../redux-toolkit/auth/auth-reducer';
import { StatusRequestEnum } from '../../redux-toolkit/books/books-type';
import { Pending } from '../pending';
import { getAuthStatus } from '../../redux-toolkit/auth/auth-selectos';


export const AuthMessage:React.FC<AuthMessageType> = ( {title = 'Регистрация успешна', message= 'Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль', buttonText='ВХОД', reset = false ,buttonLink = '/' ,dataForm, isClickEventButton=false, pending = false, clickEventButton = ()=>{}, isButton = true} )=> {
    const navigate = useNavigate()
    const { mobile } = useWindowSize();
    const dispatch = useDispatch<AppDispatch>()
    const authStatus = useSelector(getAuthStatus)
    const handleClearAuthError = ()=> {
        dispatch(clearAuthError())
    }
 return    <section className="authorization_wrapper" data-test-id='auth'>

     {!pending && authStatus === StatusRequestEnum.Pending && <Pending/> }


     <h1  className="authorization_title">Cleverland</h1>
        <div data-test-id='status-block' className="authorization_item">
            <div className="authorization_container " style={ {minHeight:'auto'} }>
                <h3 style={ { width:'100%' ,textAlign:'center'} } className="authorization_container__header">{title}</h3>

                <div className='authorization_container__message' >{message}</div>

                {isButton &&  <div className="authorization_container__buttonWrapper ">
                    <Button bookPageText={buttonText} width="100%"
                            clickEvent= { reset ? ()=> handleClearAuthError() : isClickEventButton ? ()=>clickEventButton() : ()=>  navigate(buttonLink) }
                            height={mobile ? '40px' : '52px'}
                            margin="0"
                            paddingTop="5px"
                            textClass="registrationButtonText" />
                </div> }
            </div>
        </div>
    </section>;
}

type AuthMessageType = {
    title?: string
    message?: string
    buttonText?: string
    dataForm?: FormValue
    isButton?: boolean
    buttonLink?: string
   reset?: boolean
    isClickEventButton? :  boolean
    clickEventButton?: ()=> void
    pending?: boolean
};
