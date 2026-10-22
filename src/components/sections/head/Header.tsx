import React from "react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Nav from '../../others/Nav';
import data from '../../../data/navigation';
import Button from '../../others/Button';
import IconButton from '../../others/IconButton';
import { useAppSelector } from '../../../store/hooks';
import { selectItemCount } from '../../../store/orderSlice';

const logo = new URL("../../../assets/icons/logo.svg", import.meta.url).href;
const cartIcon = new URL("../../../assets/icons/cart.svg", import.meta.url).href;
const menuIcon = new URL("../../../assets/icons/menu.svg", import.meta.url).href;

function Header(): React.JSX.Element {
    const [active, setActive] = useState<boolean>(false);
    const itemCount = useAppSelector(selectItemCount);

    const handleMenu = (): void => {
        setActive(!active);
    };

    const handleClose = (): void => {
        setActive(false);
    };

    useEffect(() => {
        if (!active) return;

        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === 'Escape') setActive(false);
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [active]);

    return (
        <header className='fixed z-50 flex w-full items-center justify-between bg-dom px-4 py-2 text-ctr lg:px-16'>
            <Link to={'/'} viewTransition>
                <img className='h-6' src={logo} alt="Moulin Rouge home" />
            </Link>
            <div
                className={`fixed inset-0 -z-30 bg-black/60 transition-opacity duration-300 lg:hidden ${active ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
                aria-hidden="true"
                onClick={handleClose}
            />
            <Nav data={data} variant='header' active={active} handleMenu={handleClose} />
            <div className='flex items-center gap-4'>
                <Link className='relative flex items-center' to={'/order'} viewTransition aria-label={`Order, ${itemCount} items`}>
                    <img className='size-7 transition-transform duration-200 ease-smooth hover:scale-110' src={cartIcon} alt='' />
                    <span key={itemCount} className='absolute -right-2 bottom-0 flex size-4 items-center justify-center rounded-full bg-com text-xs font-semibold motion-safe:animate-bump'>{itemCount}</span>
                </Link>
                <Button to={'/reservation'}>Reserv</Button>
                <div className='lg:hidden'>
                    <IconButton icon={menuIcon} label='Toggle menu' expanded={active} onClick={handleMenu} />
                </div>
            </div>
        </header>
    );
}

export default Header;
