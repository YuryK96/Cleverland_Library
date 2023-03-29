import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { getBooks, getCategories } from '../../../redux-toolkit/books/books-thunks';
import { AppDispatch } from '../../../redux-toolkit/store';
import { Navigation } from '../../navigation';

import s from './layout-home-page.module.scss';




export const LayoutHomePage = () => {
    const dispatch = useDispatch<AppDispatch>()

    useEffect( ()=>{
        if ( localStorage.getItem('token')) {
        dispatch(getBooks())}

    },[dispatch] )


    return  <section className={s.LayoutHomePage}>
    <div className={s.wrapperNavigation}>
            <Navigation
                idContract='navigation-contract'
                idTerms='navigation-terms'
                idBooks='navigation-books'
                idShowcase='navigation-showcase'
                id='navigation'
            />
        </div>
        <Outlet />
    </section>
}
