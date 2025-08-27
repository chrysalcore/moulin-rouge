import { Link } from 'react-router-dom'

function Nav(props) {
    return (
        <nav className="nav">
            <ul className="nav-list">
            {props.navDetails.map(item => {
                return (
                    <li className="nav-list__item" key={item.text}>
                        <Link to={item.href} className={`nav-list__link${item.isSelected? ' selected' : ''}`} >{item.text}</Link>
                    </li>
                )
            })}
            </ul>
        </nav>
    )
}

export default Nav