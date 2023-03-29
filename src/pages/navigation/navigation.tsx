import React, { useEffect, useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
    getBooksStatus,
    getCategories,
    getCategoriesStatus
} from '../../redux-toolkit/books/books-selectos';

import s from './navigation.module.scss';
import { useWindowSize } from '../../hooks/window-size-hook';
import { StatusRequestEnum } from '../../redux-toolkit/books/books-type';
import { useIsAuth } from '../../hooks/is-auth-hook';


export const Navigation: React.FC<NavigationType> = ({
                                                         toggleMenu,
                                                         idShowcase,
                                                         idBooks,
                                                         idContract,
                                                         idTerms,
    id
                                                     }) => {
    const [isOpen, setIsOpen] = useState(true);

    const status = useSelector(getBooksStatus);
    const categoryStatus = useSelector(getCategoriesStatus);
    const [prevPath, setPrevPath] = useState<string | null>(null);
    const categories = useSelector(getCategories);
    const navigate = useNavigate();
    const { pathname } = useLocation();
    useEffect(() => {

        if (pathname !== '/terms' && pathname !== '/contract' && pathname !== '/Profile' && pathname !== '/exit') {

            setPrevPath(pathname);
        }



    }, [pathname]);
    const handleSetIsOpen: () => void = () => {
        setIsOpen(!isOpen);

        if (!isOpen) {
            if (pathname === '/terms' || pathname === '/contract' || pathname === '/Profile' || pathname === '/exit') {
                navigate(`${!prevPath ? '/books/all' : prevPath}`);
            }
        }
    };
    return (
        <nav>
            <h1
                role="presentation"
                data-test-id={idShowcase}
                onClick={handleSetIsOpen}
                className={` ${s.showcase} ${isOpen ? s.activeShowcase : pathname === '/books/all' ? s.activeShowcase : ''}`}
            >
                <p> Витрина книг</p>
                <i className={`${s.arrow} ${isOpen && s.arrowOpen} ${pathname === '/books/all' && s.arrowColor}  `} />
            </h1>

            {categories && status === StatusRequestEnum.Success && categoryStatus === StatusRequestEnum.Success &&
                <div className={`${s.wrapperList} ${isOpen && s.wrapperListOpen}  `}>
                    {' '}
                    <NavLink  onClick={toggleMenu} to="/books/all">
                        <div data-test-id={idBooks}
                            className={` ${s.booksAll} ${pathname === '/books/all' ? s.activeBooksAll : ''}`}>Все
                            книги</div>
                        {' '}
                    </NavLink>
                    <ul>
                        {categories.map((category) => (
                            <li key={category.id}>
                                <NavLink onClick={toggleMenu} to={`/books/${category.path}`}>
                                    {' '}
                                    <span  data-test-id={`${id}-${category.path}`}
                                        className={`${s.name} ${pathname === `/books/${category.path}` ? s.nameActive : ''}`}>
                  {category.name}
                </span>{' '}
                                    <span data-test-id={`${id}-book-count-for-${category.path}`} className={s.count}>{category.books.length}</span>{' '}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>}
            <NavLink
                onClick={() => {
                    setIsOpen(false);
                    if (toggleMenu) {
                        toggleMenu();
                    }
                }}
                to="/terms"
            >
                <h1 data-test-id={idTerms}
                    className={` ${s.terms} ${pathname === '/terms' ? s.activeTerms : ''}`}>
                    Правила пользования
                </h1>
            </NavLink>
            <NavLink
                onClick={() => {
                    setIsOpen(false);
                    if (toggleMenu) {
                        toggleMenu();
                    }
                }}
                to="/contract"
            >
                {' '}
                <h1 data-test-id={idContract}
                    className={` ${s.contract} ${pathname === '/contract' ? s.activeContract : ''}`}>
                    Договор оферты
                </h1>
            </NavLink>


        </nav>
    );
};

type NavigationType = {
    toggleMenu?: () => void;
    idShowcase: string;
    idBooks: string;
    idContract: string;
    idTerms: string;
    id: string
};
