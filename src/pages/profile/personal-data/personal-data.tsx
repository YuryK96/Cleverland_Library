import React, { FC, useEffect, useState } from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import InputMask from "react-input-mask";
import { Controller, useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import s from "./personal-data.module.scss";
import check from "../../../assets/images/authorization/check.svg";
import openEye from "../../../assets/images/authorization/openEye.svg";
import closeEye from "../../../assets/images/authorization/closeEye.svg";
import "../../../common/styles/authorization.scss";
import { registration } from "../../../redux-toolkit/auth/auth-thunks";
import { Button } from "../../../common/button";
import rightArrow from "../../../assets/images/authorization/rightArrow.svg";
import { useWindowSize } from "../../../hooks/window-size-hook";
import { AppDispatch } from "../../../redux-toolkit/store";
import { editProfileUser } from "../../../redux-toolkit/profile/profile-thunks";



export const PersonalData:FC<PersonalDataType> = ({firstName, userName, lastName ,email, phone,userId}) => {
    const {
        register,
        handleSubmit,
        getValues,
        watch,
        reset,
        getFieldState,
        control,
        setValue,
        trigger,

        formState: { errors, isValid }
    } = useForm<FormValue>({ mode: 'onChange' });
    const [passwordShown, setPasswordShown] = useState(false);
    const [isLoginFocus, setIsLoginFocus] = useState<boolean | null>(null);
    const [isPasswordFocus, setIsPasswordFocus] = useState<boolean | null>(null);
    const [buttonCheckError, setButtonCheckError] = useState(false);
    const firstCodeNumber = String(watch('phone')).charAt(5);
    const [isPhoneFocus, setIsPhoneFocus] = useState<boolean | null>(null);
    const [isEmailFocus, setIsEmailFocus] = useState<boolean | null>(null);
    const { mobile } = useWindowSize();
    const dispatch = useDispatch<AppDispatch>()
    const [isEdit, setIsEdit]= useState(false)
    const password = JSON.parse( localStorage.getItem('password')   || '')

    useEffect( ()=> {

        setValue('email', email)
        setValue('username', userName)
        setValue('phone', phone)
        setValue('lastName', lastName)
        setValue('firstName', firstName)
        setValue('password', password)

    } ,[email,phone,lastName,firstName,  password , setValue ,userName] )
    const toggleEditMode = ()=> {
        setIsEdit(!isEdit)
    }
    const onSubmit = (data: FormValue) => {
        if (data.password !== password) {
            localStorage.setItem('password', JSON.stringify(data.password))
        }

      dispatch(editProfileUser( {
          id: userId,
          profile: data
      } ))
        toggleEditMode()
    };


    const setEmailFocusStateTrue = () => {
        setIsEmailFocus(true);
    };
    const setEmailFocusStateFalse = () => {
        setIsEmailFocus(false);
    };
    const setPhoneFocusStateTrue = () => {
        setIsPhoneFocus(true);
    };




    const setPhoneFocusStateFalse = () => {
        setIsPhoneFocus(false);
    };

    const setButtonCheckErrorStateTrue = () => {
        setButtonCheckError(true);
    };
    const setButtonCheckErrorStateFalse = () => {
        if (buttonCheckError) {
            setButtonCheckError(false);
        }
    };
    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };
    const setLoginFocusStateTrue = () => {
        setIsLoginFocus(true);
    };
    const setLoginFocusStateFalse = () => {
        setIsLoginFocus(false);
    };
    const setPasswordFocusStateTrue = () => {
        setIsPasswordFocus(true);
    };
    const setPasswordFocusStateFalse = () => {
        setIsPasswordFocus(false);
    };
    return <section className={s.personalData}>

        <header>
            <h1>Учетные данные</h1>
            <p>Здесь вы можете отредактировать информацию о себе</p>
        </header>

        <main>

            <div className={s.firstInputsColumn}>

                <div className={`authorization_container ${s.formContainer}`}>

                    <form  data-test-id='register-form'  onSubmit={handleSubmit(onSubmit)} >

                        <div className={s.columnWrapper}>

                <div className={s.firstColumn} >
                <div className="authorization_container__WrapperFirstInput">
                    <input type="text" id="login"
                           disabled={!isEdit}

                           onFocus={() => {
                               setButtonCheckErrorStateFalse();
                               setLoginFocusStateTrue();
                           }}

                           className="authorization_container__firstInput"
                           autoComplete="off"
                           required={true} {...register('username', {
                        onBlur: () => setLoginFocusStateFalse(),

                        required: true, validate: {
                            capitalLetter: (value) => Array.from(value).every((letter) => /[a-z]/i.test(letter) || /[0-9]/.test(letter)) || 'must be latin characters'
                            ,
                            hasNumber: (value) => /[0-9]/.test(value) || 'not a Number'
                        }
                    })} />

                    <label htmlFor="login" className="floating-label">Придумайте логин для
                        входа</label>
                    <div data-test-id="hint"

                         className={`authorization_container__firstNote ${!isLoginFocus && getFieldState('username').error || isLoginFocus === false && watch('username') === '' || buttonCheckError && getFieldState('username').error || buttonCheckError && watch('username') === '' || getFieldState('username').error && watch('username') !== '' ? 'redBorderTop' : 'grayBorderTop authorization_container__grayColor' }  ${!isEdit && s.hiddenNote }  `}

                    >
                        {
                            isLoginFocus === false && watch('username') === '' || buttonCheckError && watch('username') === '' ?
                                <span style={{ color: 'rgb(244, 44, 79)', marginLeft: '12px' }}>Поле не может быть пустым</span> :
                                <span style={{
                                    marginLeft: '12px',
                                    color: errors?.username?.message === 'must be latin characters' && !/[0-9]/.test(watch('username')) ? 'rgb(244, 44, 79)' : 'rgb(167, 167, 167)'
                                }}>Используйте для логина<span
                                    style={errors?.username?.message === 'must be latin characters' ? { color: 'rgb(244, 44, 79)' } : {}}> латинский алфавит </span>и<span
                                    style={/[0-9]/.test(watch('username')) || !watch('username') ? {} : { color: 'rgb(244, 44, 79)' }}> цифры</span>
                </span>}</div>
                </div>
                    <div className="authorization_container__WrapperFirstInput">
                            <input type="text" id="username"

                                   disabled={!isEdit}
                                   onFocus={ ()=> {
                                       setButtonCheckErrorStateFalse()
                                   }}
                                   className="authorization_container__firstInput"
                                   autoComplete="off"
                                   required={true} {...register('firstName', {
                                required: false
                            })} />

                            <label htmlFor="username" className="floating-label">Имя</label>
                            <div
                                className="grayBorderTop" data-test-id="hint"
                             />
                        </div>
                    <div className="authorization_container__WrapperFirstInput">
                        <Controller name="phone" control={control} render={({ field }) => (

                            <InputMask type="text" id="phone"

                                       mask={['+', '3', '7', '5',  ' ', '(', /( ?(?=[2])[2]|(?=[3])[3]|(?=[4])[4]|^$ )/, firstCodeNumber === '2' ? /( ?(?=[5])[5]|(?=[9])[9]|^$ )/ : firstCodeNumber === '3' ? /( ?(?=[3])[3]|^$ )/ : firstCodeNumber === '4' ? /( ?(?=[4])[4]|^$ )/ : /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                                       disabled={!isEdit}
                                       maskPlaceholder="+375 (xx) xxx-xx-xx"
                                       className="authorization_container__firstInput"
                                       onFocus={ ()=> {
                                           setButtonCheckErrorStateFalse()
                                           setPhoneFocusStateTrue()
                                       }}
                                       autoComplete="off"
                                       required={true} {...register('phone', {
                                onBlur: () => setPhoneFocusStateFalse(),
                                required: true,
                                validate: {
                                    checkNumber: (value) => String(value).includes('x') ? false : true || 'not a number'
                                }
                            })} />

                        )} />


                        <label htmlFor="phone" className="floating-label">Номер телефона</label>
                        <div data-test-id="hint"
                             className={`authorization_container__firstNote ${!watch('phone') && buttonCheckError || !getFieldState('phone').error && !buttonCheckError || !getFieldState('phone').error && buttonCheckError ? 'grayBorderTop authorization_container__grayColor' : 'redBorderTop'} ${getFieldState('phone').error && buttonCheckError && 'redBorderTop' }  ${!isEdit && s.hiddenNote }  `}>

                            {watch('phone') === '' && isPhoneFocus === false || buttonCheckError && watch('phone') === ''  ?
                                <span style={{ color: 'rgb(244, 44, 79)', paddingLeft:'12px' }}>Поле не может быть пустым</span>   :   getFieldState('phone').error || buttonCheckError && !getFieldState('phone') ?
                                    <span style={{ color: 'rgb(244, 44, 79)', paddingLeft:'12px'  }}>В формате +375 (xx)
                            xxx-xx-xx</span> : <span style={{ color: '#BFC4C9', paddingLeft:'12px'  }}>В формате +375 (xx)
                            xxx-xx-xx</span>}  </div>
                    </div>

                </div>
                    <div className={s.secondColumn} >
                        <div className="authorization_container__WrapperSecondInput">
                            <div className="authorization_container__WrapperIcons">

                                { isEdit &&
                                    <img data-test-id={passwordShown ? 'eye-opened' : 'eye-closed'}
                                         role="presentation" onClick={togglePasswordVisiblity}
                                         src={passwordShown ? openEye : closeEye} alt="eye" />}</div>
                            <input id="password"
                                   disabled={!isEdit}

                                   className="authorization_container__secondInput"
                                   onFocus={() => {
                                       setButtonCheckErrorStateFalse();
                                       setPasswordFocusStateTrue();
                                   }}
                                   type={passwordShown && isEdit ? 'text' : 'password'} {...register('password', {
                                onBlur: () => setPasswordFocusStateFalse(),
                                required: true, validate: {
                                    capitalLetter: (value) => /[A-ZА-Я]/.test(value[0]) || 'not a capital letter',
                                    hasNumber: (value) => /[0-9]/.test(value) || 'not a Number',
                                    minLength: (value) => value.length > 7 || 'must min 8 symbols'


                                }
                            })} autoComplete="off" required={true} />

                            <label htmlFor="password" className="floating-label">Пароль</label>

                            <div
                                className={`authorization_container__secondNote ${!isPasswordFocus && getFieldState('password').error || buttonCheckError && getFieldState('password').error || isPasswordFocus === false && watch('password') === '' || buttonCheckError && watch('password') === '' || getFieldState('password').error && watch('password') !== '' ? 'redBorderTop' : 'grayBorderTop'} ${!isEdit && s.hiddenNote } `}
                            >
                                {
                                    isPasswordFocus === false && watch('password') === '' || buttonCheckError && watch('password') === '' ?
                                        <div data-test-id="hint" style={{ color: 'rgb(244, 44, 79)' }}> <span style={{ color: 'rgb(244, 44, 79)', marginLeft: '12px' }}>Поле не может быть пустым</span> </div> :
                                        <div data-test-id="hint"  style={ {marginLeft:'12px', color:'rgb(167, 167, 167)'}} > <span
                                            style={{ color: watch('password')?.length < 7 && errors?.password?.message === 'not a capital letter' && !/[0-9]/.test(watch('password')) ? 'rgb(244, 44, 79)' : 'rgb(167, 167, 167)' }}>Пароль</span><span
                                            style={watch('password')?.length > 7 || !watch('password')  ? { color: 'rgb(167, 167, 167)' } : { color: 'rgb(244, 44, 79)' }}> не менее 8 символов</span><span
                                            style={{ color: watch('password')?.length < 7 && errors?.password?.message === 'not a capital letter' && !/[0-9]/.test(watch('password')) ? 'rgb(244, 44, 79)' : 'rgb(167, 167, 167)' }}>, с </span><span
                                            style={errors?.password?.message === 'not a capital letter' ? { color: 'rgb(244, 44, 79)' } : { color: 'rgb(167, 167, 167)' }}>заглавной буквой</span><span
                                            style={{ color: watch('password')?.length < 7 && errors?.password?.message === 'not a capital letter' && !/[0-9]/.test(watch('password')) ? 'rgb(244, 44, 79)' : 'rgb(167, 167, 167)' }}> и</span><span
                                            style={/[0-9]/.test(watch('password')) || !watch('password') ? { color: 'rgb(167, 167, 167)' } : { color: 'rgb(244, 44, 79)' }}> цифрой</span> </div>
                                } </div>


                        </div>
                        <div className="authorization_container__WrapperSecondInput">
                            <input id="lastName"

                                   disabled={!isEdit}
                                   className="authorization_container__secondInput"
                                   onFocus={ ()=> {
                                       setButtonCheckErrorStateFalse()

                                   }}
                                   type="text" {...register('lastName', {
                                required: false
                            })} autoComplete="off" required={true} />

                            <label htmlFor="lastName" className="floating-label">Фамилия</label>
                            <div
                                className="grayBorderTop " data-test-id="hint"
                            />
                        </div>
                        <div className="authorization_container__WrapperSecondInput">
                            <input id="email"

                                   disabled={!isEdit}
                                   className="authorization_container__secondInput"
                                   onFocus={ ()=> {
                                       setButtonCheckErrorStateFalse()
                                       setEmailFocusStateTrue()
                                   }}
                                   type="text" {...register('email', {
                                onBlur: () => setEmailFocusStateFalse(),
                                required: true,
                                validate: {
                                    email: (value) =>
                                        // eslint-disable-next-line no-useless-escape
                                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value),

                                }
                            })} autoComplete="off" required={true} />

                            <label htmlFor="email" className="floating-label">E-mail</label>
                            <div data-test-id="hint"
                                 className={` authorization_container__secondNote ${getFieldState('email').error && buttonCheckError || getFieldState('email').error && watch('email') === '' || isEmailFocus === false && watch('email') === '' || getFieldState('email').error || buttonCheckError && watch('email') === ''  ? ' redBorderTop ' : 'grayBorderTop'}  ${!isEdit && s.hiddenNote }`}
                            >
                                {getFieldState('email').error && watch('email') !== '' || buttonCheckError && getFieldState('email').error ?
                                    <p style={{ color: 'rgb(244, 44, 79)' }}>Введите корректный
                                        e-mail</p> : getFieldState('email').error && watch('email') === '' || buttonCheckError && watch('email') === '' || isEmailFocus === false && watch('email') === ''   ?
                                        <p style={{ color: 'rgb(244, 44, 79)' }}>Поле не может быть пустым</p> : null} </div>
                        </div>
                    </div>
                        </div>
                    </form>  </div>   </div>
        </main>

        <div className={s.buttonsContainer} >

        <div className={s.buttonContainer}>
        <div className="authorization_container__buttonWrapper">
            <div role='presentation'>
                <Button clickEvent={ isEdit ? ()=> { reset( {
                    email, username: userName, lastName, firstName, password, phone

                } )   ;toggleEditMode()}  : ()=>{ toggleEditMode(); trigger()} }
                        bookPageText={ isEdit ? 'ОТМЕНИТЬ' : 'РЕДАКТИРОВАТЬ'} width="100%"
                        height={mobile ? '40px' : '52px'}
                        margin="18px 0"
                        isUserBooked={true}

                        paddingTop="5px"
                        textClass="registrationButtonText" /></div>
        </div>
    </div>


            <div className={s.buttonContainer}>
                <div className="authorization_container__buttonWrapper">
                    <div className={`buttonCheckError__wrapper ${isValid && 'hidden' } ${!isEdit && 'hidden'}`} role='presentation' onClick={ setButtonCheckErrorStateTrue} />
                    <div role='presentation'>
                        <Button clickEvent={ ()=>{ handleSubmit(onSubmit)() } }
                                bookPageText='СОХРАНИТЬ ИЗМЕНЕНИЯ' width="100%"
                                height={mobile ? '40px' : '52px'}
                                margin="18px 0"
                                paddingTop="5px"
                                isActive={isEdit}
                                isDisabled = {isValid && isEdit  }
                                textClass="registrationButtonText" /></div>
                </div>
            </div>





    </div>


    </section>;
};

 type FormValue = {
    username: string,
    password: string
    firstName: string,
    lastName: string
    phone: string
    email: string
}

type PersonalDataType = {
     firstName: string,
    lastName: string,
    userName: string,
    phone: string,
    email: string
    userId: number
}
