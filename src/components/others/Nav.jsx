import { NavLink } from "react-router-dom"

function Nav({ data, active, handleMenu }) {
    return (
        <nav className={`nav ${active ? 'active' : ''}`}>
            <ul className="nav-list">
            {data.map((item, index) => {
                return (
                    <li className="nav-list__item" key={item.text}>
                        <NavLink to={item.href} className={({isActive}) => isActive? 'nav-list__link selected' : 'nav-list__link'} end={index === 0} onClick={handleMenu} >{item.text}</NavLink>
                    </li>
                )
            })}
            </ul>
        </nav>
    )
}

export default Nav