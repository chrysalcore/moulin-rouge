import { useParams } from 'react-router-dom'
import { useData } from "../../../context/dataContext";
import '../../../assets/styles/Dishes.css'

import Dish from './Dish'
import SectionHeader from '../../global/SectionHeader';
import header from '../../../data/headers';


function DishesList() {
    const { category } = useParams()
    const { dishes } = useData()

    const data = dishes.filter(item => item.category === category)

    return (
        <article className='dishes-container section'>
            <SectionHeader {...header.dishes} />
            <section className='dishes-list'>
                {data.map(item => (
                    <Dish {...item} key={item.name} main />
                ))}
            </section>
        </article>
    )
}

export default DishesList