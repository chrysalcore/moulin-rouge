import React from "react";
import { useParams } from 'react-router-dom';
import useDishes from "../../../hooks/useDishes";
import AsyncContent from "../../others/AsyncContent";
import '../../../assets/styles/Dishes.css';
import Dish from './Dish';
import SectionHeader from '../../global/SectionHeader';
import header from '../../../data/headers';

function DishesList(): React.JSX.Element {
    const { category } = useParams<{ category: string }>();
    const dishes = useDishes();

    const data = dishes.data.filter(item => item.category === category);

    return (
        <AsyncContent status={dishes}>
            <article className='dishes-container section'>
                <SectionHeader {...header.dishes} />
                <section className='dishes-list'>
                    {data.map(item => (
                        <Dish {...item} key={item.id} main />
                    ))}
                </section>
            </article>
        </AsyncContent>
    );
}

export default DishesList;
