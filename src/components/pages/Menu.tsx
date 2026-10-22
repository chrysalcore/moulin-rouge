import React from "react";
import { Outlet } from 'react-router-dom';
import useDishes from "../../hooks/useDishes";
import useScrollIntoView from "../../hooks/useScrollIntoView";
import Categories from '../sections/categories/Categories';
import Main from '../global/Main';

function Menu(): React.JSX.Element {
    const { categories } = useDishes();
    const ref = useScrollIntoView<HTMLElement>();

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
