import React from "react";
import { NavLink } from "react-router-dom";
import { NavLink as NavLinkType } from "../../types";

const variants = {
    header: {
        list: 'flex flex-col gap-4 text-sm lg:flex-row lg:gap-12',
        active: 'text-com',
    },
    footer: {
        list: 'flex flex-col items-center gap-2 text-center',
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
        ? `absolute top-0 left-0 -z-20 h-dvh overflow-clip bg-dom py-16 transition-all duration-1000 lg:top-auto lg:left-1/2 lg:z-0 lg:h-auto lg:w-auto lg:-translate-x-1/2 lg:p-0 ${active ? 'w-4/5 px-4' : 'w-0'}`
        : '';

    return (
        <nav className={drawer}>
            <ul className={variants[variant].list}>
                {data.map((item, index) => (
                    <li key={item.text}>
                        <NavLink
                            to={item.href}
                            className={({ isActive }) => isActive ? variants[variant].active : ''}
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
