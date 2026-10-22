import React from "react";
import { useParams } from 'react-router-dom';
import useDishes from "../../../hooks/useDishes";
import AsyncContent from "../../others/AsyncContent";
import Dish from './Dish';
import Section from '../../global/Section';
import header from '../../../data/headers';

function DishesList(): React.JSX.Element {
    const { category } = useParams<{ category: string }>();
    const dishes = useDishes();

    const data = dishes.data.filter(item => item.category === category);

    return (
        <AsyncContent status={dishes}>
            <Section as='article' header={header.dishes}>
                <div className='flex flex-wrap justify-center gap-4'>
                    {data.map(item => (
                        <Dish {...item} key={item.id} main className='relative aspect-6/7 w-80 max-w-full transition-transform duration-300 ease-smooth hover:-translate-y-2' />
                    ))}
                </div>
            </Section>
        </AsyncContent>
    );
}

export default DishesList;
