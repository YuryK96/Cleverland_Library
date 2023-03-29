/* eslint-disable */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getBookName, getCategories } from "../../../redux-toolkit/books/books-selectos";
import s from './bread-crumbs.module.scss';
import { NavLink, useParams } from "react-router-dom";


export const BreadCrumbs = () => {
    const { category } = useParams();
    const categories = useSelector(getCategories)
    const bookTitle = useSelector(getBookName)
    const [categoryName, setCategoryName ]= useState<string>()
    useEffect( ()=>{

        if (categories) {
            const foundCategory = categories.find(item => item.path === category);
            foundCategory ?  setCategoryName(foundCategory.name) : setCategoryName("Все книги")
        }
            else {
            setCategoryName("Все книги");
        }
    },[category, categories] )
   return <div className={s.breadCrumbs}>
       <p><NavLink data-test-id='breadcrumbs-link' to={`/books/${category}`}>{categoryName}</NavLink> / <span data-test-id='book-name' >{bookTitle}</span></p>
    </div>
}

