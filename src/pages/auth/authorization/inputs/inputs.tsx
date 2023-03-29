import React, { useState } from 'react';
import {
    UseFormGetFieldState,
    UseFormGetValues, UseFormRegister, UseFormWatch
} from 'react-hook-form';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import closeEye from '../../../../assets/images/authorization/closeEye.svg';
import openEye from '../../../../assets/images/authorization/openEye.svg';
import { FormValue } from '../authorization';
import { getAuthError } from '../../../../redux-toolkit/auth/auth-selectos';


export const Inputs: React.FC<FirstStepType> = ({
                                                    register,
                                                    getFieldState,
                                                    getValues, watch
                                                    ,handleClearAuthError,
                                                    setButtonCheckErrorStateFalse,
                                                    buttonCheckError
                                                }) => {
    const [passwordShown, setPasswordShown] = useState(false);
    const [isLoginFocus, setIsLoginFocus] = useState<boolean | null>(null);
    const [isPasswordFocus, setIsPasswordFocus] = useState<boolean | null>(null);
    const authError = useSelector(getAuthError)
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
                   required={true} {...register('identifier', {
                onBlur: () => setLoginFocusStateFalse(),

                required: true
            })} />

            <label htmlFor="username" className="floating-label">Логин</label>
            <div data-test-id="hint"
                 className={`authorization_container__firstNote  ${ getFieldState('identifier').error && buttonCheckError || getFieldState('identifier').error && watch('identifier') === '' || getFieldState('identifier').error || isLoginFocus === false && watch('identifier') === '' || buttonCheckError && watch('identifier') === ''  ? 'redBorderTop ' : 'grayBorderTop'}  ${ authError === '400' && 'redBorderTop' }`}>
                <div
                    style={{ height: '16px' }}>{getFieldState('identifier').error || buttonCheckError && watch('identifier') === '' || isLoginFocus === false && watch('identifier') === '' ?
                    <span style={{ color: 'rgb(244, 44, 79)', marginLeft:'12px' }}>Поле не может быть пустым</span> : null} </div>
            </div>
        </div>
        <div className="authorization_container__WrapperSecondInput">
            <div className="authorization_container__WrapperIcons">

                {watch('password')?.length > 0 &&
                    <img style={{ marginLeft: '25px' }} role="presentation"
                         onClick={togglePasswordVisiblity}
                         data-test-id={passwordShown ? 'eye-opened' : 'eye-closed'}
                         src={passwordShown ? openEye : closeEye} alt="eye" />}</div>
            <input id="password" className="authorization_container__secondInput"
                   onFocus={() => {
                       setButtonCheckErrorStateFalse();
                       setPasswordFocusStateTrue();
                   }}
                   type={passwordShown ? 'text' : 'password'} {...register('password', {
                onBlur: () => setPasswordFocusStateFalse(),
                required: true
            })} autoComplete="off" required={true} />

            <label htmlFor="password" className="floating-label">Пароль</label>

            <div data-test-id="hint"
                 className={`authorization_container__secondNote  ${ getFieldState('password').error && buttonCheckError || getFieldState('password').error && watch('password') === '' || getFieldState('password').error || isPasswordFocus === false && watch('password') === '' || buttonCheckError && watch('password') === '' ? 'redBorderTop ' : 'grayBorderTop'}  ${ authError === '400' && 'redBorderTop' }`}>

                {getFieldState('password').error || buttonCheckError && watch('password') === '' || isPasswordFocus === false && watch('password') === '' ?
                    <span style={{ marginLeft:'12px', color: 'rgb(244, 44, 79)' }}>Поле не может быть пустым</span> : null}


                { authError === '400' ?   <div role='presentation' onClick={handleClearAuthError} className='authorization_container__wrongPassword'><span style={ {color:'rgb(244, 44, 79)'} } >Неверный логин или пароль!</span> <NavLink to="/forgot-pass"> <span style={ {display: 'block'} } >Восстановить?</span> </NavLink>  </div>  :   <div role='presentation' onClick={handleClearAuthError}  className="authorization_container__forgetPassword"><NavLink to="/forgot-pass">
                    <span>Забыли логин или пароль?</span></NavLink>     </div>  }

            </div>




        </div>
    </React.Fragment>;
};


type FirstStepType = {
    getValues: UseFormGetValues<FormValue>;
    getFieldState: UseFormGetFieldState<FormValue>;
    register: UseFormRegister<FormValue>;
    watch: UseFormWatch<FormValue>
    setButtonCheckErrorStateFalse: () => void
    buttonCheckError: boolean
    handleClearAuthError: ()=> void
};

