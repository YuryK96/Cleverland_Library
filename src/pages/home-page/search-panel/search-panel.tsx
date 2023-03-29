import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { useWindowSize } from '../../../hooks/window-size-hook';
import { searchBooks } from '../../../redux-toolkit/books/books-reducer';
import { AppDispatch } from '../../../redux-toolkit/store';

import { FilterButton } from './filter-button';

import s from './search-panel.module.scss';






export const SearchPanel: React.FC<SearchPanel> = ({ handleSetIsSortingList, isSortingList,toggleRatingSort, category,addSearchText }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const dispatch = useDispatch<AppDispatch>()

  const windowWidth = useWindowSize();
  const { register, getValues, setFocus } = useForm<Inputs>();



  const handlerSendSearchData: () => void = useCallback(() => {
     dispatch( searchBooks({search: getValues('search'), category }) )
  },[category, dispatch, getValues])


    useEffect( ()=>{
        handlerSendSearchData()
    },[category,handlerSendSearchData ] )


  const handlerCloseSearchFieldMobile: () => void = () => {
    if (getValues('search') === '' || null) {
      setIsSearchOpen(false);
    }
  };
  const handlerOpenSearchFieldMobile: () => void = () => {
    if (!isSearchOpen) {
      setIsSearchOpen(true);
      setFocus('search', );
    }
  };

  return (
    <section className={s.searchPanel}>
      <div className={`  ${s.container} ${isSearchOpen ? s.containerActive : ''} `}>
        <form className={`  ${s.form} ${isSearchOpen ? s.activeForm : ''} `}>
          <div className={s.containerSearchFilter}>
            <div
              role='presentation'
              onBlur={handlerCloseSearchFieldMobile}
              onClick={handlerOpenSearchFieldMobile}
              data-test-id='button-search-open'
              className={`${s.searchButton} ${isSearchOpen ? s.searchButtonActive : ''}  `}
            >
              <div className={s.searchWrapper}>
                  {!isSearchOpen ?  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M7.3335 2.66671C4.75617 2.66671 2.66683 4.75605 2.66683 7.33337C2.66683 9.9107 4.75617 12 7.3335 12C9.91083 12 12.0002 9.9107 12.0002 7.33337C12.0002 4.75605 9.91083 2.66671 7.3335 2.66671ZM1.3335 7.33337C1.3335 4.01967 4.01979 1.33337 7.3335 1.33337C10.6472 1.33337 13.3335 4.01967 13.3335 7.33337C13.3335 10.6471 10.6472 13.3334 7.3335 13.3334C4.01979 13.3334 1.3335 10.6471 1.3335 7.33337Z'
                    fill='#A7A7A7'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M10.6284 10.6286C10.8887 10.3683 11.3108 10.3683 11.5712 10.6286L14.4712 13.5286C14.7315 13.789 14.7315 14.2111 14.4712 14.4714C14.2108 14.7318 13.7887 14.7318 13.5284 14.4714L10.6284 11.5714C10.368 11.3111 10.368 10.889 10.6284 10.6286Z'
                    fill='#A7A7A7'
                  />
                </svg> :
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M7.33203 2.66732C4.7547 2.66732 2.66536 4.75666 2.66536 7.33398C2.66536 9.91131 4.7547 12.0007 7.33203 12.0007C9.90936 12.0007 11.9987 9.91131 11.9987 7.33398C11.9987 4.75666 9.90936 2.66732 7.33203 2.66732ZM1.33203 7.33398C1.33203 4.02028 4.01832 1.33398 7.33203 1.33398C10.6457 1.33398 13.332 4.02028 13.332 7.33398C13.332 10.6477 10.6457 13.334 7.33203 13.334C4.01832 13.334 1.33203 10.6477 1.33203 7.33398Z" fill="url(#paint0_linear_158_13220)"/>
                      <path fillRule="evenodd" clipRule="evenodd" d="M10.6289 10.6289C10.8892 10.3685 11.3113 10.3685 11.5717 10.6289L14.4717 13.5289C14.732 13.7892 14.732 14.2113 14.4717 14.4717C14.2113 14.732 13.7892 14.732 13.5289 14.4717L10.6289 11.5717C10.3685 11.3113 10.3685 10.8892 10.6289 10.6289Z" fill="url(#paint1_linear_158_13220)"/>
                      <defs>
                          <linearGradient id="paint0_linear_158_13220" x1="7.11591" y1="-20.9785" x2="-39.2622" y2="15.804" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#F83600"/>
                              <stop offset="1" stopColor="#F9D423"/>
                          </linearGradient>
                          <linearGradient id="paint1_linear_158_13220" x1="12.474" y1="2.56224" x2="-3.88716" y2="15.5383" gradientUnits="userSpaceOnUse">
                              <stop stopColor="#F83600"/>
                              <stop offset="1" stopColor="#F9D423"/>
                          </linearGradient>
                      </defs>
                  </svg>}

                  <input
                  placeholder='Поиск книги или автора…'
                  data-test-id='input-search'

                  type='text'
                  {...register('search', {
                    onChange: (event: React.FormEvent<HTMLInputElement> ) => {
                      handlerSendSearchData();
                       addSearchText(event.currentTarget.value)
                    },
                  })}
                />
              </div>
              {isSearchOpen && !windowWidth.tablet && (
                <div
                  data-test-id='button-search-close'
                  role='presentation'
                  className={s.searchButtonClose}
                  onClick={() => {
                    setIsSearchOpen(false);

                  }}
                >
                  <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M12.4713 3.52864C12.7317 3.78899 12.7317 4.2111 12.4713 4.47145L4.47132 12.4714C4.21097 12.7318 3.78886 12.7318 3.52851 12.4714C3.26816 12.2111 3.26816 11.789 3.52851 11.5286L11.5285 3.52864C11.7889 3.26829 12.211 3.26829 12.4713 3.52864Z'
                      fill='url(#paint0_linear_7929_4585)'
                    />
                    <path
                      fillRule='evenodd'
                      clipRule='evenodd'
                      d='M3.52851 3.52864C3.78886 3.26829 4.21097 3.26829 4.47132 3.52864L12.4713 11.5286C12.7317 11.789 12.7317 12.2111 12.4713 12.4714C12.211 12.7318 11.7889 12.7318 11.5285 12.4714L3.52851 4.47145C3.26816 4.2111 3.26816 3.78899 3.52851 3.52864Z'
                      fill='url(#paint1_linear_7929_4585)'
                    />
                    <defs>
                      <linearGradient
                        id='paint0_linear_7929_4585'
                        x1='7.83182'
                        y1='-14.0208'
                        x2='-28.2401'
                        y2='14.5878'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop stopColor='#F83600' />
                        <stop offset='1' stopColor='#F9D423' />
                      </linearGradient>
                      <linearGradient
                        id='paint1_linear_7929_4585'
                        x1='7.83182'
                        y1='-14.0208'
                        x2='-28.2401'
                        y2='14.5878'
                        gradientUnits='userSpaceOnUse'
                      >
                        <stop stopColor='#F83600' />
                        <stop offset='1' stopColor='#F9D423' />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
              )}
            </div>
            {(!isSearchOpen || windowWidth.tablet) && (
              <FilterButton toggleRatingSort={toggleRatingSort}  />
            )}
          </div>
        </form>

        <div className={s.containerSorting}>
          <div
            role='presentation'
            data-test-id='button-menu-view-window'
            className={` ${s.sortSquareButton} ${!isSortingList && s.sortSquareButtonActive} `}
            onClick={() => handleSetIsSortingList(false)}
          >
            <svg width='20' height='20' viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M4.14773 3.5C3.79 3.5 3.5 3.79 3.5 4.14773V9.32955C3.5 9.68728 3.79 9.97727 4.14773 9.97727H9.32955C9.68728 9.97727 9.97727 9.68728 9.97727 9.32955V4.14773C9.97727 3.79 9.68728 3.5 9.32955 3.5H4.14773ZM4.79545 8.68182V4.79545H8.68182V8.68182H4.79545ZM11.9205 3.5C11.5627 3.5 11.2727 3.79 11.2727 4.14773V9.32955C11.2727 9.68728 11.5627 9.97727 11.9205 9.97727H17.1023C17.46 9.97727 17.75 9.68728 17.75 9.32955V4.14773C17.75 3.79 17.46 3.5 17.1023 3.5H11.9205ZM12.5682 8.68182V4.79545H16.4545V8.68182H12.5682ZM3.5 11.9205C3.5 11.5627 3.79 11.2727 4.14773 11.2727H9.32955C9.68728 11.2727 9.97727 11.5627 9.97727 11.9205V17.1023C9.97727 17.46 9.68728 17.75 9.32955 17.75H4.14773C3.79 17.75 3.5 17.46 3.5 17.1023V11.9205ZM4.79545 12.5682V16.4545H8.68182V12.5682H4.79545ZM11.9205 11.2727C11.5627 11.2727 11.2727 11.5627 11.2727 11.9205V17.1023C11.2727 17.46 11.5627 17.75 11.9205 17.75H17.1023C17.46 17.75 17.75 17.46 17.75 17.1023V11.9205C17.75 11.5627 17.46 11.2727 17.1023 11.2727H11.9205ZM12.5682 16.4545V12.5682H16.4545V16.4545H12.5682Z'
                fill='#A7A7A7'
              />
            </svg>
          </div>
          <div
            role='presentation'
            data-test-id='button-menu-view-list'
            onClick={() => handleSetIsSortingList(true)}
            className={` ${s.sortListButton} ${isSortingList && s.sortListButtonActive} `}
          >
            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M1.3335 8.00004C1.3335 7.63185 1.63197 7.33337 2.00016 7.33337H14.0002C14.3684 7.33337 14.6668 7.63185 14.6668 8.00004C14.6668 8.36823 14.3684 8.66671 14.0002 8.66671H2.00016C1.63197 8.66671 1.3335 8.36823 1.3335 8.00004Z'
                fill='#A7A7A7'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M1.3335 4.00004C1.3335 3.63185 1.63197 3.33337 2.00016 3.33337H14.0002C14.3684 3.33337 14.6668 3.63185 14.6668 4.00004C14.6668 4.36823 14.3684 4.66671 14.0002 4.66671H2.00016C1.63197 4.66671 1.3335 4.36823 1.3335 4.00004Z'
                fill='#A7A7A7'
              />
              <path
                fillRule='evenodd'
                clipRule='evenodd'
                d='M1.3335 12C1.3335 11.6319 1.63197 11.3334 2.00016 11.3334H14.0002C14.3684 11.3334 14.6668 11.6319 14.6668 12C14.6668 12.3682 14.3684 12.6667 14.0002 12.6667H2.00016C1.63197 12.6667 1.3335 12.3682 1.3335 12Z'
                fill='#A7A7A7'
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};
type Inputs = {
    search: string;

};
// eslint-disable-next-line @typescript-eslint/no-redeclare
type SearchPanel = {
    handleSetIsSortingList: (boolean: boolean) => void;
    isSortingList: boolean;
    toggleRatingSort: ()=>void

    removeSearchText: ()=> void
    addSearchText: (text: string)=> void
    category: string | undefined
};
