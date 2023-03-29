import React, { useState } from 'react';
import {
    FieldErrors,
    UseFormGetFieldState, UseFormGetValues,
    UseFormRegister, UseFormWatch
} from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import check from '../../../../assets/images/authorization/check.svg';
import openEye from '../../../../assets/images/authorization/openEye.svg';
import closeEye from '../../../../assets/images/authorization/closeEye.svg';
import { FormValue } from '../new-password';


export const Input: React.FC<FirstStepType> = ({
                                                   register,
                                                   getFieldState,
                                                   getValues,isPasswordFocus,isPasswordRepeatFocus,setPasswordFocusStateTrue,setPasswordFocusStateFalse,setPasswordRepeatFocusStateFalse,setPasswordReapeatFocusStateTrue,
                                                   errors,
                                                   watch,
                                                   setButtonCheckErrorStateFalse,
                                                   buttonCheckError
                                               }) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [repeatPasswordShown, setRepeatPasswordShown] = useState(false);




    const togglePasswordVisiblity = () => {
        setPasswordShown(!passwordShown);
    };
    const toggleRepeatPasswordVisiblity = () => {
        setRepeatPasswordShown(!repeatPasswordShown);
    };
    return <div className="authorization_container__WrapperSecondInput">
        <div className="authorization_container__WrapperIcons">
            <div
                className="authorization_container__WrapperCheck">{!getFieldState('password').error && getValues('password') &&
                <div data-test-id="checkmark"><img src={check}
                                                   alt="check" /></div>}  </div>
            {watch('password')?.length > 0 &&
                <img data-test-id={passwordShown ? 'eye-opened' : 'eye-closed'} role="presentation"
                     onClick={togglePasswordVisiblity}
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

        <div   className={`authorization_container__secondNote ${!isPasswordFocus && getFieldState('password').error || buttonCheckError && getFieldState('password').error || isPasswordFocus === false && watch('password') === '' || buttonCheckError && watch('password') === '' || getFieldState('password').error && watch('password') !== ''  ? 'redBorderTop' : 'grayBorderTop'} `}
        >
            {
                isPasswordFocus === false && watch('password') === '' || buttonCheckError && watch('password') === '' ?
                    <div data-test-id="hint" style={{ color: 'rgb(244, 44, 79)' }}> <span style={{ color: 'rgb(244, 44, 79)', marginLeft: '12px' }}>Поле не может быть пустым</span> </div>  :    <div data-test-id="hint"  style={ {marginLeft:'12px', color:'rgb(167, 167, 167)'}} > <span
                        style={{ color: watch('password')?.length < 7 && errors?.password?.message === 'not a capital letter' && !/[0-9]/.test(watch('password')) ? 'rgb(244, 44, 79)' : 'rgb(167, 167, 167)' }}>Пароль</span><span
                        style={watch('password')?.length > 7 || watch('password') === '' ? { color: 'rgb(167, 167, 167)' } : { color: 'rgb(244, 44, 79)' }}> не менее 8 символов</span><span
                        style={{ color: watch('password')?.length < 7 && errors?.password?.message === 'not a capital letter' && !/[0-9]/.test(watch('password')) ? 'rgb(244, 44, 79)' : 'rgb(167, 167, 167)' }}>, с </span><span
                        style={errors?.password?.message === 'not a capital letter' ? { color: 'rgb(244, 44, 79)' } : { color: 'rgb(167, 167, 167)' }}>заглавной буквой</span><span
                        style={{ color: watch('password')?.length < 7 && errors?.password?.message === 'not a capital letter' && !/[0-9]/.test(watch('password')) ? 'rgb(244, 44, 79)' : 'rgb(167, 167, 167)' }}> и</span><span
                        style={/[0-9]/.test(watch('password')) || watch('password') === '' ? { color: 'rgb(167, 167, 167)' } : { color: 'rgb(244, 44, 79)' }}> цифрой</span> </div> } </div>


        <div className="authorization_container__WrapperSecondInput">
            <div className="authorization_container__WrapperIcons">

                {watch('passwordConfirmation')?.length > 0 &&
                    <img style={{ marginLeft: '29px' }} role="presentation"
                         onClick={toggleRepeatPasswordVisiblity}
                         data-test-id={passwordShown ? 'eye-opened' : 'eye-closed'}
                         src={repeatPasswordShown ? openEye : closeEye} alt="eye" />}</div>
            <input id="repeatPassword" className="authorization_container__secondInput"
                   onFocus={() => {
                       setButtonCheckErrorStateFalse();
                       setPasswordReapeatFocusStateTrue();
                   }}
                   type={repeatPasswordShown ? 'text' : 'password'} {...register('passwordConfirmation', {
                onBlur: () => setPasswordRepeatFocusStateFalse(),
                required: true,
                validate: {
                    matchPasswords: () => watch('password') === watch('passwordConfirmation') || 'do not match'
                }
            })} autoComplete="off" required={true} />

            <label htmlFor="repeatPassword" className="floating-label">Повторить пароль</label>

            <div data-test-id="hint"
                 className={`authorization_container__secondNote ${isPasswordRepeatFocus === false && getFieldState('passwordConfirmation').error && watch('passwordConfirmation') !== '' || isPasswordRepeatFocus === false &&   buttonCheckError && getFieldState('passwordConfirmation').error || isPasswordRepeatFocus === false &&  buttonCheckError &&   watch('passwordConfirmation') === '' || isPasswordRepeatFocus === false &&  getFieldState('passwordConfirmation').error && isPasswordRepeatFocus === false && watch('passwordConfirmation') === '' || isPasswordRepeatFocus === false && watch('passwordConfirmation') === ''  ? 'redBorderTop' : 'grayBorderTop' }`}>
                <div
                    style={{ height: '16px' }}>  { isPasswordRepeatFocus === false &&  getFieldState('passwordConfirmation').error && watch('passwordConfirmation') !== '' || isPasswordRepeatFocus === false &&  buttonCheckError && watch('passwordConfirmation') !== '' ?
                    <span style={{ color: 'rgb(244, 44, 79)', marginLeft: '12px' }}>Пароли не совпадают</span> : getFieldState('passwordConfirmation').error && isPasswordRepeatFocus === false && watch('passwordConfirmation') === '' || buttonCheckError && watch('passwordConfirmation') === '' || isPasswordRepeatFocus === false && watch('passwordConfirmation') === ''  ?  <span style={{ color: 'rgb(244, 44, 79)', marginLeft: '12px' }}>Поле не может быть пустым</span> : null} </div>
            </div>

        </div>
    </div>;
};


type FirstStepType = {
    getValues: UseFormGetValues<FormValue>;
    getFieldState: UseFormGetFieldState<FormValue>;
    register: UseFormRegister<FormValue>;
    errors: FieldErrors;
    watch: UseFormWatch<FormValue>
    setButtonCheckErrorStateFalse: () => void
    setPasswordFocusStateTrue: () => void
    setPasswordFocusStateFalse: () => void
    setPasswordRepeatFocusStateFalse: () => void
    setPasswordReapeatFocusStateTrue: () => void
    buttonCheckError: boolean
    isPasswordFocus: boolean | null
    isPasswordRepeatFocus: boolean | null


};

