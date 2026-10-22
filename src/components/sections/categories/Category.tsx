import React from "react";
import { NavLink } from "react-router-dom";

function Category({ name }: { name: string }): React.JSX.Element {
    return (
        <li className="w-40 max-w-full overflow-clip rounded-lg shadow-card">
            <NavLink
                className={({ isActive }) => `flex h-full flex-col items-center justify-center p-4 text-center capitalize ${isActive ? 'bg-com' : 'bg-com/50'}`}
                to={`/menu/${name}`}
            >
                <strong className='text-lg font-semibold'>{name}</strong>
            </NavLink>
        </li>
    );
}

export default Category;
