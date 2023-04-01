import { NavLink, useLocation, useParams } from "react-router-dom";
import { useState } from 'react';
import { useSelector } from "react-redux";
import avatar from '../../assets/images/avatar/avatar.png';

import logo from '../../assets/images/logo/logo.svg';

import { BurgerButton } from './burger-button';

import s from './header.module.scss';
import { getAuthFirstName } from "../../redux-toolkit/auth/auth-selectos";

export const Header: React.FC = () => {
    const {pathname} = useLocation()
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenMenuList, setIsOpenMenuList] = useState(false);
  const firstName = useSelector(getAuthFirstName)

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const openMenu = () => {
    setIsOpen(true);
  };
  const closeMenu = () => {
    if (isOpen) {
      setIsOpen(false);
    }
  };
  const openMenuList = () => {
      setIsOpenMenuList(true);
  };
  const closeMenuList = () => {
    if (isOpenMenuList) {
        setIsOpenMenuList(false);
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
        <span className={s.libraryTitle}>{pathname === '/profile' ? 'Личный кабинет': "Библиотека"}</span>
      </div>

      <div className={s.account}>
        <div className={s.name}>Привет, {firstName}</div>
        <div className={s.avatar} role='presentation' onClick={toggleMenu}  onMouseEnter={openMenu} onMouseLeave={closeMenu}  >
          <img alt='avatar' src={avatar} />

        </div>
          <div role='presentation' onMouseEnter={openMenuList} onMouseLeave={closeMenuList}  className={`${s.account_menu} ${isOpen || isOpenMenuList ? s.account_menu_open : ''} `}>
              <div className={s.account_profile}><NavLink to='/profile' >Профиль </NavLink> </div>
              <div role='presentation' onClick={clearJWTToken} className={s.account_exit}> <NavLink to='/'>Выход </NavLink> </div>
          </div>
          {isOpen && <div className={s.header_border_bottom}/> || isOpenMenuList && <div className={s.header_border_bottom}/> }
      </div>

    </section>
  );
};
