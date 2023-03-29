import React, { useEffect, useState } from 'react';
import {
    useForm
} from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import s from './new-passord.module.scss';
import '../../../common/styles/authorization.scss';
import { Button } from '../../../common/button';
import { useWindowSize } from '../../../hooks/window-size-hook';
import { Input } from './input';
import { AppDispatch } from '../../../redux-toolkit/store';
import { resetPassword } from '../../../redux-toolkit/auth/auth-thunks';
import { getAuthError, getAuthStatus } from '../../../redux-toolkit/auth/auth-selectos';
import { AuthMessage } from '../../../common/auth-message';
import { clearAuthError } from '../../../redux-toolkit/auth/auth-reducer';
import { useIsAuth } from '../../../hooks/is-auth-hook';
import { StatusRequestEnum } from '../../../redux-toolkit/books/books-type';
import { Pending } from '../../../common/pending';


export const NewPassword: React.FC<NewPasswordType> = ({urlCode}) => {
    const {
        register,
        handleSubmit,
        getFieldState,
        watch,
        getValues,
        formState: { errors, isValid }
    } = useForm<FormValue>({ mode: 'onChange' });

    const [buttonCheckError, setButtonCheckError] = useState(false);
    const [firstStatusButton, setFirstStatusButton] = useState(true);
    const [isPasswordsSent, setIsPasswordsSent] = useState(false);
    const authError = useSelector(getAuthError)
    const { mobile } = useWindowSize();
    const dispatch = useDispatch<AppDispatch>()
    const isAuth= useIsAuth()
    const authStatus = useSelector(getAuthStatus)
    const navigate = useNavigate()
    const [isPasswordFocus, setIsPasswordFocus] = useState<boolean | null>(null);
    const [isPasswordRepeatFocus, setIsPasswordRepeatFocus] = useState<boolean | null>(null);


    const setPasswordFocusStateTrue = () => {
        setIsPasswordFocus(true);
    };
    const setPasswordFocusStateFalse = () => {
        setIsPasswordFocus(false);
    };
    const setPasswordReapeatFocusStateTrue = () => {
        setIsPasswordRepeatFocus(true);
    };
    const setPasswordRepeatFocusStateFalse = () => {
        setIsPasswordRepeatFocus(false);
    };

    useEffect( ()=>{
        if(isAuth){
            navigate('/books/all')
        }

    },[isAuth,navigate] )
    const handleSetIsPasswordsSent = ()=> {
        setIsPasswordsSent(false)
        dispatch(clearAuthError())
    }



    const onSubmit = async (data: FormValue) => {
      await  dispatch(resetPassword( {...data, code: urlCode} ) ).then(
          ()=>  setIsPasswordsSent(true)
      )

    };


    const setButtonCheckErrorStateTrue = () => {
        setButtonCheckError(true);
    };
    const setButtonCheckErrorStateFalse = () => {
        if (buttonCheckError) {
            setButtonCheckError(false);
        }
    };
    const setIsFirstStatusButtonFalse = () => {
        setFirstStatusButton(false);
    };

    if (authError && isPasswordsSent && authStatus ){
        return <AuthMessage title='Данные не сохранились' message='Что-то пошло не так. Попробуйте ещё раз' buttonText='ПОВТОРИТЬ' clickEventButton={handleSetIsPasswordsSent} isClickEventButton={true} />
    }

    if (!authError && isPasswordsSent && authStatus ){
        return <AuthMessage title='Новые данные сохранены' pending={true} message='Зайдите в личный кабинет, используя свои логин и новый пароль' buttonText='ВХОД' buttonLink='/auth'/>
    }

    return <section className="authorization_wrapper" data-test-id='auth'>
        { authStatus === StatusRequestEnum.Pending && <Pending/> }
        <h1 className="authorization_title">Cleverland</h1>
        <div className="authorization_item">
            <div className="authorization_container authorization_container_personalArea">

                <h3 className="authorization_container__header">Восстановление пароля</h3>

                <form data-test-id='reset-password-form' onSubmit={handleSubmit(onSubmit)}>
                    <div className="authorization_container__form">
                        <Input register={register} getFieldState={getFieldState}
                               watch={watch}
                               buttonCheckError={buttonCheckError}
                               isPasswordFocus={isPasswordFocus}
                               isPasswordRepeatFocus={isPasswordRepeatFocus}
                               setPasswordFocusStateTrue={setPasswordFocusStateTrue}
                               setPasswordFocusStateFalse={setPasswordFocusStateFalse}
                               setPasswordRepeatFocusStateFalse={setPasswordRepeatFocusStateFalse}
                               setPasswordReapeatFocusStateTrue={setPasswordReapeatFocusStateTrue}
                               setButtonCheckErrorStateFalse={setButtonCheckErrorStateFalse}
                               getValues={getValues} errors={errors}
                        />

                    </div>
                    <div className="authorization_container__buttonWrapper ">
                        <Button clickEvent={isValid ? () => {
                            handleSubmit(onSubmit)();
                        } : () => {
                            setButtonCheckErrorStateTrue();
                            setIsFirstStatusButtonFalse();
                        }}
                                bookPageText="СОХРАНИТЬ ИЗМЕНЕНИЯ" width="100%"
                                isActive={isValid}
                                height={mobile ? '40px' : '52px'}
                                margin="0"
                                paddingTop="5px"
                                isDisabled = {  isPasswordFocus || isPasswordRepeatFocus ? true : isValid }
                                textClass="registrationButtonText" />
                        <div style={{ marginTop: '16px' }} className="question_authorization"><p>После
                            сохранения войдите в библиотеку, используя новый пароль</p></div>
                    </div>
                </form>

            </div>
        </div>
    </section>;
};

export type FormValue = {
    password: string,
    passwordConfirmation: string

}

type NewPasswordType = {
    urlCode: string;
}
