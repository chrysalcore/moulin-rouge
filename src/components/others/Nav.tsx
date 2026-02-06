import React from "react";
import { NavLink } from "react-router-dom";
import { NavLink as NavLinkType } from "../../types";

type NavProps = {
    data: NavLinkType[];
    active?: boolean;
    handleMenu?: () => void;
}

function Nav({ data, active, handleMenu }: NavProps): React.JSX.Element {
    return (
        <nav className={`nav ${active ? 'active' : ''}`}>
            <ul className="nav-list">
                {data.map((item, index) => {
                    return (
                        <li className="nav-list__item" key={item.text}>
                            <NavLink 
                                to={item.href} 
                                className={({isActive}) => isActive? 'nav-list__link selected' : 'nav-list__link'} 
                                end={index === 0} 
                                onClick={handleMenu}
                            >
                                {item.text}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}

export default Nav;
