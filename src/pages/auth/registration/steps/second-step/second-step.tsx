import React, { useState } from 'react';
import {
    FieldErrors,
    UseFormGetFieldState, UseFormRegister, UseFormWatch
} from 'react-hook-form';
import { FormValue } from '../../registration';



export const SecondStep: React.FC<SecondStepType> = ({
                                                         register,
                                                         getFieldState,
                                                         setButtonCheckErrorStateFalse,
                                                         buttonCheckError,
    watch
                                                     }) =>

 {
     const [isNameFocus, setIsNameFocus] = useState<boolean | null>(null);
     const [isLastNameFocus, setIsLastNameFocus] = useState<boolean | null>(null);

     const setNameFocusStateTrue = () => {
         setIsNameFocus(true);
     };
     const setNamelFocusStateFalse = () => {
         setIsNameFocus(false);
     };
     const setLastNameFocusStateTrue = () => {
         setIsLastNameFocus(true);
     };
     const setLastNamelFocusStateFalse = () => {
         setIsLastNameFocus(false);
     };
  return  <React.Fragment>
        <div className="authorization_container__WrapperFirstInput">
            <input type="text" id="username"
                   onFocus={ ()=> {
                       setButtonCheckErrorStateFalse()
                       setNameFocusStateTrue()
                   }}
                   className="authorization_container__firstInput"
                   autoComplete="off"
                   required={true} {...register('firstName', {
                onBlur: () => setNamelFocusStateFalse(),
                required: true
            })} />

            <label htmlFor="username" className="floating-label">Имя</label>
            <div
                className={` authorization_container__firstNote ${getFieldState('firstName').error && buttonCheckError || getFieldState('firstName').error && watch('firstName') === '' || isNameFocus === false && watch('firstName') === '' || buttonCheckError && watch('firstName') === ''  ? 'redBorderTop' :  'grayBorderTop' } `} data-test-id="hint"
              >
                {getFieldState('firstName').error || buttonCheckError && watch('firstName') === ''  || isNameFocus === false && watch('firstName') === ''  ?
                    <span style={{ color: 'rgb(244, 44, 79)',marginLeft:'12px' }}>Поле не может быть пустым</span> : null}  </div>
        </div>
        <div className="authorization_container__WrapperSecondInput">
            <input id="lastName" className="authorization_container__secondInput"
                   onFocus={ ()=> {
                       setButtonCheckErrorStateFalse()
                       setLastNameFocusStateTrue()
                   }}
                   type="text" {...register('lastName', {
                onBlur: () => setLastNamelFocusStateFalse(),
                required: true
            })} autoComplete="off" required={true} />

            <label htmlFor="lastName" className="floating-label">Фамилия</label>
            <div
                className={` authorization_container__secondNote ${getFieldState('lastName').error && buttonCheckError || getFieldState('lastName').error && watch('lastName') === '' || isLastNameFocus === false && watch('lastName') === '' || buttonCheckError && watch('lastName') === ''  ? 'redBorderTop' :  'grayBorderTop' } `} data-test-id="hint"
               >
                {getFieldState('lastName').error || buttonCheckError && watch('lastName') === ''  || isLastNameFocus === false && watch('lastName') === ''  ?
                    <span style={{ color: 'rgb(244, 44, 79)',marginLeft:'12px' }}>Поле не может быть пустым</span> : null}  </div>
        </div>
    </React.Fragment>;
}


type SecondStepType = {
    getFieldState: UseFormGetFieldState<FormValue>;
    register: UseFormRegister<FormValue>;
    setButtonCheckErrorStateFalse: ()=>void
    buttonCheckError: boolean
    watch: UseFormWatch<FormValue>

};

