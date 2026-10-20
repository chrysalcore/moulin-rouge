import React from "react";
import { useRef, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useDishes from "../../hooks/useDishes";
import '../../assets/styles/Menu.css';
import Categories from '../sections/categories/Categories';
import Main from '../global/Main';

function Menu(): React.JSX.Element {
    const { categories } = useDishes();
    const ref = useRef<HTMLElement>(null);

    useEffect(() => {
        if (ref.current) {
            ref.current.scrollIntoView();
        }
    }, []);

    return (
        <>
            <Categories data={categories} />
            <Main ref={ref}>
                <Outlet />
            </Main>
        </>
    );
}

export default Menu;
