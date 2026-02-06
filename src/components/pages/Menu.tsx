import React from "react";
import { useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useData } from "../../context/dataContext";
import '../../assets/styles/Menu.css';
import Categories from '../sections/categories/Categories';

function Menu(): React.JSX.Element {
    const { categories } = useData();
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView();
        }
    }, []);

    return (
        <>
            <Categories data={categories} />
            <main ref={ref} className='main'>
                <Outlet />
            </main>
        </>
    );
}

export default Menu;
