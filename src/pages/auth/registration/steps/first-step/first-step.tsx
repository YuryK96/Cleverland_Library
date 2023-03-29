import React, { useState } from 'react';
import {
    FieldErrors,
    UseFormGetFieldState,
    UseFormGetValues, UseFormRegister, UseFormWatch
} from 'react-hook-form';

import check from '../../../../../assets/images/authorization/check.svg';
import closeEye from '../../../../../assets/images/authorization/closeEye.svg';
import openEye from '../../../../../assets/images/authorization/openEye.svg';
import { FormValue } from '../../registration';


export const FirstStep: React.FC<FirstStepType> = ({
                                                       register,
                                                       getFieldState,
                                                       getValues,
                                                       errors,
                                                       watch,
                                                       setButtonCheckErrorStateFalse,
                                                       buttonCheckError
                                                   }) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [isLoginFocus, setIsLoginFocus] = useState<boolean | null>(null);
    const [isPasswordFocus, setIsPasswordFocus] = useState<boolean | null>(null);
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

    return <React.Fragment>
        <div className="authorization_container__WrapperFirstInput">
            <input type="text" id="username"
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

            <label htmlFor="username" className="floating-label">Придумайте логин для
                входа</label>
            <div data-test-id="hint"
                 className={`authorization_container__firstNote ${!isLoginFocus && getFieldState('username').error || isLoginFocus === false && watch('username') === '' || buttonCheckError && getFieldState('username').error || buttonCheckError && watch('username') === '' || getFieldState('username').error && watch('username') !== '' ? 'redBorderTop' : 'grayBorderTop authorization_container__grayColor'}  `}

            >
                {
                    isLoginFocus === false && watch('username') === '' || buttonCheckError && watch('username') === '' ?
                        <span style={{ color: 'rgb(244, 44, 79)', marginLeft: '12px' }}>Поле не может быть пустым</span> :
                        <span style={{
                            marginLeft: '12px',
                            color: errors?.username?.message === 'must be latin characters' && !/[0-9]/.test(watch('username')) ? 'rgb(244, 44, 79)' : 'rgb(167, 167, 167)'
                        }}>Используйте для логина<span
                            style={errors?.username?.message === 'must be latin characters' ? { color: 'rgb(244, 44, 79)' } : {}}> латинский алфавит </span>и<span
                            style={/[0-9]/.test(watch('username')) || watch('username') === '' ? {} : { color: 'rgb(244, 44, 79)' }}> цифры</span>
                </span>}</div>
        </div>
        <div className="authorization_container__WrapperSecondInput">
            <div className="authorization_container__WrapperIcons">
                <div
                    className="authorization_container__WrapperCheck">{!getFieldState('password').error && getValues('password') &&
                    <div data-test-id="checkmark"><img src={check}
                                                       alt="check" /></div>}  </div>
                {watch('password')?.length > 0 &&
                    <img data-test-id={passwordShown ? 'eye-opened' : 'eye-closed'}
                         role="presentation" onClick={togglePasswordVisiblity}
                         src={passwordShown ? openEye : closeEye} alt="eye" />}</div>
            <input id="password" className="authorization_container__secondInput"
                   onFocus={() => {
                       setButtonCheckErrorStateFalse();
                       setPasswordFocusStateTrue();
                   }}
                   type={passwordShown ? 'text' : 'password'} {...register('password', {
                onBlur: () => setPasswordFocusStateFalse(),
                required: true, validate: {
                    capitalLetter: (value) => /[A-ZА-Я]/.test(value[0]) || 'not a capital letter',
                    hasNumber: (value) => /[0-9]/.test(value) || 'not a Number',
                    minLength: (value) => value.length > 7 || 'must min 8 symbols'


                }
            })} autoComplete="off" required={true} />

            <label htmlFor="password" className="floating-label">Пароль</label>

            <div
                 className={`authorization_container__secondNote ${!isPasswordFocus && getFieldState('password').error || buttonCheckError && getFieldState('password').error || isPasswordFocus === false && watch('password') === '' || buttonCheckError && watch('password') === '' || getFieldState('password').error && watch('password') !== '' ? 'redBorderTop' : 'grayBorderTop'} `}
            >
                {
                    isPasswordFocus === false && watch('password') === '' || buttonCheckError && watch('password') === '' ?
                      <div data-test-id="hint" style={{ color: 'rgb(244, 44, 79)' }}> <span style={{ color: 'rgb(244, 44, 79)', marginLeft: '12px' }}>Поле не может быть пустым</span> </div> :
                       <div data-test-id="hint"  style={ {marginLeft:'12px', color:'rgb(167, 167, 167)'}} > <span
                           style={{ color: watch('password')?.length < 7 && errors?.password?.message === 'not a capital letter' && !/[0-9]/.test(watch('password')) ? 'rgb(244, 44, 79)' : 'rgb(167, 167, 167)' }}>Пароль</span><span
                           style={watch('password')?.length > 7 || watch('password') === '' ? { color: 'rgb(167, 167, 167)' } : { color: 'rgb(244, 44, 79)' }}> не менее 8 символов</span><span
                           style={{ color: watch('password')?.length < 7 && errors?.password?.message === 'not a capital letter' && !/[0-9]/.test(watch('password')) ? 'rgb(244, 44, 79)' : 'rgb(167, 167, 167)' }}>, с </span><span
                           style={errors?.password?.message === 'not a capital letter' ? { color: 'rgb(244, 44, 79)' } : { color: 'rgb(167, 167, 167)' }}>заглавной буквой</span><span
                           style={{ color: watch('password')?.length < 7 && errors?.password?.message === 'not a capital letter' && !/[0-9]/.test(watch('password')) ? 'rgb(244, 44, 79)' : 'rgb(167, 167, 167)' }}> и</span><span
                           style={/[0-9]/.test(watch('password')) || watch('password') === '' ? { color: 'rgb(167, 167, 167)' } : { color: 'rgb(244, 44, 79)' }}> цифрой</span> </div>
             } </div>
        </div>
    </React.Fragment>;
};


type FirstStepType = {
    getValues: UseFormGetValues<FormValue>;
    getFieldState: UseFormGetFieldState<FormValue>;
    register: UseFormRegister<FormValue>;
    errors: FieldErrors;
    watch: UseFormWatch<FormValue>
    setButtonCheckErrorStateFalse: () => void
    buttonCheckError: boolean

};

