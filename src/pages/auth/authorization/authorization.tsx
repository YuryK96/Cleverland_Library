
import React, { useEffect, useState } from 'react';
import {
    useForm
} from 'react-hook-form';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import s from './authorization.module.scss';
import '../../../common/styles/authorization.scss';
import { Button } from '../../../common/button';
import rightArrow from '../../../assets/images/authorization/rightArrow.svg';
import { useWindowSize } from '../../../hooks/window-size-hook';
import { Inputs } from './inputs';

import { AppDispatch } from '../../../redux-toolkit/store';
import { authorization } from '../../../redux-toolkit/auth/auth-thunks';
import { getAuthError, getAuthStatus } from '../../../redux-toolkit/auth/auth-selectos';
import { StatusRequestEnum } from '../../../redux-toolkit/books/books-type';
import { Pending } from '../../../common/pending';
import { AuthMessage } from '../../../common/auth-message';
import { clearAuthError } from '../../../redux-toolkit/auth/auth-reducer';
import { useIsAuth } from '../../../hooks/is-auth-hook';



export const Authorization: React.FC = () => {
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        getFieldState,
        control,
        formState: { errors, isValid }
    } = useForm<FormValue>({ mode: 'onChange' });
    const dispatch = useDispatch<AppDispatch>()
    const [buttonCheckError, setButtonCheckError] = useState(false);
    const authStatus = useSelector(getAuthStatus)
    const authError = useSelector(getAuthError)
    const { mobile } = useWindowSize();
    const isAuth= useIsAuth()
    const navigate = useNavigate()




    useEffect( ()=>{
        if(isAuth){
            navigate('/books/all')
        }

    },[isAuth,navigate] )

    const handleClearAuthError = ()=> {
        dispatch(clearAuthError())
    }
    const onSubmit = (data: FormValue) => {
       dispatch(authorization(data))
    };



    const setButtonCheckErrorStateTrue = () => {
        setButtonCheckError(true);
    };
    const setButtonCheckErrorStateFalse = () => {
        if (buttonCheckError) {
            setButtonCheckError(false);
        }
    };


    return   <React.Fragment>{ authError && authError !== '400' ? <AuthMessage title='Вход не выполнен' message='Что-то пошло не так. Попробуйте ещё раз' buttonText='ПОВТОРИТЬ' buttonLink='/auth' reset={true} />: <section className="authorization_wrapper" data-test-id='auth'>


        { authStatus === StatusRequestEnum.Pending && <Pending/> }

        <h1 className="authorization_title">Cleverland</h1>
        <div className="authorization_item">
            <div  className="authorization_container authorization_container_personalArea">
                <h3 className="authorization_container__header">Bход в личный кабинет</h3>

                <form data-test-id='auth-form' onSubmit={handleSubmit(onSubmit)} >
                    <div className="authorization_container__form">
                        <Inputs register={register} getFieldState={getFieldState}
                                watch={watch} handleClearAuthError={handleClearAuthError}
                                buttonCheckError={buttonCheckError}
                                setButtonCheckErrorStateFalse={setButtonCheckErrorStateFalse}
                                getValues={getValues}
                        />

                    </div>

                    <div className="authorization_container__buttonWrapper ">
                        <Button clickEvent={isValid ? ()=>{ handleSubmit(onSubmit)() } : setButtonCheckErrorStateTrue  }
                                bookPageText="ВХОД" width="100%"
                                height={mobile ? '40px' : '52px'}
                                margin="0"
                                paddingTop="5px"

                                textClass="registrationButtonText" />
                        <div className="question_authorization"><p> Нет учётной записи?</p> <NavLink
                            to="/registration">
                            <div role='presentation' onClick={handleClearAuthError} className="question_authorization__wrapperLink"><span> Регистрация</span>
                                <div><img src={rightArrow} alt="arrow" /></div>
                            </div>
                        </NavLink></div>
                    </div>
                </form>

            </div>
        </div>
    </section> }  </React.Fragment>
};

export type FormValue = {
    identifier: string,
    password: string
}


