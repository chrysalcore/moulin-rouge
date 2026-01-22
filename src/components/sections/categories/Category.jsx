import { NavLink } from "react-router-dom"

function Category({ name }) {
    return (
        <li className="category" >
            <NavLink className={({isActive}) => isActive? "category__link active" : "category__link"} to={`/menu/${name}`} >
                <strong className='category__name'>{name}</strong>
            </NavLink>
        </li>
    )
}

export default Category