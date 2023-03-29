import React, { useState } from 'react';
import {
    Control,
    Controller, FieldValues, UseControllerProps,
    UseControllerReturn,
    UseFormGetFieldState, UseFormGetValues, UseFormRegister, UseFormWatch
} from 'react-hook-form';
// eslint-disable-next-line import/no-extraneous-dependencies
import InputMask from 'react-input-mask';
import { FormValue } from '../../registration';


export const ThirdStep: React.FC<SecondStepType> = ({
                                                        register,
                                                        getFieldState,
                                                        setButtonCheckErrorStateFalse,
                                                        buttonCheckError,
                                                        control,
                                                        watch
                                                    }) => {


    const firstCodeNumber = String(watch('phone')).charAt(5);
    const [isPhoneFocus, setIsPhoneFocus] = useState<boolean | null>(null);
    const [isEmailFocus, setIsEmailFocus] = useState<boolean | null>(null);

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
    return <React.Fragment>
        <div className="authorization_container__WrapperFirstInput">
            <Controller name="phone" control={control} render={({ field }) => (

                <InputMask type="text" id="phone"

                           mask={['+', '3', '7', '5',  ' ', '(', /( ?(?=[2])[2]|(?=[3])[3]|(?=[4])[4]|^$ )/, firstCodeNumber === '2' ? /( ?(?=[5])[5]|(?=[9])[9]|^$ )/ : firstCodeNumber === '3' ? /( ?(?=[3])[3]|^$ )/ : firstCodeNumber === '4' ? /( ?(?=[4])[4]|^$ )/ : /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}

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
                 className={`authorization_container__firstNote ${!watch('phone') && buttonCheckError || !getFieldState('phone').error && !buttonCheckError || !getFieldState('phone').error && buttonCheckError ? 'grayBorderTop authorization_container__grayColor' : 'redBorderTop'}`}
                 style={!watch('phone') && buttonCheckError ? { borderTop: '1px solid rgb(244, 44, 79)' } : {}}>
                {watch('phone') === '' && isPhoneFocus === false || buttonCheckError && watch('phone') === ''  ?
                    <span style={{ color: 'rgb(244, 44, 79)', paddingLeft:'12px' }}>Поле не может быть пустым</span>   :   getFieldState('phone').error || buttonCheckError && !getFieldState('phone') ?
                        <span style={{ color: 'rgb(244, 44, 79)', paddingLeft:'12px'  }}>В формате +375 (xx)
                            xxx-xx-xx</span> : <span style={{ color: '#BFC4C9', paddingLeft:'12px'  }}>В формате +375 (xx)
                            xxx-xx-xx</span>}  </div>
        </div>
        <div className="authorization_container__WrapperSecondInput">
            <input id="email" className="authorization_container__secondInput"
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
                        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value)
                }
            })} autoComplete="off" required={true} />

            <label htmlFor="email" className="floating-label">E-mail</label>
            <div data-test-id="hint"
                 className={` authorization_container__secondNote ${getFieldState('email').error && buttonCheckError || getFieldState('email').error && watch('email') === '' || isEmailFocus === false && watch('email') === '' || getFieldState('email').error || buttonCheckError && watch('email') === ''  ? ' redBorderTop ' : 'grayBorderTop'} `}
                >
                {getFieldState('email').error && watch('email') !== '' || buttonCheckError && watch('email') !== '' ?
                    <p style={{ color: 'rgb(244, 44, 79)' }}>Введите корректный
                        e-mail</p> : getFieldState('email').error && watch('email') === '' || buttonCheckError && watch('email') === '' || isEmailFocus === false && watch('email') === ''   ?
                        <p style={{ color: 'rgb(244, 44, 79)' }}>Поле не может быть пустым</p> : null} </div>
        </div>
    </React.Fragment>;
};

type SecondStepType = {
    getFieldState: UseFormGetFieldState<FormValue>;
    register: UseFormRegister<FormValue>;
    control: Control<FormValue>
    setButtonCheckErrorStateFalse: () => void
    buttonCheckError: boolean,
    watch: UseFormWatch<FormValue>
};

