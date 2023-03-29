
import React from 'react';
import  s from './not-found-books.module.scss'

export const NotFoundBooks:React.FC<NotFoundBooksType> = ({title,id})=> (
    <div  className={s.notFoundBooks}> <h1 data-test-id={id} className={s.title}>{title}</h1></div>
)

type NotFoundBooksType = {
    title: string
    id: string
}
