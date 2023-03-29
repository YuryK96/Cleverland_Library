
import React, { useEffect, useState } from 'react';
import {
    useForm
} from 'react-hook-form';
import { NavLink, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import s from './registration.module.scss';
import '../../../common/styles/authorization.scss';
import { Button } from '../../../common/button';
import rightArrow from '../../../assets/images/authorization/rightArrow.svg';
import { useWindowSize } from '../../../hooks/window-size-hook';
import { FirstStep } from './steps/first-step';
import { SecondStep } from './steps/second-step';
import { ThirdStep } from './steps/third-step';
import { authAPI } from '../../../api/auth';
import { AppDispatch } from '../../../redux-toolkit/store';
import { registration } from '../../../redux-toolkit/auth/auth-thunks';
import { StatusRequestEnum } from '../../../redux-toolkit/books/books-type';
import { Pending } from '../../../common/pending';
import { getAuthError, getAuthStatus } from '../../../redux-toolkit/auth/auth-selectos';
import { AuthMessage } from '../../../common/auth-message';
import { clearAuthError } from '../../../redux-toolkit/auth/auth-reducer';
import { useIsAuth } from '../../../hooks/is-auth-hook';


export const Registration: React.FC = () => {
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        reset,
        getFieldState,
        control,
        formState: { errors, isValid }
    } = useForm<FormValue>({ mode: 'onChange' });
    const [stepNumber, setStepNumber] = useState(1);
    const [buttonCheckError, setButtonCheckError] = useState(false);
    const dispatch = useDispatch<AppDispatch>()
    const { mobile } = useWindowSize();
    const authStatus = useSelector(getAuthStatus)
    const authError = useSelector(getAuthError)
    const isAuth= useIsAuth()
    const navigate = useNavigate()


    useEffect( ()=>{
        if(isAuth){
            navigate('/')
        }

    },[isAuth,navigate] )



    const onSubmit = (data: FormValue) => {
        dispatch(registration(data))
    };
    const nextStep = () => {
        if (stepNumber === 3) {
            handleSubmit(onSubmit)()
            setStepNumber(stepNumber + 1);
        }else if (stepNumber === 4){
            if (authError && authError !== '400' ) {
                handleSubmit(onSubmit)()
                dispatch(clearAuthError());
            }
            else {
                setStepNumber(1);
                reset();
                dispatch(clearAuthError());
            }
        }
        else {
            setStepNumber(stepNumber + 1);
        }
    };


    const setButtonCheckErrorStateTrue = () => {
        setButtonCheckError(true);
    };
    const setButtonCheckErrorStateFalse = () => {
        if (buttonCheckError) {
            setButtonCheckError(false);
        }
    };


    return   <React.Fragment>{  authError === '400' ? <AuthMessage title='Данные не сохранились' message='Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.' buttonText='НАЗАД К РЕГИСТРАЦИИ'   isClickEventButton={true} clickEventButton={nextStep} />: authError &&  authError !== '400' ? <AuthMessage title='Данные не сохранились' message='Что-то пошло не так и ваша регистрация не завершилась. Попробуйте ещё раз' buttonText='ПОВТОРИТЬ'  isClickEventButton={true} clickEventButton={nextStep}  /> : stepNumber === 4 ? <AuthMessage title='Регистрация успешна' message='Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль' buttonText='ВХОД'   buttonLink='/auth' /> :  <section className="authorization_wrapper"  data-test-id='auth'>

        { authStatus === StatusRequestEnum.Pending && <Pending/> }

        <h1 className="authorization_title">Cleverland</h1>
        <div className="authorization_item">
            <div className="authorization_container">
                <h3 className="authorization_container__header">Регистрация</h3>
                <div className="authorization_container__steps"> {stepNumber} шаг из 3</div>
                <form data-test-id='register-form'  onSubmit={handleSubmit(onSubmit)} >
                    <div className="authorization_container__form">
                        {stepNumber === 1 &&
                            <FirstStep register={register} getFieldState={getFieldState}
                                       watch={watch}
                                       buttonCheckError={buttonCheckError}
                                        setButtonCheckErrorStateFalse={setButtonCheckErrorStateFalse}
                                       getValues={getValues} errors={errors}
                            />}
                        {stepNumber === 2 &&
                            <SecondStep register={register}
                                       watch={watch} buttonCheckError={buttonCheckError}
                                        setButtonCheckErrorStateFalse={setButtonCheckErrorStateFalse} getFieldState={getFieldState}
                            />}
                        {stepNumber === 3 &&
                            <ThirdStep register={register} buttonCheckError={buttonCheckError}
                                       control={control} setButtonCheckErrorStateFalse={setButtonCheckErrorStateFalse} getFieldState={getFieldState}
                                       watch={watch}
                            />}
                    </div>

                    <div className="authorization_container__buttonWrapper">
                        <div className={`buttonCheckError__wrapper ${isValid && 'hidden' }`} role='presentation' onClick={ setButtonCheckErrorStateTrue} />
                        <div role='presentation' onClick={ ()=> {console.log(1)} }>
                        <Button clickEvent={isValid ? nextStep : setButtonCheckErrorStateTrue}
                                bookPageText={stepNumber === 1 ? 'СЛЕДУЮЩИЙ ШАГ' :
                                    stepNumber === 2 ? 'ПОСЛЕДНИЙ ШАГ' : 'ЗАРЕГИСТРИРОВАТЬСЯ'
                                } width="100%"
                                height={mobile ? '40px' : '52px'}
                                margin="18px 0"
                                paddingTop="5px"
                                isDisabled = {isValid }
                                textClass="registrationButtonText" /></div>
                        <div className="question_authorization"><p> Есть учетная запись?</p> <NavLink
                            to="/auth">
                            <div className="question_authorization__wrapperLink"><span> Войти</span>
                                <div><img src={rightArrow} alt="arrow" /></div>
                            </div>
                        </NavLink></div>
                    </div>
                </form>

            </div>
        </div>
    </section> } </React.Fragment>
};

export type FormValue = {
    username: string,
    password: string
    firstName: string,
    lastName: string
    phone: string
    email: string
}


