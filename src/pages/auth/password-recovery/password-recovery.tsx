
import React, { useEffect, useState } from 'react';
import {
    useForm
} from 'react-hook-form';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import s from './password-recovery.module.scss';
import '../../../common/styles/authorization.scss';
import { Button } from '../../../common/button';
import rightArrow from '../../../assets/images/authorization/rightArrow.svg';
import leftArrow from '../../../assets/images/authorization/leftArrow.svg';
import { useWindowSize } from '../../../hooks/window-size-hook';
import { Input } from './input';
import { AppDispatch } from '../../../redux-toolkit/store';
import { sendEmail } from '../../../redux-toolkit/auth/auth-thunks';
import { AuthMessage } from '../../../common/auth-message';
import { getAuthError } from '../../../redux-toolkit/auth/auth-selectos';
import { clearAuthError } from '../../../redux-toolkit/auth/auth-reducer';
import { NewPassword } from '../new-password';
import { useIsAuth } from '../../../hooks/is-auth-hook';



export const PasswordRecovery: React.FC<PasswordRecoveryType> = () => {
    const {
        register,
        handleSubmit,
        getFieldState,
        watch,
        formState: {  isValid }
    } = useForm<FormValue>({ mode: 'onChange' });
    const dispatch = useDispatch<AppDispatch>()
    const [buttonCheckError, setButtonCheckError] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);
    const [isNewPasswordPage, setIsNewPasswordPage] = useState(false);
    const [urlCode, setUrlCode] = useState('');
    const authError = useSelector(getAuthError)
    const { mobile } = useWindowSize();
    const isAuth= useIsAuth()
    const navigate = useNavigate()
    const location = useLocation()

    useEffect( ()=>{
        const url = new URLSearchParams(location.search)
        const urlCode = url.get('code')

        if (urlCode){
            setUrlCode(urlCode)
            setIsNewPasswordPage(true)
        }
    },[location.search] )

    useEffect( ()=>{
        if(isAuth){
            navigate('/')
        }

    },[isAuth,navigate] )
    const handleClearAuthError = ()=> {
        dispatch ( clearAuthError() )
    }
    const onSubmit = (data: FormValue) => {
        dispatch ( sendEmail(data) )
        setIsEmailSent(true)
    };


    const setButtonCheckErrorStateTrue = () => {
        setButtonCheckError(true);
    };
    const setButtonCheckErrorStateFalse = () => {
        if (buttonCheckError) {
            setButtonCheckError(false);
        }
    };



    if (isNewPasswordPage) {
      return  <NewPassword urlCode={urlCode}/>
    }


    if (isEmailSent && !authError) {
        return <AuthMessage isButton={false} title='Письмо выслано' message='Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля'/>
    }


    return   <section className="authorization_wrapper"   data-test-id='auth'>
        <h1 className="authorization_title">Cleverland</h1>
        <div className="authorization_item">
            <div  className="authorization_container authorization_container_personalArea">
                <div className='authorization_container__toPersonalArea' >
                    <div role='presentation' onClick={handleClearAuthError}  className='authorization_container__wrapperImg' >
                      <NavLink to='/auth'>  <img src={leftArrow} alt='left Arrow'/></NavLink>
                    </div>
                        <span>ВХОД В ЛИЧНЫЙ КАБИНЕТ</span>
                </div>
                <h3 className="authorization_container__header">Восстановление пароля</h3>

                <form data-test-id='send-email-form' onSubmit={handleSubmit(onSubmit)} >
                    <div className="authorization_container__form">
                            <Input register={register} getFieldState={getFieldState}
                                   buttonCheckError={buttonCheckError}
                                   authError={authError}
 watch={watch}                                  setButtonCheckErrorStateFalse={setButtonCheckErrorStateFalse}
                            />

                    </div>
                    <div className="authorization_container__buttonWrapper ">
                        <Button clickEvent={isValid ? ()=>{ handleSubmit(onSubmit)() } : setButtonCheckErrorStateTrue  }
                                bookPageText="ВОССТАНОВИТЬ" width="100%"
                                height={mobile ? '40px' : '52px'}
                                margin="0"
                                paddingTop="5px"

                                textClass="registrationButtonText" />
                        <div style={ {marginTop:'16px'} } className="question_authorization"><p> Нет учётной записи?</p> <NavLink
                            to="/registration">
                            <div  role='presentation' onClick={handleClearAuthError}  className="question_authorization__wrapperLink"><span> Регистрация</span>
                                <div><img src={rightArrow} alt="arrow" /></div>
                            </div>
                        </NavLink></div>
                    </div>
                </form>

            </div>
        </div>
    </section>;
};

export type FormValue = {
    email: string,

}

// eslint-disable-next-line @typescript-eslint/ban-types
type PasswordRecoveryType = {}
