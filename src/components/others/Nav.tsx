import React from "react";
import { NavLink } from "react-router-dom";
import { NavLink as NavLinkType } from "../../types";

const variants = {
    header: {
        list: 'flex flex-col gap-4 text-sm lg:flex-row lg:gap-12',
        link: 'relative transition-colors duration-200 after:absolute after:inset-x-0 after:-bottom-1 after:h-0.5 after:scale-x-0 after:bg-com after:transition-transform after:duration-300 after:ease-smooth hover:after:scale-x-100',
        active: 'text-com after:scale-x-100',
    },
    footer: {
        list: 'flex flex-col items-center gap-2 text-center',
        link: 'transition-colors duration-200 hover:text-com',
        active: '',
    },
};

type NavProps = {
    data: NavLinkType[];
    variant: keyof typeof variants;
    active?: boolean;
    handleMenu?: () => void;
}

function Nav({ data, variant, active, handleMenu }: NavProps): React.JSX.Element {
    const drawer = variant === 'header'
        ? `absolute top-0 left-0 -z-20 h-dvh w-4/5 bg-dom px-4 py-16 transition-[translate,visibility] duration-300 ease-smooth lg:visible lg:top-auto lg:left-1/2 lg:z-0 lg:h-auto lg:w-auto lg:-translate-x-1/2 lg:p-0 ${active ? 'translate-x-0' : 'invisible -translate-x-full'}`
        : '';

    return (
        <nav className={drawer}>
            <ul className={variants[variant].list}>
                {data.map((item, index) => (
                    <li key={item.text}>
                        <NavLink
                            to={item.href}
                            className={({ isActive }) => `${variants[variant].link} ${isActive ? variants[variant].active : ''}`}
                            end={index === 0}
                            onClick={handleMenu}
                        >
                            {item.text}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Nav;
