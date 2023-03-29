import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import s from './burgerButton.module.scss';
import { Navigation } from '../../navigation';
import { useWindowSize } from '../../../hooks/window-size-hook';


export const BurgerButton: React.FC<BurgerButtonType> = ({ toggleMenu, isOpen }) =>{
    const { width1000 } = useWindowSize();

 return   <div className={s.burgerButton}>
      <div className={s.ButtonContainer}>
        <div
          data-test-id='button-burger'
          role='presentation'
          onClick={toggleMenu}
          className={`${s.twoLine} ${isOpen && s.twoLineActive}`}
        >
          <span className={`${s.mediumLine} ${isOpen && s.mediumLineActiveFirst}`} />
          <span className={`${s.mediumLine} ${isOpen && s.mediumLineActiveSecond}`} />
        </div>

      </div>
      <div
        role='presentation'
        onClick={toggleMenu}
        style={
          isOpen
            ? {
                position: 'absolute',
                marginLeft: '-5%',
                height: document.documentElement.offsetHeight - 45,
                width: '100%',
              }
            : {}
        }
      />

      <div data-test-id='burger-navigation' className={`${s.menuButton} ${isOpen && s.menuButtonOpen}`} >
        <div className={s.menuButtonWrapper}>
          <Navigation
            idContract='burger-contract'
            idTerms='burger-terms'
            idBooks='burger-books'
            idShowcase='burger-showcase'
            toggleMenu={toggleMenu}
            id='burger'
          />

        </div>
          {!width1000 && <>
              <hr />
              <NavLink onClick={() => {

                  if (toggleMenu) {
                      toggleMenu();
                  }
              }} to="/Profile">
                  <h1
                      className={`${s.profile} `}>Профиль
                  </h1>
              </NavLink>
              <NavLink  onClick={() => {
                  if (toggleMenu) {
                      toggleMenu();
                  }
                  localStorage.setItem('token', '')
              }} to="/">
                  <h1  data-test-id='exit-button' className={`${s.exit} `}>Выход</h1>
                  {' '}
              </NavLink> </>}
      </div>
    </div>
  }

type BurgerButtonType = {
  isOpen: boolean;
  toggleMenu: () => void;
};
