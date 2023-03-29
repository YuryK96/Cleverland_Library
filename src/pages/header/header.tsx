import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import avatar from '../../assets/images/avatar/avatar.png';
import logo from '../../assets/images/logo/logo.svg';

import { BurgerButton } from './burger-button';

import s from './header.module.scss';

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const closeMenu = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };

  const clearJWTToken = ()=> {
      localStorage.setItem('token','')
  }
  return (
    <section className={s.header} >
      <div className={s.wrapper}>
        <div className={s.logo}>
          {' '}
          <NavLink to='/'>
            <img alt='logo' src={logo} />{' '}
          </NavLink>
        </div>
        <BurgerButton toggleMenu={toggleMenu} isOpen={isOpen} />
        <div
          role='presentation'
          onClick={closeMenu}
          style={{
            position: 'absolute',
            height: '60px',
            width: '85%',
            overflowX: 'hidden',

            marginLeft: '9%',
            marginTop: '-3%',
          }}
        />
        <span className={s.libraryTitle}>Библиотека</span>
      </div>

      <div className={s.account}>
        <div className={s.name}>Привет, Иван</div>
        <div role='presentation' onClick={toggleMenu} >
          <img alt='avatar' src={avatar} />

        </div>
          <div className={`${s.account_menu} ${isOpen ? s.account_menu_open : ''} `}>
              <div className={s.account_profile}><NavLink to='/profile' >Профиль </NavLink> </div>
              <div role='presentation' onClick={clearJWTToken} className={s.account_exit}> <NavLink to='/'>Выход </NavLink> </div>
          </div>
          {isOpen && <div className={s.header_border_bottom}/>}
      </div>

    </section>
  );
};
