import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../../assets/styles/Header.css';
import Nav from '../../others/Nav';
import data from '../../../data/navigation';
import CTA from '../../others/CTA';

function Header(): React.JSX.Element {
    const [active, setActive] = useState<boolean>(false);
    const nav = useNavigate();

    const handleMenu = (): void => {
        setActive(!active);
    };

    const handleReserv = (): void => {
        nav('reservation');
    };

    return (
        <section className='header'>
            <Link to={''} >
                <img 
                    className='header__logo' 
                    src={new URL("../../../assets/icons/logo.svg", import.meta.url).href} 
                    alt="main icon"
                />
            </Link>
            <Nav data={data} active={active} handleMenu={handleMenu} />
            <div className='header-buttons'>
                <CTA onClick={handleReserv} >Reserv</CTA>
                <button className='header__button btn' onClick={handleMenu} >
                    <img 
                        className='header__button-img' 
                        src={new URL("../../../assets/icons/menu.svg", import.meta.url).href} 
                        alt="menu svg" 
                    />
                </button>
            </div>
        </section>
    );
}

export default Header;
