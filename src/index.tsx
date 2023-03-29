import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';

import { BookPage } from './pages/book';
import { Contract } from './pages/contract';
import { HomePage } from './pages/home-page';
import { Layout } from './pages/layout';
import { LayoutHomePage } from './pages/layout/layout-home-page';
import { Terms } from './pages/terms';
import { store } from './redux-toolkit/store';

import './fonts.css';
import './index.css';
import { Registration } from './pages/auth/registration';
import { Authorization } from './pages/auth/authorization';
import { PasswordRecovery } from './pages/auth/password-recovery';
import { NewPassword } from './pages/auth/new-password';
import { AuthMessage } from './common/auth-message';



const root = ReactDOM.createRoot(document.getElementById('root') as Element | DocumentFragment);

root.render(

    <Provider store={store}>
      <HashRouter>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route element={<LayoutHomePage />}>
              <Route path='/' element={<Navigate to='/books/all' />} />
              <Route path='/books/:category' element={<HomePage />} />
              <Route path='/terms' element={<Terms />} />
              <Route path='/contract' element={<Contract />} />
            </Route>
            <Route path='/books/:category/:bookId' element={<BookPage />} />
            <Route path='/Profile' element={<div> Profile </div>} />

          </Route>
            <Route path='/auth' element={<Authorization/>} />
            <Route path='/registration' element={<Registration/>} />
            <Route path='/forgot-pass' element={<  PasswordRecovery/>} />



        </Routes>
      </HashRouter>
    </Provider>

);
